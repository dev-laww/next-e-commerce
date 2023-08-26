import { Log, Prisma } from "@prisma/client";

import prisma from "@lib/prisma";

export default class LogRepository {
    prismaClient = prisma;

    // TODO: Add pagination
    public async getAll(filter?: Prisma.LogWhereInput) {
        return this.prismaClient.log.findMany({
            where: filter
        });
    }

    public async getById(id: number): Promise<Log | null> {
        return this.prismaClient.log.findUnique({
            where: {id: id}
        });
    }

    public async create(data: Prisma.LogCreateInput | Log): Promise<Log> {
        return this.prismaClient.log.create({
            data: data
        });
    }
}
