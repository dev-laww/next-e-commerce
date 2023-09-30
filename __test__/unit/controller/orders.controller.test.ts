import { NextRequest } from "next/server";
import OrdersController from "@controller/orders.controller";
import { Order } from "@prisma/client";
import { generateAccessToken } from "@utils/token";
import { UserSession } from "@lib/types";
import PermissionController from "@controller/permission.controller";
import Response from "@lib/http";
import Repository from "@src/repository";
import { STATUS_CODE } from "@lib/constants";

const isAllowed = jest.spyOn(PermissionController, "isAllowed");

describe("OrdersController", () => {
    let controller: OrdersController;
    let req: NextRequest;
    const token = generateAccessToken({ id: 1, username: "test" } as UserSession);
    const order = {
        id: 1,
        user_id: 1,
        address_id: 1,
        shipping_id: 1,
        status: "processing",
        payment_id: 1,
    } as Order;

    beforeEach(() => {
        controller = new OrdersController();
    });

    describe("Test getOrders", () => {
        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/api/orders", {
                headers: { Authorization: `Bearer ${token}` }
            })
        });

        it("returns 200 with data", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.order.getAll as jest.Mock).mockImplementation(() => Promise.resolve([order]))

            const res = await controller.getOrders(req);

            expect(res.statusCode).toBe(STATUS_CODE.OK);
            expect(res.response).toBeDefined();
        });

        it("returns 401 if unauthorized", async () => {
            isAllowed.mockResolvedValueOnce(Response.unauthorized());

            const res = await controller.getOrders(req);

            expect(res.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(res.response).toBeDefined();
        });

        it("returns 403 if forbidden", async () => {
            isAllowed.mockResolvedValueOnce(Response.forbidden);

            const res = await controller.getOrders(req);

            expect(res.statusCode).toBe(STATUS_CODE.FORBIDDEN);
            expect(res.response).toBeDefined();
        });

        it("returns 404 if no orders found", async () => {
            isAllowed.mockResolvedValueOnce(Response.notFound());
            (Repository.order.getAll as jest.Mock).mockResolvedValueOnce([]);

            const res = await controller.getOrders(req);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        });
    });

    describe("Test getOrder", () => {
        const params = { id: "1" };

        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/api/orders/1", {
                headers: { Authorization: `Bearer ${token}` }
            })
        })

        it("returns 200 with data", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.order.getById as jest.Mock).mockResolvedValueOnce(order);

            const res = await controller.getOrder(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.OK);
            expect(res.response).toBeDefined();
        });

        it("returns 401 if unauthorized", async () => {
            isAllowed.mockResolvedValueOnce(Response.unauthorized());

            const res = await controller.getOrder(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(res.response).toBeDefined();
        });

        it("returns 403 if forbidden", async () => {
            isAllowed.mockResolvedValueOnce(Response.forbidden);

            const res = await controller.getOrder(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.FORBIDDEN);
            expect(res.response).toBeDefined();
        });

        it("returns 404 if order not found", async () => {
            isAllowed.mockResolvedValueOnce(Response.notFound());
            (Repository.order.getById as jest.Mock).mockResolvedValueOnce(null);

            const res = await controller.getOrder(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        });
    });

    describe("Test cancelOrder", () => {
        const params = { id: "1" };

        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/api/orders/1/cancel", {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` }
            });
        });

        it("returns 200 if order cancelled", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.order.getById as jest.Mock).mockResolvedValueOnce(order);
            (Repository.order.cancel as jest.Mock).mockResolvedValueOnce(order);

            const res = await controller.cancelOrder(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.OK);
            expect(res.response).toBeDefined();
        });

        it("returns 400 if order cannot be cancelled", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.order.getById as jest.Mock).mockResolvedValueOnce({
                ...order,
                status: "completed",
            });

            const res = await controller.cancelOrder(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.BAD_REQUEST);
            expect(res.response).toBeDefined();
        });

        it("returns 401 if unauthorized", async () => {
            isAllowed.mockResolvedValueOnce(Response.unauthorized());

            const res = await controller.cancelOrder(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(res.response).toBeDefined();
        });

        it("returns 403 if forbidden", async () => {
            isAllowed.mockResolvedValueOnce(Response.forbidden);

            const res = await controller.cancelOrder(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.FORBIDDEN);
            expect(res.response).toBeDefined();
        });

        it("returns 404 if order not found", async () => {
            isAllowed.mockResolvedValueOnce(Response.notFound());
            (Repository.order.getById as jest.Mock).mockResolvedValueOnce(null);

            const res = await controller.cancelOrder(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        });
    });
});

