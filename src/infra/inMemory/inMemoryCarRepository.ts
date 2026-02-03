import { injectable } from "inversify";
import { ICarRepository } from "../../domain/repositories/ICarRepository";
import { Car } from "../../domain/entities/Car";

@injectable()
export class InMemoryCarRepository implements ICarRepository {
  cars: Car[] = [
    new Car("car-id-exemplo", "ABC-1234", true)
  ];

  async findById(id: string): Promise<Car | null> {
    return this.cars.find((car) => car.id === id) || null;
  }

  async updateAvailability(car_id: string, available: boolean): Promise<void> {
    const carIndex = this.cars.findIndex((car) => car.id === car_id);
    if (carIndex !== -1) {
      this.cars[carIndex].available = available;
    }
  }
}
