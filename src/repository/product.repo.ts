import { Prisma, Product, ProductVariant, ProductCategory } from "@prisma/client";

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
            where: {id: id}
        });
    }

    public async getVariants(id: number): Promise<ProductVariant[]> {
        return this.prismaClient.productVariant.findMany({
            where: {product_id: id}
        });
    }

    public async deleteVariant(product_id: number, id: number): Promise<ProductVariant> {
        return this.prismaClient.productVariant.delete({
            where: {product_id: product_id, id: id}
        });
    }

    public async getCategories(id: number): Promise<ProductCategory[]> {
        return this.prismaClient.productCategory.findMany({
            where: {product_id: id}
        });
    }

    public async deleteCategory(product_id: number, id: number): Promise<ProductCategory> {
        return this.prismaClient.productCategory.delete({
            where: {product_id: product_id, id: id}
        });
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
}