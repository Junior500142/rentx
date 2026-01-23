import { injectable } from "inversify";
import { PrismaClient } from "@prisma/client";
import { ICarRepository } from "../../../domain/repositories/ICarRepository";
import { Car } from "../../../domain/entities/Car";

const prisma = new PrismaClient();

@injectable()
export class PrismaCarRepository implements ICarRepository {
  async findById(id: string): Promise<Car | null> {
    const car = await prisma.car.findUnique({ where: { id } });
    return car ? new Car(car.id, car.license_plate, car.available) : null;
  }

  async updateAvailability(id: string, available: boolean): Promise<void> {
    await prisma.car.update({ where: { id }, data: { available } });
  }
}
