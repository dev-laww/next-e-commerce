# Next E-Commerce App
[![License](https://img.shields.io/badge/License-MIT-green)](https://opensource.org/licenses/MIT)
[![Discord](https://img.shields.io/badge/Discord-5865F2?logo=discord&logoColor=white)](https://discordapp.com/users/738982726392217611)
[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?logo=twitter&logoColor=white&style=flat)](https://twitter.com/notlaww_)

### Built with:
[![Next.js](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![Material UI](https://img.shields.io/badge/Material%20UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white)](https://material-ui.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![VS Code](https://img.shields.io/badge/VSCode-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white)](https://code.visualstudio.com/)
[![WebStorm](https://img.shields.io/badge/WebStorm-000000?style=for-the-badge&logo=webstorm&logoColor=white)](https://www.jetbrains.com/webstorm/)

A simple e-commerce app that allows users to add items to a cart and checkout. It is built with Next.js, Material UI, and TypeScript. It is a work in progress.

## Getting Started

First, clone the repository:
```bash
git clone https://github.com/tora-o/next-e-commerce.git

cd next-ecommerce-app
```

Then, install the dependencies:
```bash
npm install
# or
yarn install
```

Then, create a `.env` file in the root directory, see `.env.example` for an example.

Then, set up the database:
```bash
prisma generate

prisma migrate dev --name init

# or

npx prisma migrate dev --name init
```

Then, run the development server:
```bash
npm run dev
# or
yarn dev
#or
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


### NOTE: This project is still a work in progress. I will be adding more features and functionality in the future.
- See [Documentation](./docs/README.md) for more information.


