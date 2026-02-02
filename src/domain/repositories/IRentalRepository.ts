import { Rental } from "../entities/Rental";

export interface IRentalRepository {
    findOpenRentalByCar(car_id: string): Promise<Rental | null>;
    findOpenRentalByUser(user_id: string): Promise<Rental | null>;
    create(data: any): Promise<Rental>;
}