import { Prisma, ProductVariant } from "@prisma/client";

import prisma from "@lib/prisma";

export default class ProductVariantRepository {
    private prismaClient = prisma;

    public async getAll(filter?: Prisma.ProductVariantWhereInput, limit: number = 50, cursor?: Prisma.ProductVariantWhereUniqueInput): Promise<ProductVariant[]> {
        return this.prismaClient.productVariant.findMany({
            cursor: cursor,
            take: limit,
            skip: cursor ? 1 : 0,
            where: filter,
        });
    }

    public async getById(id: number): Promise<ProductVariant | null> {
        return this.prismaClient.productVariant.findUnique({
            where: { id: id }
        });
    }

    public async create(data: Prisma.ProductVariantCreateInput): Promise<ProductVariant> {
        return this.prismaClient.productVariant.create({
            data: data
        });
    }

    public async update(id: number, data: Prisma.ProductVariantUpdateInput): Promise<ProductVariant> {
        return this.prismaClient.productVariant.update({
            where: { id: id },
            data: data
        });
    }

    public async delete(id: number): Promise<ProductVariant> {
        return this.prismaClient.productVariant.delete({
            where: { id: id }
        });
    }
}
