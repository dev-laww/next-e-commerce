import { Coupon, Prisma } from "@prisma/client";

import prisma from "@lib/prisma";

export default class CouponRepository {
    private prismaClient = prisma;

    public async getAll(filters?: Prisma.CouponWhereInput, limit: number = 50, cursor?: Prisma.CouponWhereUniqueInput): Promise<Coupon[]> {
        return this.prismaClient.coupon.findMany({
            cursor: cursor,
            take: limit,
            skip: cursor ? 1 : 0,
            where: filters,
        });
    }

    public async getById(id: number): Promise<Coupon | null> {
        return this.prismaClient.coupon.findUnique({
            where: { id: id },
        });
    }

    public async getByCode(code: string): Promise<Coupon | null> {
        return this.prismaClient.coupon.findUnique({
            where: { code: code }
        });
    }

    public async create(coupon: Prisma.CouponCreateInput | Coupon): Promise<Coupon> {
        return this.prismaClient.coupon.create({
            data: coupon
        });
    }

    public async update(id: number, coupon: Prisma.CouponUpdateInput | Coupon): Promise<Coupon> {
        return this.prismaClient.coupon.update({
            where: { id: id },
            data: coupon
        });
    }

    public async delete(id: number): Promise<Coupon> {
        return this.prismaClient.coupon.delete({
            where: { id: id }
        });
    }
}
