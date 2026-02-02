import { injectable } from "inversify";
import { PrismaClient } from "@prisma/client";
import { IRentalRepository } from "../../../domain/repositories/IRentalRepository";
import { Rental } from "../../../domain/entities/Rental";

@injectable()
export class PrismaRentalRepository implements IRentalRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient({
      datasourceUrl: "file:./dev.db",
    });
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental | null> {
    const rental = await this.prisma.rental.findFirst({
      where: {
        car_id,
        end_date: null,
      },
    });
    return rental as Rental | null;
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental | null> {
    const rental = await this.prisma.rental.findFirst({
      where: {
        user_id,
        end_date: null,
      },
    });
    return rental as Rental | null;
  }

  async create({
    user_id,
    car_id,
    expected_return_date,
  }: any): Promise<Rental> {
    const rental = await this.prisma.rental.create({
      data: {
        user_id,
        car_id,
        expected_return_date,
        start_date: new Date(),
      },
    });
    return rental as Rental;
  }
}