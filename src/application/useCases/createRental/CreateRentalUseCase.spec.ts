import { describe, it, expect, beforeEach } from "vitest";
import { CreateRentalUseCase } from "./CreateRentalUseCase";
import { InMemoryRentalRepository } from "../../../infra/database/inMemory/InMemoryRentalRepository";
import { ICarRepository } from "../../../domain/repositories/ICarRepository";
import dayjs from "dayjs";

describe("Create Rental", () => {
  let createRentalUseCase: CreateRentalUseCase;
  let inMemoryRentalRepository: InMemoryRentalRepository;
  let mockCarRepository: ICarRepository;

  beforeEach(() => {
    inMemoryRentalRepository = new InMemoryRentalRepository();
    mockCarRepository = {
      findById: async () => null,
      updateAvailability: async () => {},
    };
    createRentalUseCase = new CreateRentalUseCase(inMemoryRentalRepository, mockCarRepository);
  });

  it("should be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: "121212",
      expected_return_date: dayjs().add(1, "day").toDate(),
    });

    expect(rental).toHaveProperty("id");
  });

  it("should not be able to create a new rental if there is another open to the same user", async () => {
    await createRentalUseCase.execute({
      user_id: "12345",
      car_id: "121212",
      expected_return_date: dayjs().add(1, "day").toDate(),
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "12345",
        car_id: "321",
        expected_return_date: dayjs().add(1, "day").toDate(),
      })
    ).rejects.toEqual(new Error("There's a rental in progress for user!"));
  });
});
