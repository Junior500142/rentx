import { describe, it, expect, beforeEach, vi } from "vitest";
import { CreateRentalUseCase } from "./createRentalUseCase";
import { ICarRepository } from "../../../domain/repositories/ICarRepository";
import { IRentalRepository } from "../../../domain/repositories/IRentalRepository";
import { InMemoryRentalRepository } from "../../../infra/inMemory/InMemoryRentalRepository";
import { InMemoryCarRepository } from "../../../infra/inMemory/InMemoryCarRepository";

describe("CreateRentalUseCase", () => {
  let createRentalUseCase: CreateRentalUseCase;
  let carRepository: ICarRepository;
  let rentalRepository: IRentalRepository;

  beforeEach(() => {
    carRepository = new InMemoryCarRepository();
    rentalRepository = new InMemoryRentalRepository();
    createRentalUseCase = new CreateRentalUseCase(carRepository, rentalRepository);
  });

  it("should be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      user_id: "user-123",
      car_id: "car-id-exemplo",
      expected_return_date: new Date(Date.now() + 1000 * 60 * 60 * 25),
    });

    expect(rental).toHaveProperty("id");
    expect(rental.car_id).toBe("car-id-exemplo");
  });

  it("should not be able to create a new rental if there is another open to the same user", async () => {
    await createRentalUseCase.execute({
      user_id: "user-123",
      car_id: "car-id-exemplo",
      expected_return_date: new Date(Date.now() + 1000 * 60 * 60 * 25),
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "user-123",
        car_id: "another-car",
        expected_return_date: new Date(Date.now() + 1000 * 60 * 60 * 25),
      })
    ).rejects.toThrow("There's a rental in progress for user!");
  });

  it("should not be able to create a new rental if there is another open to the same car", async () => {
    await createRentalUseCase.execute({
      user_id: "user-123",
      car_id: "car-id-exemplo",
      expected_return_date: new Date(Date.now() + 1000 * 60 * 60 * 25),
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "user-456",
        car_id: "car-id-exemplo",
        expected_return_date: new Date(Date.now() + 1000 * 60 * 60 * 25),
      })
    ).rejects.toThrow("Car is unavailable");
  });

  it("should not be able to create a new rental with invalid return time", async () => {
    await expect(
      createRentalUseCase.execute({
        user_id: "user-123",
        car_id: "car-123",
        expected_return_date: new Date(),
      })
    ).rejects.toThrow("Invalid return time!");
  });
});
