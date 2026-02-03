import { describe, it, expect, beforeEach } from "vitest";
import dayjs from "dayjs";

import { CreateRentalUseCase } from "./CreateRentalUseCase";
import { InMemoryRentalRepository } from "../../../infra/inMemory/InMemoryRentalRepository";
import { ICarRepository } from "../../../domain/repositories/ICarRepository";

describe("CreateRentalUseCase", () => {
  let createRentalUseCase: CreateRentalUseCase;
  let rentalRepository: InMemoryRentalRepository;
  let carRepository: ICarRepository;

  beforeEach(() => {
    rentalRepository = new InMemoryRentalRepository();

    carRepository = {
      findById: async () => null,
      updateAvailability: async () => {},
    };

    createRentalUseCase = new CreateRentalUseCase(
      carRepository,
      rentalRepository
    );
  });

  it("should be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      user_id: "user-1",
      car_id: "car-1",
      expected_return_date: dayjs().add(2, "day").toDate(),
    });

    expect(rental).toHaveProperty("id");
  });

  it("should not allow two open rentals for the same user", async () => {
    await createRentalUseCase.execute({
      user_id: "user-1",
      car_id: "car-1",
      expected_return_date: dayjs().add(2, "day").toDate(),
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "user-1",
        car_id: "car-2",
        expected_return_date: dayjs().add(2, "day").toDate(),
      })
    ).rejects.toThrow("There's a rental in progress for user!");
  });
});
