import { describe, it, expect, beforeEach } from "vitest";
import { CreateRentalUseCase } from "./createRentalUseCase";
import { InMemoryRentalRepository } from "../../../infra/inMemory/InMemoryRentalRepository";
import { InMemoryCarRepository } from "../../../infra/inMemory/InMemoryCarRepository";

describe("CreateRentalUseCase", () => {
  let createRentalUseCase: CreateRentalUseCase;
  let carRepository: InMemoryCarRepository;
  let rentalRepository: InMemoryRentalRepository;

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
  });
});
