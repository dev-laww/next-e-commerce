import { User } from "@prisma/client";
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
        last_name: "name"
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

    it.todo("Test getUserByEmail")
    it.todo("Test getUserByUsername")
    it.todo("Test updateUser")
    it.todo("Test changePassword")
    it.todo("Test deleteUserById")
    it.todo("Test getAllUsers")
    it.todo("Test getUserRoles")
    it.todo("Test updateUserRoles")
    it.todo("Test getUserPermissions")
    it.todo("Test getUserPaymentMethods")
    it.todo("Test deleteUserPaymentMethods")
    it.todo("Test getUserAddresses")
    it.todo("Test deleteUserAddresses")
    it.todo("Test getUserOrders")
    it.todo("Test deleteUserOrders")
    it.todo("Test getUserReviews")
    it.todo("Test deleteUserReviews")
    it.todo("Test deleteAllUserReviews")
    it.todo("Test getUserWishlist")
    it.todo("Test deleteUserWishlist")
    it.todo("Test getUserCart")
    it.todo("Test deleteUserCart")
})