import { Order, OrderItem, Prisma } from "@prisma/client";

import { ORDER_STATUS } from "@lib/constants";
import prisma from "@lib/prisma";

export default class OrderRepository {
    prismaClient = prisma;

    // TODO: Add pagination
    public async getAll(filter?: Prisma.OrderWhereInput): Promise<Order[]> {
        return this.prismaClient.order.findMany({
            where: filter,
        });
    }

    public async getById(id: number): Promise<Order | null> {
        return this.prismaClient.order.findUnique({
            where: {id: id},
        });
    }

    public async getUserOrders(userId: number): Promise<Order[]> {
        return this.prismaClient.order.findMany({
            where: {user_id: userId},
        });
    }

    public async getByStatus(status: ORDER_STATUS): Promise<Order[]> {
        return this.prismaClient.order.findMany({
            where: {status: status},
        });
    }

    public async getByAddressId(addressId: number): Promise<Order[]> {
        return this.prismaClient.order.findMany({
            where: {address_id: addressId},
        });
    }

    public async getByShippingId(shippingId: number): Promise<Order[]> {
        return this.prismaClient.order.findMany({
            where: {shipping_id: shippingId},
        });
    }

    public async getItems(id: number): Promise<OrderItem[]> {
        const order = await this.prismaClient.order.findUnique({
            where: {id: id},
            include: {order_items: true},
        })

        return order ? order.order_items.map(({created_at, updated_at, ...rest}) => ({...rest} as OrderItem)) : [];
    }

    public async create(data: Prisma.OrderCreateInput): Promise<Order> {
        return this.prismaClient.order.create({
            data: data
        });
    }

    public async update(id: number, data: Prisma.OrderUpdateInput): Promise<Order> {
        return this.prismaClient.order.update({
            where: {id: id},
            data: data
        });
    }

    public async delete(id: number): Promise<Order> {
        return this.prismaClient.order.delete({
            where: {id: id}
        });
    }
}
