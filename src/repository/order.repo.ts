import { Order, OrderItem, Prisma } from "@prisma/client";

import prisma from "@lib/prisma";
import { ORDER_STATUS } from "@lib/constants";

export default class OrderRepository {
    private prismaClient = prisma;

    public async getAll(filter?: Prisma.OrderWhereInput| Order, limit: number = 50, cursor?: Prisma.OrderWhereUniqueInput | Order): Promise<Order[]> {
        return this.prismaClient.order.findMany({
            cursor: cursor ? { id: cursor.id } : undefined,
            take: limit,
            skip: cursor ? 1 : 0,
            where: filter,
            include: {
                order_items: true,
            }
        }) as unknown as Promise<Order[]>;
    }

    public async getById(id: number): Promise<Order | null> {
        return this.prismaClient.order.findUnique({
            where: { id: id },
            include: {
                order_items: true,
            }
        }) as unknown as Promise<Order | null>;
    }

    public async getUserOrders(userId: number): Promise<Order[]> {
        return this.prismaClient.order.findMany({
            where: { user_id: userId },
            include: {
                order_items: true,
            }
        }) as unknown as Promise<Order[]>;
    }

    public async getByStatus(status: "processing" | "completed" | "cancelled" | "failed" | "pending payment"): Promise<Order[]> {
        return this.prismaClient.order.findMany({
            where: { status: status },
            include: {
                order_items: true,
            }
        }) as unknown as Promise<Order[]>;
    }

    public async getByAddressId(addressId: number): Promise<Order[]> {
        return this.prismaClient.order.findMany({
            where: { address_id: addressId },
            include: {
                order_items: true,
            }
        }) as unknown as Promise<Order[]>;
    }

    public async getByShippingId(shippingId: number): Promise<Order[]> {
        return this.prismaClient.order.findMany({
            where: { shipping_id: shippingId },
            include: {
                order_items: true,
            }
        }) as unknown as Promise<Order[]>;
    }

    public async getItems(id: number): Promise<OrderItem[]> {
        const order = await this.prismaClient.order.findUnique({
            where: { id: id },
            include: { order_items: true },
        })

        return order ? order.order_items.map(({ created_at, updated_at, ...rest }) => ({ ...rest } as OrderItem)) : [];
    }

    public async create(data: Prisma.OrderCreateInput | Order): Promise<Order> {
        return this.prismaClient.order.create({
            data: data
        });
    }

    public async update(id: number, data: Prisma.OrderUpdateInput): Promise<Order> {
        return this.prismaClient.order.update({
            where: { id: id },
            data: data
        });
    }

    public async delete(id: number): Promise<Order> {
        return this.prismaClient.order.delete({
            where: { id: id },
            include: {
                order_items: true,
            }
        });
    }

    public async cancel(id: number): Promise<Order> {
        return this.prismaClient.order.update({
            where: { id: id },
            data: { status: ORDER_STATUS.CANCELLED }
        });
    }

    public async complete(id: number): Promise<Order> {
        return this.prismaClient.order.update({
            where: { id: id },
            data: { status: ORDER_STATUS.COMPLETED }
        });
    }

    public async fail(id: number): Promise<Order> {
        return this.prismaClient.order.update({
            where: { id: id },
            data: { status: ORDER_STATUS.FAILED }
        });
    }

    public async process(id: number): Promise<Order> {
        return this.prismaClient.order.update({
            where: { id: id },
            data: { status: ORDER_STATUS.PROCESSING }
        });
    }

    public async linkPayment(id: number, paymentId: number): Promise<Order> {
        const payment = await this.prismaClient.payment.findUnique({
            where: { id: paymentId }
        });

        if (!payment)
            throw new Error("Payment not found");

        if (payment.order_id)
            throw new Error("Payment already linked to an order");

        await this.process(id);

        return this.prismaClient.order.update({
            where: { id: id },
            data: {
                payment: {
                    connect: { id: paymentId }
                }
            }
        });
    }

    public async createItem(data: Prisma.OrderItemCreateInput | OrderItem): Promise<OrderItem> {
        return this.prismaClient.orderItem.create({
            data: data
        });
    }
}
