import {
    Address,
    PaymentMethod,
    Order,
    User,
    Review,
    WishlistItem,
    CartItem,
    TokenOTP,
    UserRole, Role
} from "@prisma/client";
import { mockReset } from "jest-mock-extended";

import UserRepository from "@repository/user.repo";
import prisma from "@lib/prisma";


jest.mock("@lib/prisma", () => require("@mocks/lib/prisma.mock"));

describe("UserRepository", () => {
    let repo: UserRepository;
    const data = {
        password: "password",
        username: "username",
        email: "email",
        first_name: "name",
        last_name: "name",
    } as User;

    beforeEach(() => {
        repo = new UserRepository();
        mockReset(prisma)
    });

    it("Test createUser", async () => {
        (prisma.user.create as jest.Mock).mockResolvedValue(data as User);
        const result = await repo.create(data)

        expect(result).toMatchObject(data);
    });

    it("Test getUserById", async () => {
        (prisma.user.findUnique as jest.Mock).mockResolvedValue(data as User);
        const result = await repo.getUserById(1)

        expect(result).toMatchObject(data);
    })

    it("Test getUserByEmail", async () => {
        (prisma.user.findUnique as jest.Mock).mockResolvedValue(data as User);
        const result = await repo.getByEmail("email")

        expect(result).toMatchObject(data);
    })

    it("Test getUserByUsername", async () => {
        (prisma.user.findUnique as jest.Mock).mockResolvedValue(data as User);
        const result = await repo.getByUsername("username")

        expect(result).toMatchObject(data);
    })

    it("Test updateUser", async () => {
        (prisma.user.update as jest.Mock).mockResolvedValue(data as User);
        const result = await repo.update(1, data)

        expect(result).toMatchObject(data);
    })

    it("Test changePassword", async () => {
        (prisma.user.update as jest.Mock).mockResolvedValue(data as User);
        const result = await repo.changePassword(1, "password")

        expect(result).toMatchObject(data);
    })

    it("Test deleteUserById", async () => {
        (prisma.user.delete as jest.Mock).mockResolvedValue(data as User);
        const result = await repo.delete(1)

        expect(result).toMatchObject(data);
    })

    it("Test getAll", async () => {
        (prisma.user.findMany as jest.Mock).mockResolvedValue([]);

        let result = await repo.getAll();

        expect(result).toMatchObject([]);

        result = await repo.getAll(undefined, 50, {id: 1});

        expect(result).toMatchObject([]);
    })


    it("Test getUserRoles", async () => {
        const userWithRoles = {
            ...data,
            roles: [{
                id: 1,
                role_id: 1,
                user_id: 1
            }] as UserRole[]
        };

        (prisma.user.findUnique as jest.Mock).mockResolvedValue(userWithRoles as User);
        (prisma.role.findMany as jest.Mock).mockResolvedValue([]);
        let result = await repo.getRoles(1)

        expect(result).toMatchObject([]);

        (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
        result = await repo.getRoles(1)

        expect(result).toMatchObject([]);
    })

    it("Test updateUserRoles", async () => {
        const userWithRoles = {
            ...data,
            roles: [{
                id: 1,
                role_id: 1,
                user_id: 1
            }] as UserRole[]
        };

        (prisma.user.update as jest.Mock).mockResolvedValue(userWithRoles as User);
        (prisma.user.findUnique as jest.Mock).mockResolvedValue(userWithRoles as User);
        (prisma.role.findMany as jest.Mock).mockResolvedValue([{id: 1, name: "name"}]);

        const result = await repo.updateRoles(1, [2])

        expect(result).toMatchObject(data);
    })

    it("Test getUserPermissions", async () => {
        const userWithRoles = {
            ...data,
            roles: [{
                id: 1,
                role_id: 1,
                user_id: 1
            }] as UserRole[]
        };

        (prisma.user.findUnique as jest.Mock).mockResolvedValue(userWithRoles as User);
        (prisma.role.findMany as jest.Mock).mockResolvedValue([{id: 1, name: "name"}] as Role[]);
        (prisma.rolePermission.findMany as jest.Mock).mockResolvedValue([{
            permission: {
                id: 1,
                name: "name",
                description: "description"
            }
        }]);
        (prisma.permission.findMany as jest.Mock).mockResolvedValue([]);

        let result = await repo.getPermissions(1)

        expect(result).toMatchObject([{id: 1, name: "name", description: "description"}]);

        // empty permissions
        (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
        (prisma.role.findMany as jest.Mock).mockResolvedValue([]);
        (prisma.rolePermission.findMany as jest.Mock).mockResolvedValue([]);
        result = await repo.getPermissions(1)

        expect(result).toBe(null);
    })

    it("Test getUserPaymentMethods", async () => {
        const userWithPaymentMethods = {
            ...data,
            payment_methods: [{
                id: 1,
                name: "name",
                card_number: "xxx-xxx-xxxx-xxx",
                expiration_date: "xx/xx",
                cvv: "xxx",
            }] as PaymentMethod[]
        };

        (prisma.user.findUnique as jest.Mock).mockResolvedValue(userWithPaymentMethods as User);
        let result = await repo.getPaymentMethods(1)

        expect(result).toMatchObject(userWithPaymentMethods.payment_methods);

        // empty payment methods
        (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
        result = await repo.getPaymentMethods(1)

        expect(result).toMatchObject([]);
    })

    it("Test deleteUserPaymentMethods", async () => {
        (prisma.paymentMethod.deleteMany as jest.Mock).mockResolvedValue({count: 1});
        const result = await repo.deletePaymentMethods(1)

        expect(result).toMatchObject({count: 1});
    })

    it("Test getUserAddresses (non empty)", async () => {
        const userWithAddresses = {
            ...data,
            addresses: [{
                id: 1,
                address: "x",
                city: "x",
                state: "x",
                country: "x",
                zip: "xxxx"
            }] as Address[]
        };

        (prisma.user.findUnique as jest.Mock).mockResolvedValue(userWithAddresses as User);
        let result = await repo.getAddresses(1)

        expect(result).toMatchObject(userWithAddresses.addresses);

        // empty addresses
        (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
        result = await repo.getAddresses(1)

        expect(result).toMatchObject([]);
    })

    it("Test deleteUserAddresses", async () => {
        (prisma.address.deleteMany as jest.Mock).mockResolvedValue({count: 1});
        const result = await repo.deleteAddresses(1)

        expect(result).toMatchObject({count: 1});
    })

    it("Test getUserOrders", async () => {
        const userWithOrders = {
            ...data,
            orders: [{
                id: 1,
                shipping_id: 1,
                address_id: 1,
                order_number: "xxxx",
                status: "status",
                total: 1
            }] as Order[]
        };

        (prisma.user.findUnique as jest.Mock).mockResolvedValue(userWithOrders as User);
        let result = await repo.getOrders(1)

        expect(result).toMatchObject(userWithOrders.orders);

        // empty orders
        (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
        result = await repo.getOrders(1)

        expect(result).toMatchObject([]);
    })

    it("Test deleteUserOrders", async () => {
        (prisma.order.deleteMany as jest.Mock).mockResolvedValue({count: 1});

        const result = await repo.deleteOrders(1)

        expect(result).toMatchObject({count: 1});
    })

    it("Test getUserReviews", async () => {
        const userWithReviews = {
            ...data,
            reviews: [{
                id: 1,
                product_id: 1,
                rating: 1,
                comment: "comment"
            }] as Review[]
        };

        (prisma.user.findUnique as jest.Mock).mockResolvedValue(userWithReviews as User);
        let result = await repo.getReviews(1)

        expect(result).toMatchObject(userWithReviews.reviews);

        // empty reviews
        (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
        result = await repo.getReviews(1)

        expect(result).toMatchObject([]);
    })

    it("Test deleteUserReviews", async () => {
        (prisma.review.deleteMany as jest.Mock).mockResolvedValue({count: 1});

        const result = await repo.deleteReviews(1)

        expect(result).toMatchObject({count: 1});
    })

    it("Test getUserWishlist", async () => {
        const userWithWishlist = {
            ...data,
            wishlist: [{
                id: 1,
                product_id: 1,
            }] as WishlistItem[]
        };

        (prisma.user.findUnique as jest.Mock).mockResolvedValue(userWithWishlist as User);
        let result = await repo.getWishlist(1)

        expect(result).toMatchObject(userWithWishlist.wishlist);

        // empty wishlist
        (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
        result = await repo.getWishlist(1)

        expect(result).toMatchObject([]);
    })

    it("Test deleteUserWishlist", async () => {
        (prisma.wishlistItem.deleteMany as jest.Mock).mockResolvedValue({count: 1});
        const result = await repo.deleteWishlist(1)

        expect(result).toMatchObject({count: 1});
    })

    it("Test getUserCart", async () => {
        const userWithCart = {
            ...data,
            cart: [{
                id: 1,
                product_id: 1,
                variant_id: 1,
                quantity: 1
            }] as CartItem[]
        };

        (prisma.user.findUnique as jest.Mock).mockResolvedValue(userWithCart as User);
        let result = await repo.getCart(1)

        expect(result).toMatchObject(userWithCart.cart);

        // empty cart
        (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
        result = await repo.getCart(1)

        expect(result).toMatchObject([]);
    })

    it("Test deleteUserCart", async () => {
        (prisma.cartItem.deleteMany as jest.Mock).mockResolvedValue({count: 1});
        const result = await repo.deleteCart(1)

        expect(result).toMatchObject({count: 1});
    })

    it("Test generateTokenOTP", async () => {
        const token = {
            token: "x",
            type: "x",
            user_id: 1,
        } as TokenOTP;

        (prisma.tokenOTP.create as jest.Mock).mockResolvedValue(token);
        const result = await repo.generateTokenOTP(1, "x", "x")

        expect(result).toMatchObject(token);
    })

    it("Test verifyTokenOTP", async () => {
        const token = {
            token: "x",
            type: "x",
            user_id: 1,
            created_at: new Date(new Date().getDate() - 60 * 60 * 1000),
            user: null
        };

        // success
        (prisma.tokenOTP.findFirst as jest.Mock).mockResolvedValue(token);
        (prisma.tokenOTP.delete as jest.Mock).mockResolvedValue(token);
        let {success, data} = await repo.verifyTokenOTP("x", "x")

        expect(success).toBe(true);
        expect(data).toBe(null);

        // fail expired
        token.created_at = new Date();
        (prisma.tokenOTP.findFirst as jest.Mock).mockResolvedValue(token);
        ({success, data} = await repo.verifyTokenOTP("x", "x"))

        expect(success).toBe(false);
        expect(data).toMatchObject({});

        // fail not found
        (prisma.tokenOTP.findFirst as jest.Mock).mockResolvedValue(null);
        ({success, data} = await repo.verifyTokenOTP("x", "x"))

        expect(success).toBe(false);
        expect(data).toMatchObject({});
    })

    it("Test getTokens", async () => {
        (prisma.user.findUnique as jest.Mock).mockResolvedValue({
            ...data,
            tokens: [{
                id: 1,
                token: "x",
                type: "x",
                user_id: 1
            }]
        } as User);

        let result = await repo.getTokens(1)

        expect(result).toMatchObject([{
            id: 1,
            token: "x",
            type: "x"
        }]);

        (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

        result = await repo.getTokens(1)

        expect(result).toMatchObject([]);
    });

    it("Test getPayments", async () => {
        (prisma.user.findUnique as jest.Mock).mockResolvedValue({
            ...data,
            payments: [{
                id: 1,
                payment_method_id: 1,
                order_id: 1,
                amount: 1,
                status: "status",
            }]
        } as User);

        let result = await repo.getPayments(1)

        expect(result).toMatchObject([{
            id: 1,
            payment_method_id: 1,
            order_id: 1,
            amount: 1,
            status: "status",
        }]);

        (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

        result = await repo.getPayments(1)

        expect(result).toMatchObject([]);
    });

    it("Test createPayment", async () => {
        (prisma.order.findUnique as jest.Mock).mockResolvedValue({id: 1, total: 1});
        (prisma.paymentMethod.findUnique as jest.Mock).mockResolvedValue({id: 1});
        (prisma.user.update as jest.Mock).mockResolvedValue({
            ...data,
            payments: [{
                id: 1,
                payment_method_id: 1,
                order_id: 1,
                amount: 1,
                status: "status",
            }]
        } as User);

        let result = await repo.createPayment(1, 1, 1);

        expect(result).toMatchObject({
            id: 1,
            payment_method_id: 1,
            order_id: 1,
            amount: 1,
            status: "status",
        });

        (prisma.order.findUnique as jest.Mock).mockResolvedValue(null);
        await expect(repo.createPayment(1, 1, 1)).rejects.toThrowError("Order not found");

        (prisma.order.findUnique as jest.Mock).mockResolvedValue({id: 1, total: 1});
        (prisma.paymentMethod.findUnique as jest.Mock).mockResolvedValue(null);

        await expect(repo.createPayment(1, 1, 1)).rejects.toThrowError("Payment method not found");
    });
})