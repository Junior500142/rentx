export interface ICarRepository {
    findById(id: string): Promise<any>;
}