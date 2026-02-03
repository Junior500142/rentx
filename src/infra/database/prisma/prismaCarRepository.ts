import { injectable } from "inversify";
import { prisma } from "./client";
import { ICarRepository } from "../../../domain/repositories/ICarRepository";

@injectable()
export class PrismaCarRepository implements ICarRepository {
  async findById(id: string): Promise<any> {
    return prisma.car.findUnique({
      where: { id },
    });
  }

  async updateAvailability(
    car_id: string,
    available: boolean
  ): Promise<void> {
    await prisma.car.update({
      where: { id: car_id },
      data: { available },
    });
  }
}
