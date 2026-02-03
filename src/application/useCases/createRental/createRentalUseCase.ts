import { inject, injectable } from "inversify";
import dayjs from "dayjs";
import { IRentalRepository } from "../../../domain/repositories/IRentalRepository";
import { ICarRepository } from "../../../domain/repositories/ICarRepository";
import { Rental } from "../../../domain/entities/Rental";
import { ICreateRentalDTO } from "./CreateRentalDTO";

@injectable()
export class CreateRentalUseCase {
  constructor(
    @inject("ICarRepository") private carRepository: ICarRepository,
    @inject("IRentalRepository") private rentalRepository: IRentalRepository
  ) {}

  async execute({
    user_id,
    car_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental> {
    const minimumHour = 24;

    const rentalOpenToUser =
      await this.rentalRepository.findOpenRentalByUser(user_id);
    if (rentalOpenToUser) {
      throw new Error("There's a rental in progress for user!");
    }

    const carUnavailable =
      await this.rentalRepository.findOpenRentalByCar(car_id);
    if (carUnavailable) {
      throw new Error("Car is unavailable");
    }

    const compareTime = dayjs(expected_return_date).diff(new Date(), "hours");
    if (compareTime < minimumHour) {
      throw new Error("Invalid return time!");
    }

    const rental = new Rental(
      Math.random().toString(),
      user_id,
      car_id,
      expected_return_date
    );

    await this.rentalRepository.create(rental);
    await this.carRepository.updateAvailability(car_id, false);

    return rental;
  }
}
