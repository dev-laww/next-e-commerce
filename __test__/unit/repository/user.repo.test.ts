import { Address, PaymentMethod, Order, User, Review, WishlistItem, CartItem, TokenOTP } from "@prisma/client";
import { mockReset } from "jest-mock-extended";

import UserRepository from "@repository/user.repo";
import prisma from "@lib/prisma";


jest.mock("@lib/prisma", () => require("@mocks/prisma.mock"));

describe("UserRepository", () => {
    let repository: UserRepository;
    const data = {
        password: "password",
        username: "username",
        email: "email",
        first_name: "name",
        last_name: "name",
    } as User;

    beforeEach(() => {
        repository = new UserRepository();
        mockReset(prisma)
    });

    it("Test createUser", async () => {
        (prisma.user.create as jest.Mock).mockResolvedValue(data as User);
        const result = await repository.createUser(data)

        expect(result).toMatchObject(data);
    });

    it("Test getUserById", async () => {
        (prisma.user.findUnique as jest.Mock).mockResolvedValue(data as User);
        const result = await repository.getUserById(1)

        expect(result).toMatchObject(data);
    })

    it("Test getUserByEmail", async () => {
        (prisma.user.findUnique as jest.Mock).mockResolvedValue(data as User);
        const result = await repository.getUserByEmail("email")

        expect(result).toMatchObject(data);
    })

    it("Test getUserByUsername", async () => {
        (prisma.user.findUnique as jest.Mock).mockResolvedValue(data as User);
        const result = await repository.getUserByUsername("username")

        expect(result).toMatchObject(data);
    })

    it("Test updateUser", async () => {
        (prisma.user.update as jest.Mock).mockResolvedValue(data as User);
        const result = await repository.updateUser(1, data)

        expect(result).toMatchObject(data);
    })

    it("Test changePassword", async () => {
        (prisma.user.update as jest.Mock).mockResolvedValue(data as User);
        const result = await repository.changePassword(1, "password")

        expect(result).toMatchObject(data);
    })

    it("Test deleteUserById", async () => {
        (prisma.user.delete as jest.Mock).mockResolvedValue(data as User);
        const result = await repository.deleteUserById(1)

        expect(result).toMatchObject(data);
    })

    it("Test getAllUsers (without filter)", async () => {
        (prisma.user.findMany as jest.Mock).mockResolvedValue([data] as User[]);
        const result = await repository.getAllUsers()

        expect(result).toMatchObject([data]);
    })

    it("Test getAllUsers (with filter)", async () => {
        (prisma.user.findMany as jest.Mock).mockResolvedValue([data] as User[]);
        const result = await repository.getAllUsers({
            id: 1,
            username: "username"
        })

        expect(result).toMatchObject([data]);
    })

    it("Test getUserRoles (non empty)", async () => {
        const userWithRoles = {
            ...data,
            roles: [{
                id: 1,
                name: "name",
            }]
        };

        (prisma.user.findUnique as jest.Mock).mockResolvedValue(userWithRoles as User);
        const result = await repository.getUserRoles(1)

        expect(result).toMatchObject(userWithRoles.roles);
    })

    it("Test getUserRoles (empty)", async () => {

        (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
        const result = await repository.getUserRoles(1)

        expect(result).toMatchObject([]);
    })

    it("Test updateUserRoles", async () => {
        (prisma.user.update as jest.Mock).mockResolvedValue(data as User);
        const result = await repository.updateUserRoles(1, [1])

        expect(result).toMatchObject(data);
    })

    it("Test getUserPermissions (non empty)", async () => {
        const userWithRoles = {
            ...data,
            roles: [{
                id: 1,
                name: "name",
            }]
        };

        (prisma.user.findUnique as jest.Mock).mockResolvedValue(userWithRoles as User);
        (prisma.rolePermission.findMany as jest.Mock).mockResolvedValue([]);

        const result = await repository.getUserPermissions(1)

        expect(result).toMatchObject([]);
    })

    it("Test getUserPermissions (empty)", async () => {
        (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
        (prisma.rolePermission.findMany as jest.Mock).mockResolvedValue([]);
        const result = await repository.getUserPermissions(1)

        expect(result).toBe(null);
    })

    it("Test getUserPaymentMethods (non empty)", async () => {
        const userWithPaymentMethods = {
            ...data,
            payment_methods: [{
                id: 1,
                user_id: 1,
                name: "name",
                card_number: "xxx-xxx-xxxx-xxx",
                expiration_date: "xx/xx",
                cvv: "xxx",
            }] as PaymentMethod[]
        };

        (prisma.user.findUnique as jest.Mock).mockResolvedValue(userWithPaymentMethods as User);
        const result = await repository.getUserPaymentMethods(1)

        expect(result).toMatchObject(userWithPaymentMethods.payment_methods);
    })

    it("Test getUserPaymentMethods (empty)", async () => {
        (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
        const result = await repository.getUserPaymentMethods(1)

        expect(result).toMatchObject([]);
    })

    it("Test deleteUserPaymentMethods", async () => {
        (prisma.paymentMethod.deleteMany as jest.Mock).mockResolvedValue({count: 1});
        const result = await repository.deleteUserPaymentMethods(1)

        expect(result).toMatchObject({count: 1});
    })

    it("Test getUserAddresses (non empty)", async () => {
        const userWithAddresses = {
            ...data,
            addresses: [{
                id: 1,
                user_id: 1,
                address: "x",
                city: "x",
                state: "x",
                country: "x",
                zip: "xxxx"
            }] as Address[]
        };

        (prisma.user.findUnique as jest.Mock).mockResolvedValue(userWithAddresses as User);
        const result = await repository.getUserAddresses(1)

        expect(result).toMatchObject(userWithAddresses.addresses);
    })

    it("Test getUserAddresses (empty)", async () => {
        (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
        const result = await repository.getUserAddresses(1)

        expect(result).toMatchObject([]);
    })

    it("Test deleteUserAddresses", async () => {
        (prisma.address.deleteMany as jest.Mock).mockResolvedValue({count: 1});
        const result = await repository.deleteUserAddresses(1)

        expect(result).toMatchObject({count: 1});
    })

    it("Test getUserOrders (non empty)", async () => {
        const userWithOrders = {
            ...data,
            orders: [{
                id: 1,
                user_id: 1,
                shipping_id: 1,
                address_id: 1,
                order_number: "xxxx",
                status: "status",
                total: 1
            }] as Order[]
        };

        (prisma.user.findUnique as jest.Mock).mockResolvedValue(userWithOrders as User);
        const result = await repository.getUserOrders(1)

        expect(result).toMatchObject(userWithOrders.orders);
    })

    it("Test getUserOrders (empty)", async () => {
        (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
        const result = await repository.getUserOrders(1)

        expect(result).toMatchObject([]);
    })

    it("Test deleteUserOrders", async () => {
        (prisma.order.deleteMany as jest.Mock).mockResolvedValue({count: 1});

        const result = await repository.deleteUserOrders(1)

        expect(result).toMatchObject({count: 1});
    })

    it("Test getUserReviews (non empty)", async () => {
        const userWithReviews = {
            ...data,
            reviews: [{
                id: 1,
                user_id: 1,
                product_id: 1,
                rating: 1,
                comment: "comment"
            }] as Review[]
        };

        (prisma.user.findUnique as jest.Mock).mockResolvedValue(userWithReviews as User);
        const result = await repository.getUserReviews(1)

        expect(result).toMatchObject(userWithReviews.reviews);
    })

    it("Test getUserReviews (empty)", async () => {
        (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
        const result = await repository.getUserReviews(1)

        expect(result).toMatchObject([]);
    })

    it("Test deleteUserReviews", async () => {
        (prisma.review.deleteMany as jest.Mock).mockResolvedValue({count: 1});

        const result = await repository.deleteUserReviews(1)

        expect(result).toMatchObject({count: 1});
    })

    it("Test getUserWishlist (non empty)", async () => {
        const userWithWishlist = {
            ...data,
            wishlist: [{
                id: 1,
                user_id: 1,
                product_id: 1,
            }] as WishlistItem[]
        };

        (prisma.user.findUnique as jest.Mock).mockResolvedValue(userWithWishlist as User);
        const result = await repository.getUserWishlist(1)

        expect(result).toMatchObject(userWithWishlist.wishlist);
    })

    it("Test getUserWishlist (empty)", async () => {
        (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
        const result = await repository.getUserWishlist(1)

        expect(result).toMatchObject([]);
    })

    it("Test deleteUserWishlist", async () => {
        (prisma.wishlistItem.deleteMany as jest.Mock).mockResolvedValue({count: 1});
        const result = await repository.deleteUserWishlist(1)

        expect(result).toMatchObject({count: 1});
    })

    it("Test getUserCart (non empty)", async () => {
        const userWithCart = {
            ...data,
            cart: [{
                id: 1,
                user_id: 1,
                product_id: 1,
            }] as CartItem[]
        };

        (prisma.user.findUnique as jest.Mock).mockResolvedValue(userWithCart as User);
        const result = await repository.getUserCart(1)

        expect(result).toMatchObject(userWithCart.cart);
    })

    it("Test getUserCart (empty)", async () => {
        (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
        const result = await repository.getUserCart(1)

        expect(result).toMatchObject([]);
    })

    it("Test deleteUserCart", async () => {
        (prisma.cartItem.deleteMany as jest.Mock).mockResolvedValue({count: 1});
        const result = await repository.deleteUserCart(1)

        expect(result).toMatchObject({count: 1});
    })

    it("Test generateTokenOTP", async () => {
        const token = {
            token: "x",
            type: "x",
            user_id: 1,
        } as TokenOTP;

        (prisma.tokenOTP.create as jest.Mock).mockResolvedValue(token);
        const result = await repository.generateTokenOTP(1, "x", "x")

        expect(result).toMatchObject(token);
    })

    it("Test verifyTokenOTP (success)", async () => {
        const token = {
            token: "x",
            type: "x",
            user_id: 1,
            created_at: new Date(new Date().getDate() - 60 * 60 * 1000),
            user: null
        };

        (prisma.tokenOTP.findFirst as jest.Mock).mockResolvedValue(token);
        (prisma.tokenOTP.delete as jest.Mock).mockResolvedValue(token);
        const {success, data} = await repository.verifyTokenOTP("x", "x")

        expect(success).toBe(true);
        expect(data).toBe(null);
    })

    it("Test verifyTokenOTP (fail)", async () => {
        const token = {
            token: "x",
            type: "x",
            user_id: 1,
            created_at: new Date(),
        };

        (prisma.tokenOTP.findFirst as jest.Mock).mockResolvedValue(token);
        let {success, data} = await repository.verifyTokenOTP("x", "x")

        expect(success).toBe(false);
        expect(data).toMatchObject({});

        (prisma.tokenOTP.findFirst as jest.Mock).mockResolvedValue(null);
        ({success, data} = await repository.verifyTokenOTP("x", "x"))

        expect(success).toBe(false);
        expect(data).toMatchObject({});
    })
})