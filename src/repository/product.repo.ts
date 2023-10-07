import { Category, Prisma, Product, ProductVariant } from "@prisma/client";

import prisma from "@src/lib/prisma";


export default class ProductRepository {
    private prismaClient = prisma;

    public async getAll(filter?: Prisma.ProductWhereInput, limit: number = 50, cursor?: Prisma.ProductWhereUniqueInput): Promise<Product[]> {
        let products = await this.prismaClient.product.findMany({
            cursor: cursor,
            take: limit,
            skip: cursor ? 1 : 0,
            where: filter
        });

        return products || []
    }

    public async getById(id: number): Promise<Product | null> {
        return this.prismaClient.product.findUnique({
            where: { id: id },
            include: {
                variants: {
                    include: { reviews: true }
                },
                categories: true
            }
        });
    }

    public async getVariants(id: number): Promise<ProductVariant[]> {
        const products = await this.prismaClient.product.findUnique({
            where: { id: id },
            select: { variants: true }
        });

        return products ? products.variants.map(({ created_at, updated_at, ...rest }) => rest as ProductVariant) : [];
    }

    public async deleteVariant(product_id: number, id: number): Promise<ProductVariant> {
        return this.prismaClient.productVariant.delete({
            where: { product_id: product_id, id: id }
        });
    }

    public async getCategories(id: number): Promise<Category[]> {
        const product = await this.prismaClient.product.findUnique({
            where: { id: id },
            select: {
                categories: {
                    select: { category: true }
                }
            }
        });

        return product ? product.categories.map(category => category.category as Category) : []
    }

    public async addVariant(id: number, data: Prisma.ProductVariantCreateInput | ProductVariant): Promise<ProductVariant> {
        return this.prismaClient.product.update({
            where: { id: id },
            data: {
                variants: { create: data }
            },
            select: {
                variants: {
                    orderBy: { created_at: "desc" },
                    take: 1
                }
            }
        }).then(res => res.variants[0] as ProductVariant)
    }

    public async addCategory(id: number, categoryId: number): Promise<Category> {
        const product = await this.prismaClient.productCategory.create({
            data: {
                product_id: id,
                category_id: categoryId
            },
            select: { category: true, }
        });

        return product.category as Category;
    }

    public async deleteCategory(product_id: number, id: number): Promise<Category> {
        return this.prismaClient.productCategory.delete({
            where: { product_id: product_id, id: id },
            select: { category: true }
        }).then(res => res.category as Category);
    }

    public async create(data: Prisma.ProductCreateInput): Promise<Product> {
        return this.prismaClient.product.create({ data: data });
    }

    public async update(id: number, data: Prisma.ProductUpdateInput): Promise<Product> {
        return this.prismaClient.product.update({
            where: { id: id },
            data: data
        });
    }

    public async delete(id: number): Promise<Product> {
        return this.prismaClient.product.delete({
            where: { id: id },
            include: {
                variants: {
                    include: { reviews: true }
                },
                categories: true
            }
        });
    }
}