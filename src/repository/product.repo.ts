import { Prisma, Product, ProductVariant } from "@prisma/client";

import prisma from "@src/lib/prisma";


export default class ProductRepository {
    prismaClient = prisma;

    // TODO: Add pagination
    public async getAll(filter?: Prisma.ProductWhereInput): Promise<Product[]> {
        return this.prismaClient.product.findMany({
            where: filter,
            include: {
                _count: true
            }
        });
    }

    public async getById(id: number): Promise<Product | null> {
        return this.prismaClient.product.findUnique({
            where: {
                id: id
            }
        })
    }

    public async getAllVariants(product_id: number): Promise<ProductVariant[]> {
        return this.prismaClient.productVariant.findMany({
            where: {
                product_id: product_id
            }
        })
    }

    public async getVariantById(id: number): Promise<ProductVariant | null> {
        return this.prismaClient.productVariant.findUnique({
            where: {
                id: id
            }
        })
    }

    public async create(data: Prisma.ProductCreateInput): Promise<Product> {
        return this.prismaClient.product.create({
            data: data
        });
    }

    public async update(id: number, data: Prisma.ProductUpdateInput): Promise<Product> {
        return this.prismaClient.product.update({
            where: {id: id},
            data: data
        });
    }

    public async delete(id: number): Promise<Product> {
        return this.prismaClient.product.delete({
            where: {id: id}
        });
    }

    public async createVariant(data: Prisma.ProductVariantCreateInput): Promise<ProductVariant> {
        return this.prismaClient.productVariant.create({
            data: data
        })
    }

    public async updateVariant(id: number, data: Prisma.ProductVariantUpdateInput): Promise<ProductVariant> {
        return this.prismaClient.productVariant.update({
            where: {id: id},
            data: data
        });
    }

    public async deleteVariant(id: number): Promise<ProductVariant> {
        return this.prismaClient.productVariant.delete({
            where: {id: id}
        });
    }
}