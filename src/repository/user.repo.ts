import { Prisma, User } from "@prisma/client";

import { TOKEN_OTP_EXPIRY } from "@lib/constants";
import prisma from "@lib/prisma";
import { hash } from "@utils/hashing";


export default class UserRepository {
    prismaClient = prisma;
    user = this.prismaClient.user;

    public async createUser(data: User) {
        return this.user.create({
            data: data
        });
    }

    public async getUserById(id: number) {
        return this.user.findUnique({
            where: {id: id}
        });
    }

    public async getUserByEmail(email: string) {
        return this.user.findUnique({
            where: {email: email}
        });
    }

    public async getUserByUsername(username: string) {
        return this.user.findUnique({
            where: {username: username}
        });
    }

    public async updateUser(id: number, data: Prisma.UserUpdateInput) {
        return this.user.update({
            where: {id: id},
            data: data
        });
    }

    public async changePassword(id: number, password: string) {
        const hashed = await hash(password);

        return this.user.update({
            where: {id: id},
            data: {
                password: hashed
            }
        });
    }

    public async deleteUserById(id: number) {
        return this.user.delete({
            where: {id: id}
        });
    }

    // TODO: Add pagination
    public async getAllUsers(filter: Prisma.UserWhereInput) {
        return this.user.findMany({
            where: filter,
            include: {
                _count: true
            }
        });
    }

    public async getUserRoles(id: number) {
        const user = await this.user.findUnique({
            where: {id: id},
            select: {
                roles: true
            }
        });

        return user ? user.roles : [];
    }

    public async updateUserRoles(id: number, roles: number[]) {
        return this.user.update({
            where: {id: id},
            data: {
                roles: {
                    set: roles.map(role => ({id: role}))
                }
            }
        });
    }

    public async getUserPermissions(id: number) {
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

    public async getUserPaymentMethods(id: number) {
        const user = await this.user.findUnique({
            where: {id: id},
            select: {
                payment_methods: true
            }
        });

        return user ? user.payment_methods : [];
    }

    public async deleteUserPaymentMethods(id: number) {
        return this.prismaClient.paymentMethod.deleteMany({
            where: {
                user_id: id
            }
        });
    }

    public async getUserAddresses(id: number) {
        const user = await this.user.findUnique({
            where: {id: id},
            select: {
                addresses: true
            }
        });

        return user ? user.addresses : [];
    }

    public async deleteUserAddresses(id: number) {
        return this.prismaClient.address.deleteMany({
            where: {
                user_id: id
            }
        });
    }

    public async getUserOrders(id: number) {
        const user = await this.user.findUnique({
            where: {id: id},
            select: {
                orders: true
            }
        });

        return user ? user.orders : [];
    }

    public async deleteUserOrders(id: number) {
        return this.prismaClient.order.deleteMany({
            where: {
                user_id: id
            }
        });
    }

    public async getUserReviews(id: number) {
        const user = await this.user.findUnique({
            where: {id: id},
            select: {
                reviews: true
            }
        })

        return user ? user.reviews : [];
    }

    public async deleteAllUserReviews(id: number) {
        return this.prismaClient.review.deleteMany({
            where: {
                user_id: id
            }
        });
    }

    public async getUserWishlist(id: number) {
        const user = await this.user.findUnique({
            where: {id: id},
            select: {
                wishlist: true
            }
        });

        return user ? user.wishlist : [];
    }

    public async deleteUserWishlist(id: number) {
        return this.prismaClient.wishlistItem.deleteMany({
            where: {
                user_id: id
            }
        });
    }

    public async getUserCart(id: number) {
        const user = await this.user.findUnique({
            where: {id: id},
            select: {
                cart: true
            }
        });

        return user ? user.cart : [];
    }

    public async deleteUserCart(id: number) {
        return this.prismaClient.cartItem.deleteMany({
            where: {
                user_id: id
            }
        });
    }

    public async generateTokenOTP(id: number, token: string, type: string) {
        return prisma.tokenOTP.create({
            data: {
                token: token,
                type: type,
                user_id: id,
            },
        });
    }

    public async verifyTokenOTP(token: string, type: string) {
        const tokenRecord = await prisma.tokenOTP.findFirst({
            where: {
                token: token,
                type: type,
            },
            include: {
                user: true,
            }
        });

        if (!tokenRecord) return {
            success: false,
            data: {} as User
        };

        const tokenCreatedAt = new Date(tokenRecord.created_at);
        const now = new Date();

        if (now.getTime() - tokenCreatedAt.getTime() < TOKEN_OTP_EXPIRY) {
            return {
                success: false,
                data: {} as User
            };
        }

        await prisma.tokenOTP.delete({
            where: {
                id: tokenRecord.id
            }
        });

        return {
            success: true,
            data: tokenRecord.user
        };
    }
}
