import { injectable } from "inversify";
import { IRentalRepository } from "../../../domain/repositories/IRentalRepository";
import { Rental } from "../../../domain/entities/Rental";

@injectable()
export class InMemoryRentalRepository implements IRentalRepository {
  rentals: Rental[] = [];

  async findOpenRentalByCar(carId: string): Promise<Rental | null> {
    return (
      this.rentals.find(
        (rental) => rental.carId === carId && !rental.endDate
      ) || null
    );
  }

  async findOpenRentalByUser(userId: string): Promise<Rental | null> {
    return (
      this.rentals.find(
        (rental) => rental.userId === userId && !rental.endDate
      ) || null
    );
  }

  async create(rental: Rental): Promise<Rental> {
    this.rentals.push(rental);
    return rental;
  }
}
