import { Prisma, Product, ProductCategory, ProductVariant } from "@prisma/client";

import prisma from "@src/lib/prisma";


export default class ProductRepository {
    private prismaClient = prisma;

    public async getAll(filter?: Prisma.ProductWhereInput, limit: number = 50, cursor?: Prisma.ProductWhereUniqueInput): Promise<Product[]> {
        return this.prismaClient.product.findMany({
            cursor: cursor,
            take: limit,
            skip: cursor ? 1 : 0,
            where: filter,
        });
    }

    public async getById(id: number): Promise<Product | null> {
        return this.prismaClient.product.findUnique({
            where: { id: id }
        });
    }

    public async getVariants(id: number): Promise<ProductVariant[]> {
        const products = await this.prismaClient.product.findUnique({
            where: { id: id },
            select: {
                variants: true
            }
        });

        return products ? products.variants.map(({ created_at, updated_at, ...rest }) => rest as ProductVariant) : [];
    }

    public async deleteVariant(product_id: number, id: number): Promise<ProductVariant> {
        return this.prismaClient.productVariant.delete({
            where: { product_id: product_id, id: id }
        });
    }

    public async getCategories(id: number): Promise<ProductCategory[]> {
        const product = await this.prismaClient.product.findUnique({
            where: { id: id },
            select: {
                categories: true
            }
        });

        return product ? product.categories.map(({ created_at, updated_at, ...rest }) => rest as ProductCategory) : []
    }

    public async deleteCategory(product_id: number, id: number): Promise<ProductCategory> {
        return this.prismaClient.productCategory.delete({
            where: { product_id: product_id, id: id }
        });
    }

    public async create(data: Prisma.ProductCreateInput): Promise<Product> {
        return this.prismaClient.product.create({
            data: data
        });
    }

    public async update(id: number, data: Prisma.ProductUpdateInput): Promise<Product> {
        return this.prismaClient.product.update({
            where: { id: id },
            data: data
        });
    }

    public async delete(id: number): Promise<Product> {
        return this.prismaClient.product.delete({
            where: { id: id }
        });
    }
}