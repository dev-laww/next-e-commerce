import { Prisma, WishlistItem } from "@prisma/client";

import prisma from "@lib/prisma";

export default class WishlistRepository {
    private prismaClient = prisma;

    public async getAll(filter?: Prisma.WishlistItemWhereInput, limit: number = 50, cursor?: Prisma.WishlistItemWhereUniqueInput): Promise<WishlistItem[]> {
        return this.prismaClient.wishlistItem.findMany({
            cursor: cursor,
            take: limit,
            skip: cursor ? 1 : 0,
            where: filter,
        });
    }

    public async getById(id: number): Promise<WishlistItem | null> {
        return this.prismaClient.wishlistItem.findUnique({
            where: {id: id},
        });
    }

    public async getUserWishlist(userId: number): Promise<WishlistItem[]> {
        return this.prismaClient.wishlistItem.findMany({
            where: {user_id: userId},
        });
    }

    public async getByProductId(productId: number): Promise<WishlistItem[]> {
        return this.prismaClient.wishlistItem.findMany({
            where: {product_id: productId},
        });
    }

    public async create(data: Prisma.WishlistItemCreateInput | WishlistItem): Promise<WishlistItem> {
        return this.prismaClient.wishlistItem.create({
            data: data
        });
    }

    public async update(id: number, data: Prisma.WishlistItemUpdateInput): Promise<WishlistItem> {
        return this.prismaClient.wishlistItem.update({
            where: {id: id},
            data: data
        });
    }

    public async delete(id: number): Promise<WishlistItem> {
        return this.prismaClient.wishlistItem.delete({
            where: {id: id}
        });
    }

    public async deleteUserWishlist(userId: number): Promise<Prisma.BatchPayload> {
        return this.prismaClient.wishlistItem.deleteMany({
            where: {user_id: userId}
        });
    }

    public async deleteByProductId(productId: number): Promise<Prisma.BatchPayload> {
        return this.prismaClient.wishlistItem.deleteMany({
            where: {product_id: productId}
        });
    }
}
