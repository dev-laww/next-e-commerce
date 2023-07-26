import { PrismaClient } from "@prisma/client";


const globalForPrisma = global as unknown as {
    prisma: PrismaClient | undefined
}

const prisma = globalForPrisma.prisma ?? new PrismaClient({
    log: ["query", "info", "warn"],
    errorFormat: "pretty"
})


if (process.env.NODE_ENV !== "production")
    globalForPrisma.prisma = prisma

export default prisma;