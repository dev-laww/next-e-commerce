import { NextRequest } from "next/server";
import ShippingMethodsController from "@controller/shipping-methods.controller";


describe("ShippingMethodsController", () => {
    let controller: ShippingMethodsController;
    let req: NextRequest;

    beforeEach(() => {
        controller = new ShippingMethodsController();
    });

    describe("Test getShippingMethods", () => {
        it.todo("returns 200 with shipping methods");
        it.todo("returns 401 if unauthorized");
        it.todo("returns 403 if forbidden");
        it.todo("returns 404 if no shipping methods found");
    });

    describe("Test getShippingMethod", () => {
        it.todo("returns 200 with shipping method");
        it.todo("returns 401 if unauthorized");
        it.todo("returns 403 if forbidden");
        it.todo("returns 404 if no shipping method found");
    });

    describe("Test createShippingMethod", () => {
        it.todo("returns 201 with shipping method");
        it.todo("returns 400 if invalid data");
        it.todo("returns 401 if unauthorized");
        it.todo("returns 403 if forbidden");
        it.todo("returns 422 if wrong body");
    });

    describe("Test updateShippingMethod", () => {
        it.todo("returns 200 with shipping method");
        it.todo("returns 400 if invalid data");
        it.todo("returns 401 if unauthorized");
        it.todo("returns 403 if forbidden");
        it.todo("returns 404 if no shipping method found");
    });

    describe("Test deleteShippingMethod", () => {
        it.todo("returns 204 with no content");
        it.todo("returns 401 if unauthorized");
        it.todo("returns 403 if forbidden");
        it.todo("returns 404 if no shipping method found");
    });

    describe("Test getShippingMethodOrders", () => {
        it.todo("returns 200 with shipping method orders");
        it.todo("returns 401 if unauthorized");
        it.todo("returns 403 if forbidden");
        it.todo("returns 404 if no shipping method found");
    });
});

