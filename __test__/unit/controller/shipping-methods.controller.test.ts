import { NextRequest } from "next/server";
import ShippingMethodsController from "@controller/shipping-methods.controller";
import { generateAccessToken } from "@utils/token";
import { UserSession } from "@lib/types";
import { Order, ShippingMethod } from "@prisma/client";
import PermissionController from "@controller/permission.controller";
import Response from "@lib/http";
import Repository from "@src/repository";
import { STATUS_CODE } from "@lib/constants";

const isAllowed = jest.spyOn(PermissionController, "isAllowed");

describe("ShippingMethodsController", () => {
    let controller: ShippingMethodsController;
    let req: NextRequest;
    const token = generateAccessToken({ id: 1, username: "test" } as UserSession);

    beforeEach(() => {
        controller = new ShippingMethodsController();
    });

    describe("Test getShippingMethods", () => {
        const shippingMethod = {
            id: 1,
            name: "test",
            price: 9.99
        } as ShippingMethod;

        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/api/shipping-methods");
        });

        it("returns 200 with shipping methods", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.shipping.getAll as jest.Mock).mockImplementation(() => Promise.resolve([shippingMethod]));

            const res = await controller.getShippingMethods(req);

            expect(res.statusCode).toBe(STATUS_CODE.OK);
            expect(res.response).toBeDefined();
        });

        it("returns 404 if no shipping methods found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.shipping.getAll as jest.Mock).mockImplementationOnce(() => Promise.resolve([]));

            const res = await controller.getShippingMethods(req);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        });
    });

    describe("Test getShippingMethod", () => {
        const shippingMethod = {
            id: 1,
            name: "test",
            price: 9.99
        } as ShippingMethod;
        const params = { id: "1" };

        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/api/shipping-methods/1");
        });

        it("returns 200 with shipping method", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.shipping.getById as jest.Mock).mockResolvedValueOnce(shippingMethod);

            const res = await controller.getShippingMethod(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.OK);
            expect(res.response).toBeDefined();
        });

        it("returns 404 if no shipping method found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.shipping.getById as jest.Mock).mockResolvedValueOnce(null);

            const res = await controller.getShippingMethod(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        });
    });

    describe("Test createShippingMethod", () => {
        const shippingMethod = {
            id: 1,
            name: "test",
            price: 9.99
        } as ShippingMethod;

        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/api/shipping-methods", {
                method: "POST",
                headers: { Authorization: `Bearer ${ token }` },
                body: JSON.stringify({
                    name: "test",
                    price: 9.99
                })
            });
        });

        it("returns 201 with shipping method", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.shipping.create as jest.Mock).mockResolvedValueOnce(shippingMethod);

            const res = await controller.createShippingMethod(req);

            expect(res.statusCode).toBe(STATUS_CODE.CREATED);
            expect(res.response).toBeDefined();
        });

        it("returns 400 if invalid data", async () => {
            req = new NextRequest("http://localhost:3000/api/shipping-methods", { method: "POST", });
            isAllowed.mockResolvedValueOnce(Response.ok());

            const res = await controller.createShippingMethod(req);

            expect(res.statusCode).toBe(STATUS_CODE.BAD_REQUEST);
            expect(res.response).toBeDefined();
        });

        it("returns 401 if unauthorized", async () => {
            isAllowed.mockResolvedValueOnce(Response.unauthorized());

            const res = await controller.createShippingMethod(req);

            expect(res.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(res.response).toBeDefined();
        });

        it("returns 403 if forbidden", async () => {
            isAllowed.mockResolvedValueOnce(Response.forbidden);

            const res = await controller.createShippingMethod(req);

            expect(res.statusCode).toBe(STATUS_CODE.FORBIDDEN);
            expect(res.response).toBeDefined();
        });

        it("returns 422 if wrong body", async () => {
            req = new NextRequest("http://localhost:3000/api/shipping-methods", {
                method: "POST",
                headers: { Authorization: `Bearer ${ token }` },
                body: "{}"
            });
            isAllowed.mockResolvedValueOnce(Response.ok());

            const res = await controller.createShippingMethod(req);

            expect(res.statusCode).toBe(STATUS_CODE.UNPROCESSABLE_ENTITY);
            expect(res.response).toBeDefined();
        });
    });

    describe("Test updateShippingMethod", () => {
        const shippingMethod = {
            id: 1,
            name: "test",
            price: 9.99
        } as ShippingMethod;
        const params = { id: "1" };

        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/api/shipping-methods", {
                method: "PUT",
                headers: { Authorization: `Bearer ${ token }` },
                body: JSON.stringify({
                    name: "test",
                    price: 9.99
                })
            });
        });

        it("returns 200 with shipping method", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.shipping.getById as jest.Mock).mockResolvedValueOnce(shippingMethod);
            (Repository.shipping.update as jest.Mock).mockResolvedValueOnce(shippingMethod);

            const res = await controller.updateShippingMethod(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.OK);
            expect(res.response).toBeDefined();
        });

        it("returns 400 if invalid data", async () => {
            req = new NextRequest("http://localhost:3000/api/shipping-methods", { method: "PUT", });
            isAllowed.mockResolvedValueOnce(Response.ok());

            const res = await controller.updateShippingMethod(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.BAD_REQUEST);
            expect(res.response).toBeDefined();
        });

        it("returns 401 if unauthorized", async () => {
            isAllowed.mockResolvedValueOnce(Response.unauthorized());

            const res = await controller.updateShippingMethod(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(res.response).toBeDefined();
        });

        it("returns 403 if forbidden", async () => {
            isAllowed.mockResolvedValueOnce(Response.forbidden);

            const res = await controller.updateShippingMethod(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.FORBIDDEN);
            expect(res.response).toBeDefined();
        });

        it("returns 404 if no shipping method found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.shipping.getById as jest.Mock).mockResolvedValueOnce(null);

            const res = await controller.updateShippingMethod(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        });
    });

    describe("Test deleteShippingMethod", () => {
        const shippingMethod = {
            id: 1,
            name: "test",
            price: 9.99
        } as ShippingMethod;
        const params = { id: "1" };

        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/api/shipping-methods", {
                method: "DELETE",
                headers: { Authorization: `Bearer ${ token }` }
            });
        });

        it("returns 204 with data", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.shipping.getById as jest.Mock).mockResolvedValueOnce(shippingMethod);
            (Repository.shipping.delete as jest.Mock).mockResolvedValueOnce(shippingMethod);

            const res = await controller.deleteShippingMethod(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.OK);
            expect(res.response).toBeDefined();
        });

        it("returns 401 if unauthorized", async () => {
            isAllowed.mockResolvedValueOnce(Response.unauthorized());

            const res = await controller.deleteShippingMethod(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(res.response).toBeDefined();
        });

        it("returns 403 if forbidden", async () => {
            isAllowed.mockResolvedValueOnce(Response.forbidden);

            const res = await controller.deleteShippingMethod(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.FORBIDDEN);
            expect(res.response).toBeDefined();
        });

        it("returns 404 if no shipping method found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.shipping.getById as jest.Mock).mockResolvedValueOnce(null);

            const res = await controller.deleteShippingMethod(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        });
    });

    describe("Test getShippingMethodOrders", () => {
        const shippingMethod = {
            id: 1,
            name: "test",
            price: 9.99
        } as ShippingMethod;
        const order = {
            id: 1,
            status: "pending",
            total: 9.99,
        } as Order;
        const params = { id: "1" };

        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/api/shipping-methods/1/orders", {
                headers: { Authorization: `Bearer ${ token }` }
            });
        });

        it("returns 200 with shipping method orders", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.shipping.getById as jest.Mock).mockResolvedValueOnce(shippingMethod);
            (Repository.shipping.getShippingOrders as jest.Mock).mockResolvedValueOnce([order]);

            const res = await controller.getShippingMethodOrders(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.OK);
            expect(res.response).toBeDefined();
        });

        it("returns 401 if unauthorized", async () => {
            isAllowed.mockResolvedValueOnce(Response.unauthorized());

            const res = await controller.getShippingMethodOrders(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(res.response).toBeDefined();
        });

        it("returns 403 if forbidden", async () => {
            isAllowed.mockResolvedValueOnce(Response.forbidden);

            const res = await controller.getShippingMethodOrders(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.FORBIDDEN);
            expect(res.response).toBeDefined();
        });

        it("returns 404 if no shipping method found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.shipping.getById as jest.Mock).mockResolvedValueOnce(null);

            const res = await controller.getShippingMethodOrders(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        });
    });
});

