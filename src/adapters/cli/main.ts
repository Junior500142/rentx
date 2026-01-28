import "reflect-metadata";
import { container } from "../../infra/container";
import { TYPES } from "../../infra/container/types";
import { CreateRentalUseCase } from "../../application/useCases/createRental/CreateRentalUseCase";
import dayjs from "dayjs";

async function run() {
  const createRental = container.get<CreateRentalUseCase>(TYPES.CreateRentalUseCase);

  try {
    const rental = await createRental.execute({
      user_id: "user-001",
      car_id: "car-001",
      expected_return_date: dayjs().add(2, "days").toDate(),
    });
    console.log("Rental Created Successfully:", rental);
  } catch (err) {
    console.error("Error creating rental:", err.message);
  }
}

run();
