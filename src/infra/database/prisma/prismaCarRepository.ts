import { injectable } from "inversify";
import { PrismaClient } from "@prisma/client";
import { ICarRepository } from "../../../domain/repositories/ICarRepository";

@injectable()
export class PrismaCarRepository implements ICarRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient({
      datasourceUrl: "file:./dev.db",
    });
  }

  async findById(id: string): Promise<any> {
    const car = await this.prisma.car.findUnique({
      where: { id },
    });
    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<any> {
    const car = await this.prisma.car.findFirst({
      where: { license_plate },
    });
    return car;
  }
}