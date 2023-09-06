import AccountsController from "@controller/accounts.controller";
import PermissionController from "@controller/permission.controller";
import * as Constants from "@lib/constants";
import { STATUS_CODE } from "@lib/constants";
import { NextRequest } from "next/server";
import { TokenOTP, User } from "@prisma/client";


jest.mock("@repository/user.repo", () => require("@mocks/repository/user.repo.mock"));

const isAllowed = jest.spyOn(PermissionController, "isAllowed");

describe("AccountsController", () => {
    let controller: AccountsController;
    let req: NextRequest;
    const user = {
        id: 1,
        username: "username",
        email: "email",
        first_name: "name",
        last_name: "name",
        image_url: "https://image.com/image.jpg"
    } as User;


    beforeEach(() => {
        jest.clearAllMocks();
        controller = new AccountsController();
    });

    describe("Test getAccounts", () => {
        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/api/accounts");
        });

        it("returns 200 with accounts data", async () => {
            isAllowed.mockResolvedValueOnce(true);
            (controller.repo.getAll as jest.Mock).mockImplementation(() => Promise.resolve([user]));

            const result = await controller.getAccounts(req);

            expect(result.statusCode).toBe(STATUS_CODE.OK);
            expect(result.response).toBeDefined();
        });

        it("returns 401 if unauthorized", async () => {
            isAllowed.mockResolvedValueOnce("unauthorized");

            const result = await controller.getAccounts(req);

            expect(result.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(result.response).toBeDefined();
        });

        it("returns 403 if user is not permitted", async () => {
            isAllowed.mockResolvedValueOnce(false);

            const result = await controller.getAccounts(req);

            expect(result.statusCode).toBe(STATUS_CODE.FORBIDDEN);
            expect(result.response).toBeDefined();
        });

        it("returns 404 if no accounts found", async () => {
            isAllowed.mockResolvedValueOnce(true);
            (controller.repo.getAll as jest.Mock).mockImplementation(() => Promise.resolve([]));

            const result = await controller.getAccounts(req);

            expect(result.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(result.response).toBeDefined();
        });
    });

    describe("Test createAccount", () => {
        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/api/accounts", {
                method: "POST",
                body: JSON.stringify({
                    "firstName": "test",
                    "lastName": "test",
                    "username": "test",
                    "email": "test@mail.com",
                    "password": "supersecretpassword",
                    "confirmPassword": "supersecretpassword"
                })
            });
        });

        it("returns 201 with account data", async () => {
            isAllowed.mockResolvedValueOnce(true);
            (controller.repo.create as jest.Mock).mockResolvedValueOnce(user);
            (controller.repo.getByEmail as jest.Mock).mockResolvedValueOnce(null);
            (controller.repo.getByUsername as jest.Mock).mockResolvedValueOnce(null);
            (controller.repo.generateTokenOTP as jest.Mock).mockResolvedValue({
                id: 1,
                user_id: 1,
                token: "x",
                type: Constants.TOKEN_TYPE.EMAIL_CONFIRMATION_OTP,
            } as TokenOTP);

            const result = await controller.createAccount(req);

            expect(result.statusCode).toBe(STATUS_CODE.CREATED);
            expect(result.response).toBeDefined();
        });

        it("returns 400 if invalid data", async () => {
            isAllowed.mockResolvedValueOnce(true);
            (controller.repo.create as jest.Mock).mockImplementation(() => Promise.resolve(user));

            req = new NextRequest("http://localhost:3000/api/accounts", {
                method: "POST"
            });

            const result = await controller.createAccount(req);

            expect(result.statusCode).toBe(STATUS_CODE.BAD_REQUEST);
            expect(result.response).toBeDefined();
        });

        it("returns 401 if unauthorized", async () => {
            isAllowed.mockResolvedValueOnce("unauthorized");

            const result = await controller.createAccount(req);

            expect(result.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(result.response).toBeDefined();
        });

        it("returns 403 if user is not permitted", async () => {
            isAllowed.mockResolvedValueOnce(false);

            const result = await controller.createAccount(req);

            expect(result.statusCode).toBe(STATUS_CODE.FORBIDDEN);
            expect(result.response).toBeDefined();
        });

        it("returns 422 if wrong body", async () => {
            isAllowed.mockResolvedValueOnce(true);

            req = new NextRequest("http://localhost:3000/api/accounts", {
                method: "POST",
                body: "{}"
            });

            const result = await controller.createAccount(req);

            expect(result.statusCode).toBe(STATUS_CODE.UNPROCESSABLE_ENTITY);
            expect(result.response).toBeDefined();
        });
    });

    describe("Test getAccount", () => {
        const params = { id: "1" };
        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/api/accounts/1");
        });

        it("returns 200 with account data", async () => {
            isAllowed.mockResolvedValueOnce(true);
            (controller.repo.getById as jest.Mock).mockResolvedValueOnce(user);

            const result = await controller.getAccount(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.OK);
            expect(result.response).toBeDefined();
        });

        it("returns 401 if unauthorized", async () => {
            isAllowed.mockResolvedValueOnce("unauthorized");

            const result = await controller.getAccount(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(result.response).toBeDefined();
        });

        it("returns 403 if user is not permitted", async () => {
            isAllowed.mockResolvedValueOnce(false);

            const result = await controller.getAccount(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.FORBIDDEN);
            expect(result.response).toBeDefined();
        });

        it("returns 404 if account not found", async () => {
            isAllowed.mockResolvedValueOnce(true);
            (controller.repo.getById as jest.Mock).mockResolvedValueOnce(null);

            const result = await controller.getAccount(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(result.response).toBeDefined();
        });
    });

    describe("Test updateAccount", () => {
        const params = { id: "1" };

        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/api/accounts/1", {
                method: "PUT",
                body: JSON.stringify({
                    "firstName": "test",
                    "lastName": "test",
                    "username": "test",
                    "email": "test@mail.com",
                    "password": "supersecretpassword",
                    "confirmPassword": "supersecretpassword"
                })
            });
        });

        it("returns 200 with account data", async () => {
            isAllowed.mockResolvedValueOnce(true);
            (controller.repo.update as jest.Mock).mockResolvedValueOnce(user);
            (controller.repo.getById as jest.Mock).mockResolvedValueOnce(user);

            const result = await controller.updateAccount(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.OK);
            expect(result.response).toBeDefined();
        });

        it("returns 400 if invalid body", async () => {
            isAllowed.mockResolvedValueOnce(true);
            (controller.repo.update as jest.Mock).mockResolvedValueOnce(user);

            req = new NextRequest("http://localhost:3000/api/accounts/1", {
                method: "PUT"
            });

            const result = await controller.updateAccount(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.BAD_REQUEST);
            expect(result.response).toBeDefined();
        });

        it("returns 401 if unauthorized", async () => {
            isAllowed.mockResolvedValueOnce("unauthorized");

            const result = await controller.updateAccount(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(result.response).toBeDefined();
        });

        it("returns 403 if user is not permitted", async () => {
            isAllowed.mockResolvedValueOnce(false);

            const result = await controller.updateAccount(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.FORBIDDEN);
            expect(result.response).toBeDefined();
        });

        it("returns 404 if account not found", async () => {
            isAllowed.mockResolvedValueOnce(true);
            (controller.repo.update as jest.Mock).mockResolvedValueOnce(null);

            const result = await controller.updateAccount(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(result.response).toBeDefined();
        });
    });

    describe("Test deleteAccount", () => {
        const params = { id: "1" };

        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/api/accounts/1", { method: "DELETE" });
        });

        it("returns 200 if success", async () => {
            isAllowed.mockResolvedValueOnce(true);
            (controller.repo.getById as jest.Mock).mockResolvedValueOnce(user);
            (controller.repo.delete as jest.Mock).mockResolvedValueOnce(user);

            const result = await controller.deleteAccount(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.OK);
            expect(result.response).toBeDefined();
        });

        it("returns 401 if unauthorized", async () => {
            isAllowed.mockResolvedValueOnce("unauthorized");

            const result = await controller.deleteAccount(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(result.response).toBeDefined();
        });

        it("returns 403 if user is not permitted", async () => {
            isAllowed.mockResolvedValueOnce(false);

            const result = await controller.deleteAccount(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.FORBIDDEN);
            expect(result.response).toBeDefined();
        });

        it("returns 404 if account not found", async () => {
            isAllowed.mockResolvedValueOnce(true);
            (controller.repo.delete as jest.Mock).mockResolvedValueOnce(null);

            const result = await controller.deleteAccount(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(result.response).toBeDefined();
        });
    });

    describe("Test get accountRoles", () => {
        it.todo("returns 200 with roles data");
        it.todo("returns 401 if unauthorized");
        it.todo("returns 403 if user is not permitted");
        it.todo("returns 404 if account not found");
    });

    describe("Test updateAccountRoles", () => {
        it.todo("returns 200 with roles data");
        it.todo("returns 400 if invalid body");
        it.todo("returns 422 if wrong body");
        it.todo("returns 401 if unauthorized");
        it.todo("returns 403 if user is not permitted");
        it.todo("returns 404 if account not found");
    });

    describe("Test getPaymentMethods", () => {
        it.todo("returns 200 with payment methods data");
        it.todo("returns 401 if unauthorized");
        it.todo("returns 403 if user is not permitted");
        it.todo("returns 404 if account not found");
    });

    describe("Test getPaymentMethod", () => {
        it.todo("returns 200 with payment method data");
        it.todo("returns 401 if unauthorized");
        it.todo("returns 403 if user is not permitted");
        it.todo("returns 404 if account not found");
        it.todo("returns 404 if payment method not found");
    });

    describe("Test getAddresses", () => {
        it.todo("returns 200 with addresses data");
        it.todo("returns 401 if unauthorized");
        it.todo("returns 403 if user is not permitted");
        it.todo("returns 404 if account not found");
    });

    describe("Test getAddress", () => {
        it.todo("returns 200 with address data");
        it.todo("returns 401 if unauthorized");
        it.todo("returns 403 if user is not permitted");
        it.todo("returns 404 if account not found");
        it.todo("returns 404 if address not found");
    });

    describe("Test getOrders", () => {
        it.todo("returns 200 with orders data");
        it.todo("returns 401 if unauthorized");
        it.todo("returns 403 if user is not permitted");
        it.todo("returns 404 if account not found");
    });

    describe("Test getOrder", () => {
        it.todo("returns 200 with order data");
        it.todo("returns 401 if unauthorized");
        it.todo("returns 403 if user is not permitted");
        it.todo("returns 404 if account not found");
        it.todo("returns 404 if order not found");
    });

    describe("Test getWishlist", () => {
        it.todo("returns 200 with wishlists data");
        it.todo("returns 401 if unauthorized");
        it.todo("returns 403 if user is not permitted");
        it.todo("returns 404 if account not found");
    });

    describe("Test getWishlistItem", () => {
        it.todo("returns 200 with wishlist data");
        it.todo("returns 401 if unauthorized");
        it.todo("returns 403 if user is not permitted");
        it.todo("returns 404 if account not found");
        it.todo("returns 404 if wishlist not found");
    });

    describe("Test getCart", () => {
        it.todo("returns 200 with cart data");
        it.todo("returns 401 if unauthorized");
        it.todo("returns 403 if user is not permitted");
        it.todo("returns 404 if account not found");
        it.todo("returns 404 if cart not found");
    });

    describe("Test getCartItem", () => {
        it.todo("returns 200 with cart item data");
        it.todo("returns 401 if unauthorized");
        it.todo("returns 403 if user is not permitted");
        it.todo("returns 404 if account not found");
        it.todo("returns 404 if cart item not found");
    });

    describe("Test getReviews", () => {
        it.todo("returns 200 with reviews data");
        it.todo("returns 401 if unauthorized");
        it.todo("returns 403 if user is not permitted");
        it.todo("returns 404 if account not found");
    });

    describe("Test getReview", () => {
        it.todo("returns 200 with review data");
        it.todo("returns 401 if unauthorized");
        it.todo("returns 403 if user is not permitted");
        it.todo("returns 404 if account not found");
        it.todo("returns 404 if review not found");
    });

    describe("Test getPayments", () => {
        it.todo("returns 200 with reviews data");
        it.todo("returns 401 if unauthorized");
        it.todo("returns 403 if user is not permitted");
        it.todo("returns 404 if account not found");
    });

    describe("Test getPayment", () => {
        it.todo("returns 200 with review data");
        it.todo("returns 401 if unauthorized");
        it.todo("returns 403 if user is not permitted");
        it.todo("returns 404 if account not found");
        it.todo("returns 404 if review not found");
    });
});

