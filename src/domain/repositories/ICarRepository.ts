export interface ICarRepository {
  findById(id: string): Promise<any>;
  updateAvailability(car_id: string, available: boolean): Promise<void>;
}