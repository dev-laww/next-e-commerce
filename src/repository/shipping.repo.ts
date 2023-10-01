import { Order, Prisma, ShippingMethod } from "@prisma/client";

import prisma from "@lib/prisma";

export default class ShippingRepository {
    private prismaClient = prisma;

    public async getAll(filters?: Prisma.ShippingMethodWhereInput | ShippingMethod, limit: number = 50, cursor?: Prisma.ShippingMethodWhereUniqueInput | ShippingMethod): Promise<ShippingMethod[]> {
        return this.prismaClient.shippingMethod.findMany({
            cursor: cursor,
            take: limit,
            skip: cursor ? 1 : 0,
            where: filters,
        });
    }

    public async getById(id: number): Promise<ShippingMethod | null> {
        return this.prismaClient.shippingMethod.findUnique({
            where: { id: id },
        });
    }

    public async create(shippingMethod: Prisma.ShippingMethodCreateInput | ShippingMethod): Promise<ShippingMethod> {
        return this.prismaClient.shippingMethod.create({
            data: shippingMethod
        });
    }

    public async update(id: number, shippingMethod: Prisma.ShippingMethodUpdateInput | ShippingMethod): Promise<ShippingMethod> {
        return this.prismaClient.shippingMethod.update({
            where: { id: id },
            data: shippingMethod
        });
    }

    public async delete(id: number): Promise<ShippingMethod> {
        return this.prismaClient.shippingMethod.delete({
            where: { id: id }
        });
    }

    public async getShippingOrders(id: number): Promise<Order[]> {
        return this.prismaClient.order.findMany({
            where: { shipping_id: id },
            include: { order_items: true }
        });
    }
}
