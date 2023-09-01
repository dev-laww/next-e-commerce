import { Log, Prisma } from "@prisma/client";

import prisma from "@lib/prisma";

export default class LogRepository {
    prismaClient = prisma;

    public async getAll(filter?: Prisma.LogWhereInput,  limit: number = 50, cursor?: Prisma.LogWhereUniqueInput) {
        return this.prismaClient.log.findMany({
            cursor: cursor,
            take: limit,
            skip: cursor ? 1 : 0,
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
