import { NextRequest } from "next/server";
import CouponsController from "@controller/coupons.controller";


describe("CouponsController", () => {
    let controller: CouponsController;
    let req: NextRequest;

    beforeEach(() => {
        controller = new CouponsController();
    });

    describe("Test getCoupons", () => {
        it.todo("returns 200 with coupon data");
        it.todo("returns 401 if unauthorized");
        it.todo("returns 403 if forbidden");
        it.todo("returns 404 if no coupons found");
    });

    describe("Test getCoupon", () => {
        it.todo("returns 200 with coupon data");
        it.todo("returns 404 if no coupon found");
    });

    describe("Test createCoupon", () => {
        it.todo("returns 201 with coupon data");
        it.todo("returns 400 if invalid body");
        it.todo("returns 400 if coupon code already exists");
        it.todo("returns 401 if unauthorized");
        it.todo("returns 403 if forbidden");
        it.todo("returns 422 if wrong body");
    });

    describe("Test updateCoupon", () => {
        it.todo("returns 200 with coupon data");
        it.todo("returns 400 if invalid body");
        it.todo("returns 401 if unauthorized");
        it.todo("returns 403 if forbidden");
        it.todo("returns 404 if coupon not found");
    });

    describe("Test deleteCoupon", () => {
        it.todo("returns 204");
        it.todo("returns 401 if unauthorized");
        it.todo("returns 403 if forbidden");
        it.todo("returns 404 if coupon not found");
    });
});

