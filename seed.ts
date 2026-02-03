import { prisma } from "./src/infra/database/prisma/client";

async function main() {
  await prisma.car.upsert({
    where: { id: "car-id-exemplo" },
    update: {},
    create: {
      id: "car-id-exemplo",
      license_plate: "ABC-1234",
      available: true,
    },
  });
  console.log("✅ Carro de teste criado com sucesso!");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
