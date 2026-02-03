import "reflect-metadata";
import { container } from "../../infra/container";
import { CreateRentalUseCase } from "../../application/useCases/createRental/createRentalUseCase";

async function bootstrap() {
    const createRentalUseCase = container.get(CreateRentalUseCase);

    try {
        const rental = await createRentalUseCase.execute({
            user_id: "user-id-exemplo",
            car_id: "car-id-exemplo",
            expected_return_date: new Date(Date.now() + 86400000 * 2),
        });

        console.log("✅ Aluguel criado com sucesso:", rental);
    } catch (err: any) {
        console.error("❌ Erro ao criar aluguel:", err.message);
    }
}

bootstrap();
