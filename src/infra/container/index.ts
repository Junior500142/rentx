import { Container } from "inversify";
import { CreateRentalUseCase } from "../../application/useCases/createRental/CreateRentalUseCase";
import { ICarRepository } from "../../domain/repositories/ICarRepository";
import { IRentalRepository } from "../../domain/repositories/IRentalRepository";
import { PrismaCarRepository } from "../database/prisma/prismaCarRepository";
import { PrismaRentalRepository } from "../database/prisma/prismaRentalRepository";

const container = new Container();

container.bind<ICarRepository>("ICarRepository").to(PrismaCarRepository);
container.bind<IRentalRepository>("IRentalRepository").to(PrismaRentalRepository);

container.bind(CreateRentalUseCase).toSelf();

export { container };