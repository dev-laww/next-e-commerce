import { Prisma, Review } from "@prisma/client";

import prisma from "@lib/prisma";

export default class ReviewRepository {
    private prismaClient = prisma;

    public async getAll(filter?: Prisma.ReviewWhereInput, limit: number = 50, cursor?: Prisma.ReviewWhereUniqueInput): Promise<Review[]> {
        return this.prismaClient.review.findMany({
            cursor: cursor,
            take: limit,
            skip: cursor ? 1 : 0,
            where: filter,
        });
    }

    public async getById(id: number): Promise<Review | null> {
        return this.prismaClient.review.findUnique({
            where: { id: id },
        });
    }

    public async getProductReviews(productId: number): Promise<Review[]> {
        return this.prismaClient.review.findMany({
            where: { product_id: productId },
        });
    }

    public async getUserReviews(userId: number): Promise<Review[]> {
        return this.prismaClient.review.findMany({
            where: { user_id: userId },
        });
    }

    public async create(data: Prisma.ReviewCreateInput | Review): Promise<Review> {
        return this.prismaClient.review.create({
            data: data
        });
    }

    public async update(id: number, data: Prisma.ReviewUpdateInput): Promise<Review> {
        return this.prismaClient.review.update({
            where: { id: id },
            data: data
        });
    }

    public async delete(id: number): Promise<Review> {
        return this.prismaClient.review.delete({
            where: { id: id }
        });
    }
}
