import { PaymentMethod, Prisma } from "@prisma/client";

import prisma from "@lib/prisma";

export default class PaymentMethodRepository {
    private prismaClient = prisma;

    public async getAll(filter?: Prisma.PaymentMethodWhereInput, limit: number = 50, cursor?: Prisma.PaymentMethodWhereUniqueInput): Promise<PaymentMethod[]> {
        return this.prismaClient.paymentMethod.findMany({
            cursor: cursor,
            take: limit,
            skip: cursor ? 1 : 0,
            where: filter,
        });
    }

    public async getById(id: number): Promise<PaymentMethod | null> {
        return this.prismaClient.paymentMethod.findUnique({
            where: { id: id }
        });
    }

    public async getUserPaymentMethods(userId: number): Promise<PaymentMethod[] | null> {
        return this.prismaClient.paymentMethod.findMany({
            where: { user_id: userId }
        });
    }

    public async create(paymentMethod: Prisma.PaymentMethodCreateInput | PaymentMethod): Promise<PaymentMethod> {
        return this.prismaClient.paymentMethod.create({
            data: paymentMethod
        });
    }

    public async update(id: number, paymentMethod: Prisma.PaymentMethodUpdateInput): Promise<PaymentMethod> {
        return this.prismaClient.paymentMethod.update({
            where: { id: id },
            data: paymentMethod
        });
    }

    public async delete(id: number): Promise<PaymentMethod> {
        return this.prismaClient.paymentMethod.delete({
            where: { id: id }
        });
    }

    public async deleteByUserId(userId: number): Promise<Prisma.BatchPayload> {
        return this.prismaClient.paymentMethod.deleteMany({
            where: { user_id: userId }
        });
    }
}
