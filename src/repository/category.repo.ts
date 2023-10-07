import { Category, Prisma, Product } from "@prisma/client";

import prisma from "@lib/prisma";

export default class CategoryRepository {
    private prismaClient = prisma;

    public async getAll(filter?: Prisma.CategoryWhereInput, limit: number = 50, cursor?: Prisma.CategoryWhereUniqueInput): Promise<Category[]> {
        return this.prismaClient.category.findMany({
            cursor: cursor,
            take: limit,
            skip: cursor ? 1 : 0,
            where: filter,
        });
    }

    public async getById(id: number): Promise<Category | null> {
        return this.prismaClient.category.findUnique({
            where: { id: id },
            include: {
                products: {
                    select: {
                        product: true
                    }
                }
            }
        }).then(category => {
            if (!category) return null;

            return {
                ...category,
                products: category.products.map(({ product }) => product as Product)
            } as Category
        });
    }

    public async getProducts(id: number): Promise<Product[]> {
        const category = await this.prismaClient.category.findUnique({
            where: { id: id },
            select: {
                products: {
                    select: {
                        product: true
                    }
                }
            }
        });

        return category ? category.products.map(({ product }) => product as Product) : [];
    }

    public async create(data: Prisma.CategoryCreateInput): Promise<Category> {
        return this.prismaClient.category.create({
            data: data
        });
    }

    public async update(id: number, data: Prisma.CategoryUpdateInput): Promise<Category> {
        return this.prismaClient.category.update({
            where: { id: id },
            data: data
        });
    }

    public async delete(id: number): Promise<Category> {
        return this.prismaClient.category.delete({
            where: { id: id }
        });
    }
}
