ARG VARIANT=20-bullseye
FROM mcr.microsoft.com/devcontainers/typescript-node:1-${VARIANT}

RUN apt-get -qq update && apt-get install -qq -y git curl bash zip && apt-get install -qq -y build-essential

COPY . ./
RUN npm install
RUN npm run prisma:generate
