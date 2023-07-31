import { Prisma, User } from "@prisma/client";
import prisma from "../lib/prisma";
import { hash } from "@src/lib/utils/hashing";


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
            where: filter,
            include: {
                _count: true
            }
        });
    }

    async getUserRoles(id: number) {
        const user = await this.user.findUnique({
            where: {id: id},
            select: {
                roles: true
            }
        });

        return user ? user.roles : [];
    }

    async updateUserRoles(id: number, roles: number[]) {
        return this.user.update({
            where: {id: id},
            data: {
                roles: {
                    set: roles.map(role => ({id: role}))
                }
            }
        });
    }

    async getUserPermissions(id: number) {
        const roles = await this.getUserRoles(id);

        if (!roles) return null;

        return this.prismaClient.role.findMany({
            where: {
                id: {
                    in: roles.map(role => role.id)
                }
            }
        });
    }

    async getUserPaymentMethods(id: number) {
        const user = await this.user.findUnique({
            where: {id: id},
            select: {
                payment_methods: true
            }
        });

        return user ? user.payment_methods : [];
    }

    async deleteUserPaymentMethods(id: number) {
        return this.prismaClient.paymentMethod.deleteMany({
            where: {
                user_id: id
            }
        });
    }

    async getUserAddreses(id: number) {
        const user = await this.user.findUnique({
            where: {id: id},
            select: {
                addresses: true
            }
        });

        return user ? user.addresses : [];
    }

    async deleteUserAddresses(id: number) {
        return this.prismaClient.address.deleteMany({
            where: {
                user_id: id
            }
        });
    }

    async getUserOrders(id: number) {
        const user = await this.user.findUnique({
            where: {id: id},
            select: {
                orders: true
            }
        });

        return user ? user.orders : [];
    }

    async deleteUserOrders(id: number) {
        return this.prismaClient.order.deleteMany({
            where: {
                user_id: id
            }
        });
    }

    async getUserReviews(id: number) {
        const user = await this.user.findUnique({
            where: {id: id},
            select: {
                reviews: true
            }
        })

        return user ? user.reviews : [];
    }

    async deleteAllUserReviews(id: number) {
        return this.prismaClient.review.deleteMany({
            where: {
                user_id: id
            }
        });
    }

    async getUserWishlist(id: number) {
        const user = await this.user.findUnique({
            where: {id: id},
            select: {
                wishlist: true
            }
        });
    }

    async deleteUserWishlist(id: number) {
        return this.prismaClient.wishlistItem.deleteMany({
            where: {
                user_id: id
            }
        });
    }

    async getUserCart(id: number) {
        const user = await this.user.findUnique({
            where: {id: id},
            select: {
                cart: true
            }
        });

        return user ? user.cart : [];
    }

    async deleteUserCart(id: number) {
        return this.prismaClient.cartItem.deleteMany({
            where: {
                user_id: id
            }
        });
    }
}
