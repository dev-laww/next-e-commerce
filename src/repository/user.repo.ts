import {
    Address,
    CartItem,
    Order,
    Payment,
    PaymentMethod,
    Permission,
    Prisma,
    Review,
    Role,
    TokenOTP,
    User,
    WishlistItem
} from "@prisma/client";

import { TOKEN_OTP_EXPIRY } from "@lib/constants";
import prisma from "@lib/prisma";
import { hash } from "@utils/hashing";
import { compare } from "bcryptjs";


export default class UserRepository {
    private prismaClient = prisma;

    public async getAll(filter?: Prisma.UserWhereInput, limit: number = 50, cursor?: Prisma.UserWhereUniqueInput): Promise<User[]> {
        return this.prismaClient.user.findMany({
            cursor: cursor,
            take: limit,
            skip: cursor ? 1 : 0,
            where: filter,
            orderBy: { id: "asc" }
        }).then(users => users.map(({ password, created_at, updated_at, confirmed, ...rest }) => rest as User));
    }

    public async getById(id: number): Promise<User | null> {
        return this.prismaClient.user.findUnique({
            where: { id: id }
        }).then((res => {
            if (!res) return null;

            const { password, created_at, updated_at, confirmed, ...rest } = res;
            return rest as User;
        }));
    }

    public async getByEmail(email: string): Promise<User | null> {
        return this.prismaClient.user.findUnique({
            where: { email: email }
        });
    }

    public async getByUsername(username: string): Promise<User | null> {
        return this.prismaClient.user.findUnique({
            where: { username: username }
        });
    }

    public async create(data: Prisma.UserCreateInput | User): Promise<User> {
        return this.prismaClient.user.create({
            data: data
        });
    }

    public async update(id: number, data: Prisma.UserUpdateInput): Promise<User> {
        return this.prismaClient.user.update({
            where: { id: id },
            data: data
        });
    }

    public async changePassword(id: number, password: string): Promise<User> {
        const hashed = await hash(password);

        return this.prismaClient.user.update({
            where: { id: id },
            data: {
                password: hashed
            }
        });
    }

    public async delete(id: number): Promise<User> {
        return this.prismaClient.user.delete({
            where: { id: id }
        });
    }

    public async getRoles(id: number): Promise<Role[]> {
        const user = await this.prismaClient.user.findUnique({
            where: { id: id },
            select: {
                roles: true
            }
        });

        return this.prismaClient.role.findMany({
            where: {
                id: {
                    in: user?.roles.map(role => role.role_id)
                }
            }
        }).then(roles => roles.map(({ created_at, updated_at, ...rest }) => rest as Role));
    }

    public async updateRoles(id: number, roles: number[]): Promise<User> {
        const userRoles = await this.getRoles(id).then(roles => roles.map(role => role.id));

        const rolesToAdd = roles.filter(role => !userRoles.includes(role));
        const rolesToRemove = userRoles.filter(role => !roles.includes(role));

        return this.prismaClient.user.update({
            where: { id: id },
            data: {
                roles: {
                    create: rolesToAdd.map(role => ({ role_id: role })),
                    deleteMany: rolesToRemove.map(role => ({ role_id: role }))
                }
            }
        });
    }

    public async getPermissions(id: number): Promise<Permission[] | null> {
        const roles = await this.getRoles(id);

        if (roles.length === 0) return null;

        const rolePermissions = await this.prismaClient.rolePermission.findMany({
            where: {
                role_id: {
                    in: roles.map(role => role.id)
                }
            },
            select: {
                permission: true
            }
        });

        return rolePermissions.map(rolePermission => {
            const { created_at, updated_at, ...rest } = rolePermission.permission;
            return rest as Permission;
        });
    }

    public async getPaymentMethods(id: number): Promise<PaymentMethod[]> {
        const user = await this.prismaClient.user.findUnique({
            where: { id: id },
            select: {
                payment_methods: true
            }
        });

        return user ? user.payment_methods.map(({
                                                    created_at,
                                                    updated_at,
                                                    user_id,
                                                    ...rest
                                                }) => rest as PaymentMethod) : [];
    }

    public async deletePaymentMethods(id: number): Promise<Prisma.BatchPayload> {
        return this.prismaClient.paymentMethod.deleteMany({
            where: {
                user_id: id
            }
        });
    }

    public async getAddresses(id: number): Promise<Address[]> {
        const user = await this.prismaClient.user.findUnique({
            where: { id: id },
            select: {
                addresses: true
            }
        });

        return user ? user.addresses.map(({ created_at, updated_at, user_id, ...rest }) => rest as Address) : [];
    }

    public async deleteAddresses(id: number): Promise<Prisma.BatchPayload> {
        return this.prismaClient.address.deleteMany({
            where: {
                user_id: id
            }
        });
    }

    public async getOrders(id: number): Promise<Order[]> {
        const user = await this.prismaClient.user.findUnique({
            where: { id: id },
            select: {
                orders: {
                    include: {
                        order_items: true
                    }
                }
            }
        });

        return user ? user.orders.map(({ created_at, updated_at, user_id, ...rest }) => rest as unknown as Order) : [];
    }

    public async deleteOrders(id: number): Promise<Prisma.BatchPayload> {
        return this.prismaClient.order.deleteMany({
            where: {
                user_id: id
            }
        });
    }

    public async getReviews(id: number): Promise<Review[]> {
        const user = await this.prismaClient.user.findUnique({
            where: { id: id },
            select: {
                reviews: true
            }
        })

        return user ? user.reviews.map(({ created_at, updated_at, user_id, ...rest }) => rest as Review) : [];
    }

    public async deleteReviews(id: number): Promise<Prisma.BatchPayload> {
        return this.prismaClient.review.deleteMany({
            where: {
                user_id: id
            }
        });
    }

    public async getWishlist(id: number): Promise<WishlistItem[]> {
        const user = await this.prismaClient.user.findUnique({
            where: { id: id },
            select: {
                wishlist: true
            }
        });

        return user ? user.wishlist.map(({ created_at, updated_at, user_id, ...rest }) => rest as WishlistItem) : [];
    }

    public async getCart(id: number): Promise<CartItem[]> {
        const user = await this.prismaClient.user.findUnique({
            where: { id: id },
            select: {
                cart: true
            }
        });

        return user ? user.cart.map(({ created_at, updated_at, user_id, ...rest }) => rest as CartItem) : [];
    }

    public async deleteCart(id: number): Promise<Prisma.BatchPayload> {
        return this.prismaClient.cartItem.deleteMany({
            where: {
                user_id: id
            }
        });
    }

    public async getPayments(id: number): Promise<Payment[]> {
        const user = await this.prismaClient.user.findUnique({
            where: { id: id },
            select: {
                payments: true
            }
        });

        return user ? user.payments.map(({ created_at, updated_at, user_id, ...rest }) => rest as Payment) : [];
    }

    public async createPayment(id: number, orderId: number, paymentMethodId: number): Promise<Payment> {
        const order = await this.prismaClient.order.findUnique({
            where: { id: orderId }
        });

        const paymentMethod = await this.prismaClient.paymentMethod.findUnique({
            where: { id: paymentMethodId }
        })

        if (!order) throw new Error("Order not found");
        if (!paymentMethod) throw new Error("Payment method not found");

        return this.prismaClient.user.update({
            where: { id: id },
            data: {
                payments: {
                    create: {
                        order_id: orderId,
                        method_id: paymentMethodId,
                        amount: order.total,
                    }
                }
            },
            select: {
                payments: true
            }
        }).then(user => user.payments[0])
            .then(({ created_at, updated_at, user_id, ...rest }) => rest as Payment);
    }


    public async getTokens(id: number): Promise<TokenOTP[]> {
        const user = await this.prismaClient.user.findUnique({
            where: { id: id },
            select: {
                tokens: true
            }
        });

        return user ? user.tokens.map(({ created_at, updated_at, user_id, ...rest }) => rest as TokenOTP) : [];
    }

    public async generateTokenOTP(id: number, token: string, type: string): Promise<TokenOTP> {
        return prisma.tokenOTP.create({
            data: {
                token: token,
                type: type,
                user_id: id,
            },
        });
    }

    public async verifyTokenOTP(token: string, type: string): Promise<{ success: boolean, data: User }> {
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

        if (now.getTime() - tokenCreatedAt.getTime() > TOKEN_OTP_EXPIRY) {
            await prisma.tokenOTP.delete({
                where: {
                    id: tokenRecord.id
                }
            });

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

    public async verifyPassword(id: number, password: string): Promise<boolean> {
        const user = await this.prismaClient.user.findUnique({
            where: { id: id },
            select: {
                password: true
            }
        });

        if (!user) return false;

        return compare(password, user.password);
    }
}
