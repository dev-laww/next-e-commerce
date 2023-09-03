import { Address, Prisma } from "@prisma/client";

import prisma from "@lib/prisma";

export default class AddressRepository {
    private prismaClient = prisma;

    public async getAll(filters?: Prisma.AddressWhereInput, limit: number = 50, cursor?: Prisma.AddressWhereUniqueInput): Promise<Address[]> {
        return this.prismaClient.address.findMany({
            cursor: cursor,
            take: limit,
            skip: cursor ? 1 : 0,
            where: filters,
        });
    }

    public async getById(id: number): Promise<Address | null> {
        return this.prismaClient.address.findUnique({
            where: {id: id},
        });
    }

    public async create(address: Prisma.AddressCreateInput | Address): Promise<Address> {
        return this.prismaClient.address.create({
            data: address
        });
    }

    public async update(id: number, address: Prisma.AddressUpdateInput): Promise<Address> {
        return this.prismaClient.address.update({
            where: {id: id},
            data: address
        });
    }

    public async delete(id: number): Promise<Address> {
        return this.prismaClient.address.delete({
            where: {id: id}
        });
    }

    public getAllUserAddresses(userId: number): Promise<Address[]> {
        return this.prismaClient.address.findMany({
            where: {user_id: userId}
        });
    }

    public async deleteUserAddresses(userId: number): Promise<Prisma.BatchPayload> {
        return this.prismaClient.address.deleteMany({
            where: {user_id: userId}
        });
    }
}
