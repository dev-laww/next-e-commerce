import { Prisma, User } from "@prisma/client";
import prisma from "../lib/prisma";
import { hashPassword } from "@src/lib/utils/hashing";


class UserRepository {
    prismaClient = prisma;
    user = this.prismaClient.user;

    async createUser(data: User) {
        return this.user.create({
            data: data
        });
    }

    async getUserById(id: number) {
        return this.user.findUnique({
            where: {id: id}
        });
    }

    async getUserByEmail(email: string) {
        return this.user.findUnique({
            where: {email: email}
        });
    }

    async updateUserById(id: number, data: User) {
        return this.user.update({
            where: {id: id},
            data: data
        });
    }

    async changePassword(id: number, password: string) {
        const hash = await hashPassword(password);

        return this.user.update({
            where: {id: id},
            data: {
                password: hash
            }
        });
    }

    async deleteUserById(id: number) {
        return this.user.delete({
            where: {id: id}
        });
    }

    async getAllUsers(filter: Prisma.UserWhereInput) {
        return this.user.findMany({
            where: filter
        });
    }
}
