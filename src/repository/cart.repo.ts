import { CartItem, Prisma } from "@prisma/client";

import prisma from "@lib/prisma";

export default class CartRepository {
    prismaClient = prisma;

    // TODO: add pagination
    public async getAll(filter?: Prisma.CartItemWhereInput): Promise<CartItem[]> {
        return this.prismaClient.cartItem.findMany({
            where: filter
        });
    }

    public async getByUserId(userId: number): Promise<CartItem[]> {
        return this.prismaClient.cartItem.findMany({
            where: {user_id: userId}
        });
    }

    public async getByProductId(productId: number): Promise<CartItem[]> {
        return this.prismaClient.cartItem.findMany({
            where: {product_id: productId}
        });
    }

    public async getByVariantId(variantId: number): Promise<CartItem[]> {
        return this.prismaClient.cartItem.findMany({
            where: {variant_id: variantId},
        });
    }

    public async getById(id: number): Promise<CartItem | null> {
        return this.prismaClient.cartItem.findUnique({
            where: {id: id},
        });
    }

    public async create(data: Prisma.CartItemCreateInput | CartItem): Promise<CartItem> {
        return this.prismaClient.cartItem.create({
            data: data
        });
    }

    public async update(id: number, data: Prisma.CartItemUpdateInput): Promise<CartItem> {
        return this.prismaClient.cartItem.update({
            where: {id: id},
            data: data
        });
    }

    public async delete(id: number): Promise<CartItem> {
        return this.prismaClient.cartItem.delete({
            where: {id: id}
        });
    }

    public async deleteUserCart(userId: number): Promise<Prisma.BatchPayload> {
        return this.prismaClient.cartItem.deleteMany({
            where: {user_id: userId}
        });
    }

    public async deleteByProductId(productId: number): Promise<Prisma.BatchPayload> {
        return this.prismaClient.cartItem.deleteMany({
            where: {product_id: productId}
        });
    }

    public async deleteByVariantId(variantId: number): Promise<Prisma.BatchPayload> {
        return this.prismaClient.cartItem.deleteMany({
            where: {variant_id: variantId}
        });
    }
}
