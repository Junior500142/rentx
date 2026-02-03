import { Container } from "inversify";
import { TYPES } from "./types";
import { CreateRentalUseCase } from "../../application/useCases/createRental/createRentalUseCase";
import { ICarRepository } from "../../domain/repositories/ICarRepository";
import { IRentalRepository } from "../../domain/repositories/IRentalRepository";
import { PrismaCarRepository } from "../database/prisma/prismaCarRepository";
import { PrismaRentalRepository } from "../database/prisma/prismaRentalRepository";

const container = new Container();

container.bind<ICarRepository>(TYPES.ICarRepository).to(PrismaCarRepository);
container.bind<IRentalRepository>(TYPES.IRentalRepository).to(PrismaRentalRepository);
container.bind(CreateRentalUseCase).toSelf();

export { container };