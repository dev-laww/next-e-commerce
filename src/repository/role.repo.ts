import { Prisma } from "@prisma/client";

import prisma from "@lib/prisma";

export default class RoleRepository {
    prismaClient = prisma;

    // TODO: Implement repository methods
    public async test() {
        return "Hello World";
    }
}
