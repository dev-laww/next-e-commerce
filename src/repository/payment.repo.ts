import { Prisma } from "@prisma/client";

import prisma from "@lib/prisma";

export default class PaymentRepository {
    prismaClient = prisma;

    // TODO: Add pagination
    public async getAll() {
        return "Hello World";
    }
}
