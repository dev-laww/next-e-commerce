import { Prisma, Category, ProductCategory } from "@prisma/client";

import prisma from "@lib/prisma";

export default class CategoryRepository {
    prismaClient = prisma;

    public async getAll(filter?: Prisma.CategoryWhereInput): Promise<Category[]> {
        return this.prismaClient.category.findMany({
            where: filter,
            include: {
                _count: true
            }
        });
    }

    public async getById(id: number): Promise<Category | null> {
        return this.prismaClient.category.findUnique({
            where: {id: id}
        });
    }

    public async getProducts(id: number): Promise<ProductCategory[]> {
        const category = await this.prismaClient.category.findUnique({
            where: {id: id},
            select: {
                products: true
            }
        });

        return category ? category.products.map(({created_at, updated_at, ...rest}) => rest as ProductCategory) : [];
    }

    public async create(data: Prisma.CategoryCreateInput): Promise<Category> {
        return this.prismaClient.category.create({
            data: data
        });
    }

    public async update(id: number, data: Prisma.CategoryUpdateInput): Promise<Category> {
        return this.prismaClient.category.update({
            where: {id: id},
            data: data
        });
    }

    public async delete(id: number): Promise<Category> {
        return this.prismaClient.category.delete({
            where: {id: id}
        });
    }
}
