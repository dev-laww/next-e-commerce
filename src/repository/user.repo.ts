import {
    Address,
    CartItem,
    Order,
    PaymentMethod, Permission,
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


export default class UserRepository {
    prismaClient = prisma;
    user = this.prismaClient.user;

    public async createUser(data: User): Promise<User> {
        return this.user.create({
            data: data
        });
    }

    public async getUserById(id: number): Promise<User | null> {
        return this.user.findUnique({
            where: {id: id}
        });
    }

    public async getUserByEmail(email: string): Promise<User | null> {
        return this.user.findUnique({
            where: {email: email}
        });
    }

    public async getUserByUsername(username: string): Promise<User | null> {
        return this.user.findUnique({
            where: {username: username}
        });
    }

    public async updateUser(id: number, data: Prisma.UserUpdateInput): Promise<User> {
        return this.user.update({
            where: {id: id},
            data: data
        });
    }

    public async changePassword(id: number, password: string): Promise<User> {
        const hashed = await hash(password);

        return this.user.update({
            where: {id: id},
            data: {
                password: hashed
            }
        });
    }

    public async deleteUserById(id: number): Promise<User> {
        return this.user.delete({
            where: {id: id}
        });
    }

    // TODO: Add pagination
    public async getAll(filter: Prisma.UserWhereInput | undefined = undefined): Promise<User[]> {
        return this.user.findMany({
            where: filter,
            include: {
                _count: true
            }
        });
    }

    public async getUserRoles(id: number): Promise<Role[]> {
        const user = await this.user.findUnique({
            where: {id: id},
            select: {
                roles: true
            }
        });

        return this.prismaClient.role.findMany({
            where: {
                id: {
                    in: user?.roles.map(role => role.role_id)
                }
            },
            select: {
                id: true,
                name: true,
            } as Prisma.RoleSelect
        });
    }

    public async updateUserRoles(id: number, roles: number[]): Promise<User> {
        return this.user.update({
            where: {id: id},
            data: {
                roles: {
                    set: roles.map(role => ({id: role}))
                }
            },
            include: {
                roles: true
            }
        });
    }

    public async getUserPermissions(id: number): Promise<Permission[] | null> {
        const roles = await this.getUserRoles(id);

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
            const permission = rolePermission.permission;
            return {
                id: permission.id,
                name: permission.name,
                description: permission.description,
            } as Permission;
        });
    }

    public async getUserPaymentMethods(id: number): Promise<PaymentMethod[]> {
        const user = await this.user.findUnique({
            where: {id: id},
            select: {
                payment_methods: true
            }
        });

        return user ? user.payment_methods : [];
    }

    public async deleteUserPaymentMethods(id: number): Promise<Prisma.BatchPayload> {
        return this.prismaClient.paymentMethod.deleteMany({
            where: {
                user_id: id
            }
        });
    }

    public async getUserAddresses(id: number): Promise<Address[]> {
        const user = await this.user.findUnique({
            where: {id: id},
            select: {
                addresses: true
            }
        });

        return user ? user.addresses : [];
    }

    public async deleteUserAddresses(id: number): Promise<Prisma.BatchPayload> {
        return this.prismaClient.address.deleteMany({
            where: {
                user_id: id
            }
        });
    }

    public async getUserOrders(id: number): Promise<Order[]> {
        const user = await this.user.findUnique({
            where: {id: id},
            select: {
                orders: true
            }
        });

        return user ? user.orders : [];
    }

    public async deleteUserOrders(id: number): Promise<Prisma.BatchPayload> {
        return this.prismaClient.order.deleteMany({
            where: {
                user_id: id
            }
        });
    }

    public async getUserReviews(id: number): Promise<Review[]> {
        const user = await this.user.findUnique({
            where: {id: id},
            select: {
                reviews: true
            }
        })

        return user ? user.reviews : [];
    }

    public async deleteUserReviews(id: number): Promise<Prisma.BatchPayload> {
        return this.prismaClient.review.deleteMany({
            where: {
                user_id: id
            }
        });
    }

    public async getUserWishlist(id: number): Promise<WishlistItem[]> {
        const user = await this.user.findUnique({
            where: {id: id},
            select: {
                wishlist: true
            }
        });

        return user ? user.wishlist : [];
    }

    public async deleteUserWishlist(id: number): Promise<Prisma.BatchPayload> {
        return this.prismaClient.wishlistItem.deleteMany({
            where: {
                user_id: id
            }
        });
    }

    public async getUserCart(id: number): Promise<CartItem[]> {
        const user = await this.user.findUnique({
            where: {id: id},
            select: {
                cart: true
            }
        });

        return user ? user.cart : [];
    }

    public async deleteUserCart(id: number): Promise<Prisma.BatchPayload> {
        return this.prismaClient.cartItem.deleteMany({
            where: {
                user_id: id
            }
        });
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
