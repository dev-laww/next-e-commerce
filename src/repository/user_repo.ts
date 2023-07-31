import { Prisma, User } from "@prisma/client";
import { hash } from "@src/lib/utils/hashing";
import prisma from "../lib/prisma";
import crypto from "crypto"


export default class UserRepository {
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

    async getUserByUsername(username: string) {
        return this.user.findUnique({
            where: {username: username}
        });
    }

    async updateUser(id: number, data: Prisma.UserUpdateInput) {
        return this.user.update({
            where: {id: id},
            data: data
        });
    }

    async changePassword(id: number, password: string) {
        const hashed = await hash(password);

        return this.user.update({
            where: {id: id},
            data: {
                password: hashed
            }
        });
    }

    async deleteUserById(id: number) {
        return this.user.delete({
            where: {id: id}
        });
    }

    // TODO: Add pagination
    async getAllUsers(filter: Prisma.UserWhereInput) {
        return this.user.findMany({
            where: filter
        });
    }

    async generateConfirmationToken(id: number) {
        return prisma.tokenOTP.create({
            data: {
                token: crypto.randomBytes(16).toString('hex'),
                type: "email_confirmation",
                user_id: id
            }
        })
    }

    async verifyConfirmationToken(id: number, tokenStr: string) {
        const token = await prisma.tokenOTP.findFirst({
            where: {
                user_id: id
            }
        })

        if (token!.token != tokenStr)
            return false

        // todo implement expiry thing using created_at

        return true
    }
}
