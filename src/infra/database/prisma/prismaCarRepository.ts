import { injectable } from "inversify";
import { PrismaClient } from "@prisma/client";
import { ICarRepository } from "../../../domain/repositories/ICarRepository";

const prisma = new PrismaClient();

@injectable()
export class PrismaCarRepository implements ICarRepository {

  async findById(id: string): Promise<any> {
    return prisma.car.findUnique({
      where: { id },
    });
  }

  async findByLicensePlate(license_plate: string): Promise<any> {
    return prisma.car.findFirst({
      where: { license_plate },
    });
  }
}
