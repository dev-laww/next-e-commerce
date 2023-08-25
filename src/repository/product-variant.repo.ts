import { Prisma, ProductVariant } from "@prisma/client";

import prisma from "@lib/prisma";

export default class ProductVariantRepository {
    prismaClient = prisma;

    // TODO: Implement pagination
    public async getAll(filter?: Prisma.ProductVariantWhereInput): Promise<ProductVariant[]> {
        return this.prismaClient.productVariant.findMany({
            where: filter,
            include: {
                _count: true
            }
        });
    }

    public async getById(id: number): Promise<ProductVariant | null> {
        return this.prismaClient.productVariant.findUnique({
            where: {id: id}
        });
    }

    public async create(data: Prisma.ProductVariantCreateInput): Promise<ProductVariant> {
        return this.prismaClient.productVariant.create({
            data: data
        });
    }

    public async update(id: number, data: Prisma.ProductVariantUpdateInput): Promise<ProductVariant> {
        return this.prismaClient.productVariant.update({
            where: {id: id},
            data: data
        });
    }

    public async delete(id: number): Promise<ProductVariant> {
        return this.prismaClient.productVariant.delete({
            where: {id: id}
        });
    }
}
