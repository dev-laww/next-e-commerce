import { NextRequest } from "next/server";
import OrdersController from "@controller/orders.controller";


describe("OrdersController", () => {
    let controller: OrdersController;
    let req: NextRequest;

    beforeEach(() => {
        controller = new OrdersController();
    });

    describe("Test getOrders", () => {
        it.todo("returns 200 with data");
        it.todo("returns 401 if unauthorized");
        it.todo("returns 403 if forbidden");
        it.todo("returns 404 if no orders found");
    });

    describe("Test getOrder", () => {
        it.todo("returns 200 with data");
        it.todo("returns 401 if unauthorized");
        it.todo("returns 403 if forbidden");
        it.todo("returns 404 if order not found");
    });

    describe("Test cancelOrder", () => {
        it.todo("returns 200 with data");
        it.todo("returns 401 if unauthorized");
        it.todo("returns 403 if forbidden");
        it.todo("returns 404 if order not found");
    });
});

