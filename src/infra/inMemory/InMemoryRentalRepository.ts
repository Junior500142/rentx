import { injectable } from "inversify";
import { IRentalRepository } from "../../../domain/repositories/IRentalRepository";
import { Rental } from "../../../domain/entities/Rental";

@injectable()
export class InMemoryRentalRepository implements IRentalRepository {
  rentals: Rental[] = [];

  async findOpenRentalByCar(car_id: string): Promise<Rental | null> {
    return this.rentals.find((rental) => rental.car_id === car_id && !rental.end_date) || null;
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental | null> {
    return this.rentals.find((rental) => rental.user_id === user_id && !rental.end_date) || null;
  }

  async create(data: Rental): Promise<Rental> {
    this.rentals.push(data);
    return data;
  }
}