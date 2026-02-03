import { CreateRentalUseCase } from "./CreateRentalUseCase";
import { ICarRepository } from "../../../domain/repositories/ICarRepository";
import { IRentalRepository } from "../../../domain/repositories/IRentalRepository";

describe("CreateRentalUseCase", () => {
  let createRentalUseCase: CreateRentalUseCase;
  let carRepository: jest.Mocked<ICarRepository>;
  let rentalRepository: jest.Mocked<IRentalRepository>;

  beforeEach(() => {
    carRepository = {
      updateAvailability: jest.fn(),
      findById: jest.fn(),
    } as any;

    rentalRepository = {
      findOpenRentalByCar: jest.fn(),
      findOpenRentalByUser: jest.fn(),
      create: jest.fn(),
    } as any;

    createRentalUseCase = new CreateRentalUseCase(
      carRepository,
      rentalRepository
    );
  });

  it("should be able to create a new rental", async () => {
    rentalRepository.findOpenRentalByCar.mockResolvedValue(null);
    rentalRepository.findOpenRentalByUser.mockResolvedValue(null);

    const rental = await createRentalUseCase.execute({
      user_id: "user-123",
      car_id: "car-123",
      expected_return_date: new Date(Date.now() + 1000 * 60 * 60 * 24),
    });

    expect(rental).toHaveProperty("id");
    expect(rentalRepository.create).toHaveBeenCalled();
    expect(carRepository.updateAvailability).toHaveBeenCalledWith(
      "car-123",
      false
    );
  });
});
