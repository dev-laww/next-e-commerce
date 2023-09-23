import AccountsController from "@controller/accounts.controller";
import PermissionController from "@controller/permission.controller";
import * as Constants from "@lib/constants";
import { STATUS_CODE } from "@lib/constants";
import { NextRequest } from "next/server";
import { TokenOTP, User } from "@prisma/client";
import Response from "@lib/http";
import Repository from "@src/repository";


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
        controller = new AccountsController();
    });

    describe("Test getAccounts", () => {
        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/api/accounts");
        });

        it("returns 200 with accounts data", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.getAll as jest.Mock).mockImplementation(() => Promise.resolve([user]));

            const result = await controller.getAccounts(req);

            expect(result.statusCode).toBe(STATUS_CODE.OK);
            expect(result.response).toBeDefined();
        });

        it("returns 401 if unauthorized", async () => {
            isAllowed.mockResolvedValueOnce(Response.unauthorized());

            const result = await controller.getAccounts(req);

            expect(result.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(result.response).toBeDefined();
        });

        it("returns 403 if user is not permitted", async () => {
            isAllowed.mockResolvedValueOnce(Response.forbidden);

            const result = await controller.getAccounts(req);

            expect(result.statusCode).toBe(STATUS_CODE.FORBIDDEN);
            expect(result.response).toBeDefined();
        });

        it("returns 404 if no accounts found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.getAll as jest.Mock).mockImplementation(() => Promise.resolve([]));

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
                    firstName: "test",
                    lastName: "test",
                    username: "test",
                    email: "test@mail.com",
                    password: "supersecretpassword",
                    confirmPassword: "supersecretpassword"
                })
            });
        });

        it("returns 201 with account data", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.create as jest.Mock).mockResolvedValueOnce(user);
            (Repository.user.getByEmail as jest.Mock).mockResolvedValueOnce(null);
            (Repository.user.getByUsername as jest.Mock).mockResolvedValueOnce(null);
            (Repository.user.generateTokenOTP as jest.Mock).mockResolvedValue({
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
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.create as jest.Mock).mockImplementation(() => Promise.resolve(user));

            req = new NextRequest("http://localhost:3000/api/accounts", {
                method: "POST"
            });

            const result = await controller.createAccount(req);

            expect(result.statusCode).toBe(STATUS_CODE.BAD_REQUEST);
            expect(result.response).toBeDefined();
        });

        it("returns 401 if unauthorized", async () => {
            isAllowed.mockResolvedValueOnce(Response.unauthorized());

            const result = await controller.createAccount(req);

            expect(result.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(result.response).toBeDefined();
        });

        it("returns 403 if user is not permitted", async () => {
            isAllowed.mockResolvedValueOnce(Response.forbidden);

            const result = await controller.createAccount(req);

            expect(result.statusCode).toBe(STATUS_CODE.FORBIDDEN);
            expect(result.response).toBeDefined();
        });

        it("returns 422 if wrong body", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());

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
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.getById as jest.Mock).mockResolvedValueOnce(user);

            const result = await controller.getAccount(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.OK);
            expect(result.response).toBeDefined();
        });

        it("returns 401 if unauthorized", async () => {
            isAllowed.mockResolvedValueOnce(Response.unauthorized());

            const result = await controller.getAccount(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(result.response).toBeDefined();
        });

        it("returns 403 if user is not permitted", async () => {
            isAllowed.mockResolvedValueOnce(Response.forbidden);

            const result = await controller.getAccount(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.FORBIDDEN);
            expect(result.response).toBeDefined();
        });

        it("returns 404 if account not found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.getById as jest.Mock).mockResolvedValueOnce(null);

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
                    firstName: "test",
                    lastName: "test",
                    username: "test",
                    email: "test@mail.com",
                    password: "supersecretpassword",
                    confirmPassword: "supersecretpassword"
                })
            });
        });

        it("returns 200 with account data", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.update as jest.Mock).mockResolvedValueOnce(user);
            (Repository.user.getById as jest.Mock).mockResolvedValueOnce(user);

            const result = await controller.updateAccount(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.OK);
            expect(result.response).toBeDefined();
        });

        it("returns 400 if invalid body", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.update as jest.Mock).mockResolvedValueOnce(user);

            req = new NextRequest("http://localhost:3000/api/accounts/1", {
                method: "PUT"
            });

            const result = await controller.updateAccount(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.BAD_REQUEST);
            expect(result.response).toBeDefined();
        });

        it("returns 401 if unauthorized", async () => {
            isAllowed.mockResolvedValueOnce(Response.unauthorized());

            const result = await controller.updateAccount(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(result.response).toBeDefined();
        });

        it("returns 403 if user is not permitted", async () => {
            isAllowed.mockResolvedValueOnce(Response.forbidden);

            const result = await controller.updateAccount(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.FORBIDDEN);
            expect(result.response).toBeDefined();
        });

        it("returns 404 if account not found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.update as jest.Mock).mockResolvedValueOnce(null);

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
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.getById as jest.Mock).mockResolvedValueOnce(user);
            (Repository.user.delete as jest.Mock).mockResolvedValueOnce(user);

            const result = await controller.deleteAccount(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.OK);
            expect(result.response).toBeDefined();
        });

        it("returns 401 if unauthorized", async () => {
            isAllowed.mockResolvedValueOnce(Response.unauthorized());

            const result = await controller.deleteAccount(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(result.response).toBeDefined();
        });

        it("returns 403 if user is not permitted", async () => {
            isAllowed.mockResolvedValueOnce(Response.forbidden);

            const result = await controller.deleteAccount(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.FORBIDDEN);
            expect(result.response).toBeDefined();
        });

        it("returns 404 if account not found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.delete as jest.Mock).mockResolvedValueOnce(null);

            const result = await controller.deleteAccount(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(result.response).toBeDefined();
        });
    });

    describe("Test getAccountRoles", () => {
        const params = { id: "1" };
        const roles = [{
            id: 1,
            name: "Test",
            code: "role:test"
        }];

        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/api/accounts/1/roles");
        });

        it("returns 200 with roles data", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.getById as jest.Mock).mockResolvedValueOnce(user);
            (Repository.user.getRoles as jest.Mock).mockResolvedValueOnce(roles);

            const result = await controller.getAccountRoles(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.OK);
            expect(result.response).toBeDefined();
        });

        it("returns 401 if unauthorized", async () => {
            isAllowed.mockResolvedValueOnce(Response.unauthorized());

            const result = await controller.getAccountRoles(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(result.response).toBeDefined();
        });

        it("returns 403 if user is not permitted", async () => {
            isAllowed.mockResolvedValueOnce(Response.forbidden);

            const result = await controller.getAccountRoles(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.FORBIDDEN);
            expect(result.response).toBeDefined();
        });

        it("returns 404 if account not found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.getById as jest.Mock).mockResolvedValueOnce(null);

            const result = await controller.getAccountRoles(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(result.response).toBeDefined();
        });

        it("returns 404 if roles not found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.getById as jest.Mock).mockResolvedValueOnce(user);
            (Repository.user.getRoles as jest.Mock).mockResolvedValueOnce([]);

            const result = await controller.getAccountRoles(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(result.response).toBeDefined();
        });
    });

    describe("Test updateAccountRoles", () => {
        const params = { id: "1" };

        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/api/accounts/1/roles", {
                method: "PUT",
                body: JSON.stringify({
                    roles: [1]
                })
            });
        });

        it("returns 200 with roles data", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.getById as jest.Mock).mockResolvedValueOnce(user);
            (Repository.user.updateRoles as jest.Mock).mockResolvedValueOnce(user);

            const result = await controller.updateAccountRoles(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.OK);
            expect(result.response).toBeDefined();
        });

        it("returns 400 if invalid body", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.getById as jest.Mock).mockResolvedValueOnce(user);
            req = new NextRequest("http://localhost:3000/api/accounts/1/roles", { method: "PUT" });

            const result = await controller.updateAccountRoles(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.BAD_REQUEST);
            expect(result.response).toBeDefined();
        });

        it("returns 401 if unauthorized", async () => {
            isAllowed.mockResolvedValueOnce(Response.unauthorized());

            const result = await controller.updateAccountRoles(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(result.response).toBeDefined();
        });

        it("returns 403 if user is not permitted", async () => {
            isAllowed.mockResolvedValueOnce(Response.forbidden);

            const result = await controller.updateAccountRoles(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.FORBIDDEN);
            expect(result.response).toBeDefined();
        });

        it("returns 404 if account not found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.getById as jest.Mock).mockResolvedValueOnce(null);

            const result = await controller.updateAccountRoles(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(result.response).toBeDefined();
        });
    });

    describe("Test getPaymentMethods", () => {
        const params = { id: "1" };
        const paymentMethods = [{
            id: 1,
            name: "Credit Card",
            email: null,
            phone_number: null,
            card_number: "**** **** **** 1234",
            expiration_date: "12/25",
            cvv: "123"
        }]


        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/api/accounts/1/payment-methods");
        });

        it("returns 200 with payment methods data", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.getById as jest.Mock).mockResolvedValueOnce(user);
            (Repository.user.getPaymentMethods as jest.Mock).mockResolvedValueOnce(paymentMethods);

            const result = await controller.getPaymentMethods(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.OK);
            expect(result.response).toBeDefined();
        });

        it("returns 401 if unauthorized", async () => {
            isAllowed.mockResolvedValueOnce(Response.unauthorized());

            const result = await controller.getPaymentMethods(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(result.response).toBeDefined();
        });

        it("returns 403 if user is not permitted", async () => {
            isAllowed.mockResolvedValueOnce(Response.forbidden);

            const result = await controller.getPaymentMethods(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.FORBIDDEN);
            expect(result.response).toBeDefined();
        });

        it("returns 404 if account not found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.getById as jest.Mock).mockResolvedValueOnce(null);

            const result = await controller.getPaymentMethods(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(result.response).toBeDefined();
        });

        it("returns 404 if payment methods not found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.getById as jest.Mock).mockResolvedValueOnce(user);
            (Repository.user.getPaymentMethods as jest.Mock).mockResolvedValueOnce([]);

            const result = await controller.getPaymentMethods(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(result.response).toBeDefined();
        });
    });

    describe("Test getPaymentMethod", () => {
        const params = { id: "1", paymentMethodId: "1" };
        const paymentMethod = {
            id: 1,
            name: "Credit Card",
            email: null,
            phone_number: null,
            card_number: "**** **** **** 1234",
            expiration_date: "12/25",
            cvv: "123"
        }

        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/api/accounts/1/payment-methods/1");
        });

        it("returns 200 with payment method data", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.getById as jest.Mock).mockResolvedValueOnce(user);
            (Repository.user.getPaymentMethods as jest.Mock).mockResolvedValueOnce([paymentMethod]);

            const result = await controller.getPaymentMethod(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.OK);
            expect(result.response).toBeDefined();
        });

        it("returns 401 if unauthorized", async () => {
            isAllowed.mockResolvedValueOnce(Response.unauthorized());

            const result = await controller.getPaymentMethod(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(result.response).toBeDefined();
        });

        it("returns 403 if user is not permitted", async () => {
            isAllowed.mockResolvedValueOnce(Response.forbidden);

            const result = await controller.getPaymentMethod(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.FORBIDDEN);
            expect(result.response).toBeDefined();
        });

        it("returns 404 if account not found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.getById as jest.Mock).mockResolvedValueOnce(null);

            const result = await controller.getPaymentMethod(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(result.response).toBeDefined();
        });

        it("returns 404 if payment method not found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.getById as jest.Mock).mockResolvedValueOnce(user);
            (Repository.user.getPaymentMethods as jest.Mock).mockResolvedValueOnce([]);

            const result = await controller.getPaymentMethod(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(result.response).toBeDefined();
        });
    });

    describe("Test getAddresses", () => {
        const params = { id: "1" };
        const addresses = [{
            id: 1,
            address: "123 Main Street",
            city: "New York",
            state: "NY",
            country: "USA",
            zip: "xxxxx"
        }];

        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/api/accounts/1/addresses");
        });

        it("returns 200 with addresses data", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.getById as jest.Mock).mockResolvedValueOnce(user);
            (Repository.user.getAddresses as jest.Mock).mockResolvedValueOnce(addresses);

            const result = await controller.getAddresses(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.OK);
            expect(result.response).toBeDefined();
        });

        it("returns 401 if unauthorized", async () => {
            isAllowed.mockResolvedValueOnce(Response.unauthorized());

            const result = await controller.getAddresses(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(result.response).toBeDefined();
        });
        it("returns 403 if user is not permitted", async () => {
            isAllowed.mockResolvedValueOnce(Response.forbidden);

            const result = await controller.getAddresses(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.FORBIDDEN);
            expect(result.response).toBeDefined();
        });

        it("returns 404 if account not found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.getAddresses as jest.Mock).mockResolvedValueOnce([]);

            const result = await controller.getAddresses(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(result.response).toBeDefined();
        });
    });

    describe("Test getAddress", () => {
        let params = { id: "1", addressId: "1" };
        const address = {
            id: 1,
            address: "123 Main Street",
            city: "New York",
            state: "NY",
            country: "USA",
            zip: "xxxxx"
        }

        it("returns 200 with address data", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.getById as jest.Mock).mockResolvedValueOnce(user);
            (Repository.user.getAddresses as jest.Mock).mockResolvedValueOnce([address]);

            const result = await controller.getAddress(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.OK);
            expect(result.response).toBeDefined();
        });

        it("returns 401 if unauthorized", async () => {
            isAllowed.mockResolvedValueOnce(Response.unauthorized());

            const result = await controller.getAddress(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(result.response).toBeDefined();
        });

        it("returns 403 if user is not permitted", async () => {
            isAllowed.mockResolvedValueOnce(Response.forbidden);

            const result = await controller.getAddress(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.FORBIDDEN);
            expect(result.response).toBeDefined();
        });

        it("returns 404 if account not found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.getAddresses as jest.Mock).mockResolvedValueOnce([]);

            const result = await controller.getAddress(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(result.response).toBeDefined();
        });

        it("returns 404 if address not found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.getById as jest.Mock).mockResolvedValueOnce(user);
            (Repository.user.getAddresses as jest.Mock).mockResolvedValueOnce([]);

            const result = await controller.getAddress(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(result.response).toBeDefined();
        });
    });

    describe("Test getOrders", () => {
        const params = { id: "1" };
        const orders = [{
            id: 1,
            shipping_id: 1,
            address_id: 1,
            order_number: "ORD1",
            status: "PROCESSING",
            total: 59.99,
            payment_id: null
        }];

        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/api/accounts/1/orders");
        });

        it("returns 200 with orders data", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.getById as jest.Mock).mockResolvedValueOnce(user);
            (Repository.user.getOrders as jest.Mock).mockResolvedValueOnce(orders);

            const result = await controller.getOrders(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.OK);
            expect(result.response).toBeDefined();
        });

        it("returns 401 if unauthorized", async () => {
            isAllowed.mockResolvedValueOnce(Response.unauthorized());

            const result = await controller.getOrders(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(result.response).toBeDefined();
        });

        it("returns 403 if user is not permitted", async () => {
            isAllowed.mockResolvedValueOnce(Response.forbidden);

            const result = await controller.getOrders(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.FORBIDDEN);
            expect(result.response).toBeDefined();
        });

        it("returns 404 if account not found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.getById as jest.Mock).mockResolvedValueOnce(null);

            const result = await controller.getOrders(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(result.response).toBeDefined();
        });

        it("returns 404 if orders not found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.getById as jest.Mock).mockResolvedValueOnce(user);
            (Repository.user.getOrders as jest.Mock).mockResolvedValueOnce([]);

            const result = await controller.getOrders(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(result.response).toBeDefined();
        });
    });

    describe("Test getOrder", () => {
        const params = { id: "1", orderId: "1" };
        const order = {
            id: 1,
            shipping_id: 1,
            address_id: 1,
            order_number: "ORD1",
            status: "PROCESSING",
            total: 59.99,
            payment_id: null
        }

        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/api/accounts/1/orders/1");
        });

        it("returns 200 with order data", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.getById as jest.Mock).mockResolvedValueOnce(user);
            (Repository.user.getOrders as jest.Mock).mockResolvedValueOnce([order]);

            const result = await controller.getOrder(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.OK);
            expect(result.response).toBeDefined();
        });

        it("returns 401 if unauthorized", async () => {
            isAllowed.mockResolvedValueOnce(Response.unauthorized());

            const result = await controller.getOrder(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(result.response).toBeDefined();
        });

        it("returns 403 if user is not permitted", async () => {
            isAllowed.mockResolvedValueOnce(Response.forbidden);

            const result = await controller.getOrder(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.FORBIDDEN);
            expect(result.response).toBeDefined();
        });

        it("returns 404 if account not found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.getById as jest.Mock).mockResolvedValueOnce(null);

            const result = await controller.getOrder(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(result.response).toBeDefined();
        });

        it("returns 404 if order not found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.getById as jest.Mock).mockResolvedValueOnce(user);
            (Repository.user.getOrders as jest.Mock).mockResolvedValueOnce([]);

            const result = await controller.getOrder(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(result.response).toBeDefined();
        });
    });

    describe("Test getWishlist", () => {
        const params = { id: "1" };
        const wishlist = [{
            id: 1000,
            product_id: 1000
        }];

        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/api/accounts/1/wishlist");
        });

        it("returns 200 with wishlist data", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.getById as jest.Mock).mockResolvedValueOnce(user);
            (Repository.user.getWishlist as jest.Mock).mockResolvedValueOnce(wishlist);

            const result = await controller.getWishlist(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.OK);
            expect(result.response).toBeDefined();
        });

        it("returns 401 if unauthorized", async () => {
            isAllowed.mockResolvedValueOnce(Response.unauthorized());

            const result = await controller.getWishlist(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(result.response).toBeDefined();
        });

        it("returns 403 if user is not permitted", async () => {
            isAllowed.mockResolvedValueOnce(Response.forbidden);

            const result = await controller.getWishlist(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.FORBIDDEN);
            expect(result.response).toBeDefined();
        });

        it("returns 404 if account not found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.getById as jest.Mock).mockResolvedValueOnce(null);

            const result = await controller.getWishlist(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(result.response).toBeDefined();
        });

        it("returns 404 if no wishlist items found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.getById as jest.Mock).mockResolvedValueOnce(user);
            (Repository.user.getWishlist as jest.Mock).mockResolvedValueOnce([]);

            const result = await controller.getWishlist(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(result.response).toBeDefined();
        });
    });

    describe("Test getWishlistItem", () => {
        const params = { id: "1", wishlistItemId: "1" };
        const wishlistItem = {
            id: 1,
            product_id: 1
        };

        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/api/accounts/1/wishlist/1");
        })

        it("returns 200 with wishlist data", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.getById as jest.Mock).mockResolvedValueOnce(user);
            (Repository.user.getWishlist as jest.Mock).mockResolvedValueOnce([wishlistItem]);

            const result = await controller.getWishlistItem(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.OK);
            expect(result.response).toBeDefined();
        });

        it("returns 401 if unauthorized", async () => {
            isAllowed.mockResolvedValueOnce(Response.unauthorized());
            const result = await controller.getWishlistItem(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(result.response).toBeDefined();
        });

        it("returns 403 if user is not permitted", async () => {
            isAllowed.mockResolvedValueOnce(Response.forbidden);
            const result = await controller.getWishlistItem(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.FORBIDDEN);
            expect(result.response).toBeDefined();
        });

        it("returns 404 if account not found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.getById as jest.Mock).mockResolvedValueOnce(null);
            const result = await controller.getWishlistItem(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(result.response).toBeDefined();
        });

        it("returns 404 if wishlist item not found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.getById as jest.Mock).mockResolvedValueOnce(user);
            (Repository.user.getWishlist as jest.Mock).mockResolvedValueOnce([]);
            const result = await controller.getWishlistItem(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(result.response).toBeDefined();
        });
    });

    describe("Test getCart", () => {
        const params = { id: "1" };
        const cart = [{
            id: 1,
            product_id: 1,
            variant_id: 1,
            total_price: 19.99,
            quantity: 2
        }];

        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/api/accounts/1/cart");
        });

        it("returns 200 with cart data", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.getById as jest.Mock).mockResolvedValueOnce(user);
            (Repository.user.getCart as jest.Mock).mockResolvedValueOnce(cart);

            const result = await controller.getCart(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.OK);
            expect(result.response).toBeDefined();
        });

        it("returns 401 if unauthorized", async () => {
            isAllowed.mockResolvedValueOnce(Response.unauthorized());

            const result = await controller.getCart(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(result.response).toBeDefined();
        });

        it("returns 403 if user is not permitted", async () => {
            isAllowed.mockResolvedValueOnce(Response.forbidden);

            const result = await controller.getCart(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.FORBIDDEN);
            expect(result.response).toBeDefined();
        });

        it("returns 404 if account not found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.getById as jest.Mock).mockResolvedValueOnce(null);

            const result = await controller.getCart(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(result.response).toBeDefined();
        });

        it("returns 404 if orders not found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.getById as jest.Mock).mockResolvedValueOnce(user);
            (Repository.user.getCart as jest.Mock).mockResolvedValueOnce([]);

            const result = await controller.getCart(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(result.response).toBeDefined();
        });
    });

    describe("Test getCartItem", () => {
        const params = { id: "1", cartItemId: "1" };
        const cartItem = {
            id: 1,
            product_id: 1,
            variant_id: 1,
            total_price: 19.99,
            quantity: 2
        }

        it("returns 200 with cart item data", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.getById as jest.Mock).mockResolvedValueOnce(user);
            (Repository.user.getCart as jest.Mock).mockResolvedValueOnce([cartItem]);

            const result = await controller.getCartItem(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.OK);
            expect(result.response).toBeDefined();
        });

        it("returns 401 if unauthorized", async () => {
            isAllowed.mockResolvedValueOnce(Response.unauthorized());
            const result = await controller.getCartItem(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(result.response).toBeDefined();
        });

        it("returns 403 if user is not permitted", async () => {
            isAllowed.mockResolvedValueOnce(Response.forbidden);
            const result = await controller.getCartItem(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.FORBIDDEN);
            expect(result.response).toBeDefined();
        });

        it("returns 404 if account not found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.getById as jest.Mock).mockResolvedValueOnce(null);
            const result = await controller.getCartItem(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(result.response).toBeDefined();
        });

        it("returns 404 if cart item not found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.getById as jest.Mock).mockResolvedValueOnce(user);
            (Repository.user.getCart as jest.Mock).mockResolvedValueOnce([]);
            const result = await controller.getCartItem(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(result.response).toBeDefined();
        });
    });

    describe("Test getReviews", () => {
        const params = { id: "1" };
        const reviews = [{
            id: 1,
            product_id: 1,
            variant_id: 1,
            rating: 4,
            comment: "Comment"
        }];

        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/api/accounts/1/reviews");
        })

        it("returns 200 with reviews data", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.getById as jest.Mock).mockResolvedValueOnce(user);
            (Repository.user.getReviews as jest.Mock).mockResolvedValueOnce(reviews);

            const result = await controller.getReviews(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.OK);
            expect(result.response).toBeDefined();
        });

        it("returns 401 if unauthorized", async () => {
            isAllowed.mockResolvedValueOnce(Response.unauthorized());
            const result = await controller.getReviews(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(result.response).toBeDefined();
        });

        it("returns 403 if user is not permitted", async () => {
            isAllowed.mockResolvedValueOnce(Response.forbidden);
            const result = await controller.getReviews(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.FORBIDDEN);
            expect(result.response).toBeDefined();
        });

        it("returns 404 if account not found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.getReviews as jest.Mock).mockResolvedValueOnce([]);
            const result = await controller.getReviews(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(result.response).toBeDefined();
        });

        it("returns 404 if reviews not found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.getById as jest.Mock).mockResolvedValueOnce(user);
            (Repository.user.getReviews as jest.Mock).mockResolvedValueOnce([]);
            const result = await controller.getReviews(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(result.response).toBeDefined();
        });
    });

    describe("Test getReview", () => {
        const params = { id: "1", reviewId: "1" };
        const review = {
            id: 1,
            product_id: 1,
            variant_id: 1,
            rating: 4,
            comment: "Comment"
        }

        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/api/accounts/1/reviews/1");
        });

        it("returns 200 with review data", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.getById as jest.Mock).mockResolvedValueOnce(user);
            (Repository.user.getReviews as jest.Mock).mockResolvedValueOnce([review]);

            const result = await controller.getReview(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.OK);
            expect(result.response).toBeDefined();
        });

        it("returns 401 if unauthorized", async () => {
            isAllowed.mockResolvedValueOnce(Response.unauthorized());
            const result = await controller.getReview(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(result.response).toBeDefined();
        });

        it("returns 403 if user is not permitted", async () => {
            isAllowed.mockResolvedValueOnce(Response.forbidden);
            const result = await controller.getReview(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.FORBIDDEN);
            expect(result.response).toBeDefined();
        });

        it("returns 404 if account not found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.getById as jest.Mock).mockResolvedValueOnce(null);
            const result = await controller.getReview(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(result.response).toBeDefined();
        });

        it("returns 404 if review not found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.getById as jest.Mock).mockResolvedValueOnce(user);
            (Repository.user.getReviews as jest.Mock).mockResolvedValueOnce([]);
            const result = await controller.getReview(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(result.response).toBeDefined();
        });
    });

    describe("Test getPayments", () => {
        const params = { id: "1" };
        const payments = [{
            id: 1,
            order_id: 1,
            method_id: 1,
            amount: 19.99,
            status: "success"
        }];

        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/api/accounts/1/payments");
        });

        it("returns 200 with payments data", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.getById as jest.Mock).mockResolvedValueOnce(user);
            (Repository.user.getPayments as jest.Mock).mockResolvedValueOnce(payments);

            const result = await controller.getPayments(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.OK);
            expect(result.response).toBeDefined();
        });

        it("returns 401 if unauthorized", async () => {
            isAllowed.mockResolvedValueOnce(Response.unauthorized());
            const result = await controller.getPayments(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(result.response).toBeDefined();
        });

        it("returns 403 if user is not permitted", async () => {
            isAllowed.mockResolvedValueOnce(Response.forbidden);
            const result = await controller.getPayments(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.FORBIDDEN);
            expect(result.response).toBeDefined();
        });

        it("returns 404 if account not found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.getPayments as jest.Mock).mockResolvedValueOnce([]);
            const result = await controller.getPayments(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(result.response).toBeDefined();
        });

        it("returns 404 if payments not found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.getById as jest.Mock).mockResolvedValueOnce(user);
            (Repository.user.getPayments as jest.Mock).mockResolvedValueOnce([]);
            const result = await controller.getPayments(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(result.response).toBeDefined();
        });
    });

    describe("Test getPayment", () => {
        const params = { id: "1", paymentId: "1" };
        const payment = {
            id: 1,
            order_id: 1,
            method_id: 1,
            amount: 19.99,
            status: "success"
        }

        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/api/accounts/1/payments/1");
        });

        it("returns 200 with payment data", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.getById as jest.Mock).mockResolvedValueOnce(user);
            (Repository.user.getPayments as jest.Mock).mockResolvedValueOnce([payment]);

            const result = await controller.getPayment(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.OK);
            expect(result.response).toBeDefined();
        });

        it("returns 401 if unauthorized", async () => {
            isAllowed.mockResolvedValueOnce(Response.unauthorized());
            const result = await controller.getPayment(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(result.response).toBeDefined();
        });

        it("returns 403 if user is not permitted", async () => {
            isAllowed.mockResolvedValueOnce(Response.forbidden);
            const result = await controller.getPayment(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.FORBIDDEN);
            expect(result.response).toBeDefined();
        });

        it("returns 404 if account not found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.getById as jest.Mock).mockResolvedValueOnce(null);
            const result = await controller.getPayment(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(result.response).toBeDefined();
        });

        it("returns 404 if payment not found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.user.getById as jest.Mock).mockResolvedValueOnce(user);
            (Repository.user.getPayments as jest.Mock).mockResolvedValueOnce([]);
            const result = await controller.getPayment(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(result.response).toBeDefined();
        });
    });
});

