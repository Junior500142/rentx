RentX - Sistema de Locação de Veículos

Este projeto é o núcleo de um sistema de locação de veículos desenvolvido para demonstrar a aplicação prática de Clean Architecture, DDD (Domain-Driven Design) e Inversão de Controle (IoC) utilizando a biblioteca InversifyJS.

🚀 Tecnologias Utilizadas

•
TypeScript (Linguagem principal)

•
Prisma (ORM para persistência em SQLite)

•
InversifyJS (Container de Injeção de Dependência)

•
Vitest (Framework de testes unitários)

•
Dayjs (Manipulação de datas)

•
TSX (Execução de TypeScript em Node.js)

🏗️ Arquitetura

O projeto segue rigorosamente a separação de responsabilidades:

•
Domain: Entidades de negócio e contratos (interfaces) dos repositórios.

•
Application: Casos de uso contendo as regras de negócio (ex: CreateRental).

•
Infra: Implementações concretas de banco de dados, containers de IoC e provedores.

•
Adapters: Pontos de entrada da aplicação (Interface CLI).

🛠️ Como Rodar o Projeto

Siga os passos abaixo para configurar e executar o projeto em sua máquina:

1. Instalação das Dependências

Bash


npm install



2. Configuração do Banco de Dados (SQLite)

Gere o banco de dados e as tabelas necessárias:

Bash


npx prisma migrate dev --name init



3. Criação de Dados Iniciais (Seed)

Para que o sistema funcione via CLI, é necessário ter um carro cadastrado. Execute o script de semente:

Bash


npx tsx seed.ts



4. Execução da Aplicação

Para rodar o fluxo de criação de aluguel via terminal:

Bash


npm run dev



5. Execução dos Testes

Para validar as regras de negócio com mocks em memória:

Bash


npm run test



