import { NextRequest } from "next/server";
import CouponsController from "@controller/coupons.controller";
import { Coupon } from "@prisma/client";
import PermissionController from "@controller/permission.controller";
import Response from "@lib/http";
import Repository from "@src/repository";
import { STATUS_CODE } from "@lib/constants";
import { generateAccessToken } from "@utils/token";
import { UserSession } from "@lib/types";

const isAllowed = jest.spyOn(PermissionController, "isAllowed");

describe("CouponsController", () => {
    let controller: CouponsController;
    let req: NextRequest;
    const token = generateAccessToken({ id: 1, username: "test" } as UserSession);

    beforeEach(() => {
        controller = new CouponsController();
    });

    describe("Test getCoupons", () => {
        const coupon = {
            id: 1,
            code: "TEST",
            type: "fixed",
            discount: 10
        } as Coupon;

        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/api/coupons", {
                headers: { Authorization: `Bearer ${ token }` }
            })
        })

        it("returns 200 with coupon data", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.coupon.getAll as jest.Mock).mockImplementation(() => Promise.resolve([coupon]));

            const result = await controller.getCoupons(req);

            expect(result.statusCode).toBe(STATUS_CODE.OK);
            expect(result.response).toBeDefined();
        });

        it("returns 401 if unauthorized", async () => {
            isAllowed.mockResolvedValueOnce(Response.unauthorized());

            const result = await controller.getCoupons(req);

            expect(result.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(result.response).toBeDefined();
        });

        it("returns 403 if forbidden", async () => {
            isAllowed.mockResolvedValueOnce(Response.forbidden);

            const result = await controller.getCoupons(req);

            expect(result.statusCode).toBe(STATUS_CODE.FORBIDDEN);
            expect(result.response).toBeDefined();
        });

        it("returns 404 if no coupons found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.coupon.getAll as jest.Mock).mockImplementationOnce(() => Promise.resolve([]));

            const result = await controller.getCoupons(req);

            expect(result.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(result.response).toBeDefined();
        });
    });

    describe("Test getCoupon", () => {
        const coupon = {
            id: 1,
            code: "TEST",
            type: "fixed",
            discount: 10
        } as Coupon;
        const params = { code: "TEST" };

        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/api/coupons/TEST")
        });

        it("returns 200 with coupon data", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.coupon.getByCode as jest.Mock).mockResolvedValueOnce(coupon);

            const result = await controller.getCoupon(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.OK);
            expect(result.response).toBeDefined();
        });

        it("returns 404 if no coupon found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.coupon.getByCode as jest.Mock).mockResolvedValueOnce(null);

            const result = await controller.getCoupon(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(result.response).toBeDefined();
        });
    });

    describe("Test createCoupon", () => {
        const coupon = {
            id: 1,
            code: "TEST",
            type: "fixed",
            discount: 10
        } as Coupon;

        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/api/coupons", {
                method: "POST",
                headers: { Authorization: `Bearer ${ token }` },
                body: JSON.stringify({
                    code: "TEST",
                    type: "fixed",
                    discount: 10
                })
            })
        });

        it("returns 201 with coupon data", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.coupon.getByCode as jest.Mock).mockResolvedValueOnce(null);
            (Repository.coupon.create as jest.Mock).mockResolvedValueOnce(coupon);

            const result = await controller.createCoupon(req);

            expect(result.statusCode).toBe(STATUS_CODE.CREATED);
            expect(result.response).toBeDefined();
        });

        it("returns 400 if invalid body", async () => {
            req = new NextRequest("http://localhost:3000/api/coupons", {
                method: "POST",
                headers: { Authorization: `Bearer ${ token }` },
            });
            isAllowed.mockResolvedValueOnce(Response.ok());

            const result = await controller.createCoupon(req);

            expect(result.statusCode).toBe(STATUS_CODE.BAD_REQUEST);
            expect(result.response).toBeDefined();
        });

        it("returns 400 if coupon code already exists", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.coupon.getByCode as jest.Mock).mockResolvedValueOnce(coupon);

            const result = await controller.createCoupon(req);

            expect(result.statusCode).toBe(STATUS_CODE.BAD_REQUEST);
            expect(result.response).toBeDefined();
        });

        it("returns 401 if unauthorized", async () => {
            isAllowed.mockResolvedValueOnce(Response.unauthorized());

            const result = await controller.createCoupon(req);

            expect(result.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(result.response).toBeDefined();
        });

        it("returns 403 if forbidden", async () => {
            isAllowed.mockResolvedValueOnce(Response.forbidden);

            const result = await controller.createCoupon(req);

            expect(result.statusCode).toBe(STATUS_CODE.FORBIDDEN);
            expect(result.response).toBeDefined();
        });

        it("returns 422 if wrong body", async () => {
            req = new NextRequest("http://localhost:3000/api/coupons", {
                method: "POST",
                headers: { Authorization: `Bearer ${ token }` },
                body: "{}"
            });
            isAllowed.mockResolvedValueOnce(Response.ok());

            const result = await controller.createCoupon(req);

            expect(result.statusCode).toBe(STATUS_CODE.UNPROCESSABLE_ENTITY);
            expect(result.response).toBeDefined();
        });
    });

    describe("Test updateCoupon", () => {
        const coupon = {
            id: 1,
            code: "TEST",
            type: "fixed",
            discount: 10
        } as Coupon;
        const params = { code: "TEST" };

        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/api/coupons/TEST", {
                method: "PUT",
                headers: { Authorization: `Bearer ${ token }` },
                body: JSON.stringify({
                    type: "percent",
                    discount: 20
                })
            });
        });

        it("returns 200 with coupon data", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.coupon.getByCode as jest.Mock).mockResolvedValueOnce(coupon);
            (Repository.coupon.update as jest.Mock).mockResolvedValueOnce(coupon);

            const result = await controller.updateCoupon(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.OK);
            expect(result.response).toBeDefined();
        });

        it("returns 400 if invalid body", async () => {
            req = new NextRequest("http://localhost:3000/api/coupons/TEST", {
                method: "PUT",
                headers: { Authorization: `Bearer ${ token }` },
            });
            isAllowed.mockResolvedValueOnce(Response.ok());

            const result = await controller.updateCoupon(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.BAD_REQUEST);
            expect(result.response).toBeDefined();
        });

        it("returns 401 if unauthorized", async () => {
            isAllowed.mockResolvedValueOnce(Response.unauthorized());

            const result = await controller.updateCoupon(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(result.response).toBeDefined();
        });

        it("returns 403 if forbidden", async () => {
            isAllowed.mockResolvedValueOnce(Response.forbidden);

            const result = await controller.updateCoupon(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.FORBIDDEN);
            expect(result.response).toBeDefined();
        });

        it("returns 404 if coupon not found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.coupon.getByCode as jest.Mock).mockResolvedValueOnce(null);

            const result = await controller.updateCoupon(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(result.response).toBeDefined();
        });
    });

    describe("Test deleteCoupon", () => {
        const coupon = {
            id: 1,
            code: "TEST",
            type: "fixed",
            discount: 10
        } as Coupon;
        const params = { code: "TEST" };

        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/api/coupons/TEST", {
                method: "DELETE",
                headers: { Authorization: `Bearer ${ token }` }
            });
        });

        it("returns 204", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.coupon.getByCode as jest.Mock).mockResolvedValueOnce(coupon);
            (Repository.coupon.delete as jest.Mock).mockResolvedValueOnce(coupon);

            const result = await controller.deleteCoupon(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.OK);
            expect(result.response).toBeDefined();
        });

        it("returns 401 if unauthorized", async () => {
            isAllowed.mockResolvedValueOnce(Response.unauthorized());

            const result = await controller.deleteCoupon(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(result.response).toBeDefined();
        });

        it("returns 403 if forbidden", async () => {
            isAllowed.mockResolvedValueOnce(Response.forbidden);

            const result = await controller.deleteCoupon(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.FORBIDDEN);
            expect(result.response).toBeDefined();
        });

        it("returns 404 if coupon not found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.coupon.getByCode as jest.Mock).mockResolvedValueOnce(null);

            const result = await controller.deleteCoupon(req, params);

            expect(result.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(result.response).toBeDefined();
        });
    });
});

