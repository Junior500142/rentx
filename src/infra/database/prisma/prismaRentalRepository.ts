import { injectable } from "inversify";
import { prisma } from "./client";
import { IRentalRepository } from "../../../domain/repositories/IRentalRepository";
import { Rental } from "../../../domain/entities/Rental";

@injectable()
export class PrismaRentalRepository implements IRentalRepository {
  async findOpenRentalByCar(car_id: string): Promise<Rental | null> {
    return prisma.rental.findFirst({
      where: {
        car_id,
        end_date: null,
      },
    });
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental | null> {
    return prisma.rental.findFirst({
      where: {
        user_id,
        end_date: null,
      },
    });
  }

  async create(rental: Rental): Promise<Rental> {
    return prisma.rental.create({
      data: {
        id: rental.id,
        car_id: rental.car_id,
        user_id: rental.user_id,
        expected_return_date: rental.expected_return_date,
      },
    });
  }
}