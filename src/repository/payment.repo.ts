import { Payment, Prisma } from "@prisma/client";

import prisma from "@lib/prisma";

export default class PaymentRepository {
    prismaClient = prisma;

    public async getAll(filter?: Prisma.PaymentWhereInput, limit: number = 50, cursor?: Prisma.PaymentWhereUniqueInput): Promise<Payment[]> {
        return this.prismaClient.payment.findMany({
            cursor: cursor,
            take: limit,
            skip: cursor ? 1 : 0,
            where: filter,
        });
    }

    public async getById(id: number): Promise<Payment | null> {
        return this.prismaClient.payment.findUnique({
            where: {id: id},
        });
    }

    public async getByOrderId(orderId: number): Promise<Payment[]> {
        return this.prismaClient.payment.findMany({
            where: {order_id: orderId},
        });
    }

    public async getByStatus(status: "pending" | "failed" | "success"): Promise<Payment[]> {
        return this.prismaClient.payment.findMany({
            where: {status: status},
        });
    }

    public async create(data: Prisma.PaymentCreateInput | Payment): Promise<Payment> {
        return this.prismaClient.payment.create({
            data: data,
        });
    }

    public async update(id: number, data: Prisma.PaymentUpdateInput | Payment): Promise<Payment> {
        return this.prismaClient.payment.update({
            where: {id: id},
            data: data,
        });
    }

    public async delete(id: number): Promise<Payment> {
        return this.prismaClient.payment.delete({
            where: {id: id},
        });
    }

    public async success(id: number): Promise<Payment> {
        return this.prismaClient.payment.update({
            where: {id: id},
            data: {status: "success"},
        });
    }

    public async fail(id: number): Promise<Payment> {
        return this.prismaClient.payment.update({
            where: {id: id},
            data: {status: "failed"},
        });
    }
}
