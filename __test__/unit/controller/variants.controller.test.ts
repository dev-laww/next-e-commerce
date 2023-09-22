import { NextRequest } from "next/server";

import VariantsController from "@controller/variants.controller";
import PermissionController from "@controller/permission.controller";
import Response from "@lib/http";
import { ProductVariant, Review } from "@prisma/client";
import Repository from "@src/repository";
import { STATUS_CODE } from "@lib/constants";
import { generateAccessToken } from "@utils/token";
import { UserSession } from "@lib/types";

const isAllowed = jest.spyOn(PermissionController, "isAllowed");

describe("VariantsController", () => {
    let controller: VariantsController;
    let req: NextRequest;
    const token = generateAccessToken({ id: 1, username: "test" } as UserSession);

    beforeEach(() => {
        controller = new VariantsController();
    });

    describe("Test getVariants", () => {
        const variant = {
            id: 1,
            name: "test",
            product_id: 1,
            price: 100,
            stock: 10,
        } as ProductVariant;

        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/api/variants", {
                headers: { Authorization: `Bearer ${token}` }
            });
        });

        it("returns 200 with data", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.productVariant.getAll as jest.Mock).mockImplementation(() => Promise.resolve([{ id: 1 }]));

            const res = await controller.getVariants(req);

            expect(res.statusCode).toBe(STATUS_CODE.OK);
            expect(res.response).toBeDefined();
        });

        it("returns 404 if no variants found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.productVariant.getAll as jest.Mock).mockResolvedValueOnce([]);

            const res = await controller.getVariants(req);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        });
    })

    describe("Test getVariant", () => {
        const variant = {
            id: 1,
            name: "test",
            product_id: 1,
            price: 100,
            stock: 10,
        } as ProductVariant;
        const params = { id: "1" };

        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/api/variants/1", {
                headers: { Authorization: `Bearer ${token}` }
            });
        });

        it("returns 200 with data", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.productVariant.getById as jest.Mock).mockResolvedValueOnce(variant);

            const res = await controller.getVariant(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.OK);
            expect(res.response).toBeDefined();
        });

        it("returns 404 if variant not found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.productVariant.getById as jest.Mock).mockResolvedValueOnce(null);

            const res = await controller.getVariant(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        });
    });

    describe("Test createVariant", () => {
        const variant = {
            id: 1,
            name: "test",
            product_id: 1,
            raw_price: 80,
            price: 100,
            stock: 10,
        } as ProductVariant;

        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/api/variants", {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
                body: JSON.stringify({
                    id: 1,
                    name: "test",
                    productId: 1,
                    rawPrice: 80,
                    imageUrl: "https://via.placeholder.com/150",
                    price: 100,
                    stock: 10,
                })
            });
        });

        it("returns 200 with data", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.productVariant.create as jest.Mock).mockResolvedValueOnce(variant);

            const res = await controller.createVariant(req);

            expect(res.statusCode).toBe(STATUS_CODE.CREATED);
            expect(res.response).toBeDefined();
        });

        it("returns 400 if invalid body", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            req = new NextRequest("http://localhost:3000/api/variants", { method: "POST" });

            const res = await controller.createVariant(req);

            expect(res.statusCode).toBe(STATUS_CODE.BAD_REQUEST);
            expect(res.response).toBeDefined();
        });

        it("returns 401 if unauthorized", async () => {
            isAllowed.mockResolvedValueOnce(Response.unauthorized());

            const res = await controller.createVariant(req);

            expect(res.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(res.response).toBeDefined();
        });

        it("returns 403 if forbidden", async () => {
            isAllowed.mockResolvedValueOnce(Response.forbidden);

            const res = await controller.createVariant(req);

            expect(res.statusCode).toBe(STATUS_CODE.FORBIDDEN);
            expect(res.response).toBeDefined();
        });

        it("returns 422 if wrong body", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            req = new NextRequest("http://localhost:3000/api/variants", {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
                body: "{}"
            });

            const res = await controller.createVariant(req);

            expect(res.statusCode).toBe(STATUS_CODE.UNPROCESSABLE_ENTITY);
            expect(res.response).toBeDefined();
        });
    });

    describe("Test updateVariant", () => {
        const variant = {
            id: 1,
            name: "test",
            product_id: 1,
            price: 100,
            stock: 10,
        } as ProductVariant;
        const params = { id: "1" };

        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/api/variants/1", {
                method: "PUT",
                headers: { Authorization: `Bearer ${token}` },
                body: JSON.stringify({
                    name: "test",
                    price: 100,
                    stock: 10,
                })
            });
        });

        it("returns 200 with data", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.productVariant.getById as jest.Mock).mockResolvedValueOnce(variant);
            (Repository.productVariant.update as jest.Mock).mockResolvedValueOnce(variant);

            const res = await controller.updateVariant(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.OK);
            expect(res.response).toBeDefined();
        });

        it("returns 400 if invalid body", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            req = new NextRequest("http://localhost:3000/api/variants/1", { method: "PUT" });

            const res = await controller.updateVariant(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.BAD_REQUEST);
            expect(res.response).toBeDefined();
        });

        it("returns 401 if unauthorized", async () => {
            isAllowed.mockResolvedValueOnce(Response.unauthorized());

            const res = await controller.updateVariant(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(res.response).toBeDefined();
        });

        it("returns 403 if forbidden", async () => {
            isAllowed.mockResolvedValueOnce(Response.forbidden);

            const res = await controller.updateVariant(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.FORBIDDEN);
            expect(res.response).toBeDefined();
        });

        it("returns 404 if variant not found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.productVariant.getById as jest.Mock).mockResolvedValueOnce(null);

            const res = await controller.updateVariant(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        });
    });

    describe("Test deleteVariant", () => {
        const variant = {
            id: 1,
            name: "test",
            product_id: 1,
            price: 100,
            stock: 10,
        } as ProductVariant;
        const params = { id: "1" };

        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/api/variants/1", {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
        });

        it("returns 200 with data", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.productVariant.getById as jest.Mock).mockResolvedValueOnce(variant);
            (Repository.productVariant.delete as jest.Mock).mockResolvedValueOnce(variant);

            const res = await controller.deleteVariant(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.OK);
            expect(res.response).toBeDefined();
        });

        it("returns 401 if unauthorized", async () => {
            isAllowed.mockResolvedValueOnce(Response.unauthorized());

            const res = await controller.deleteVariant(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(res.response).toBeDefined();
        });

        it("returns 403 if forbidden", async () => {
            isAllowed.mockResolvedValueOnce(Response.forbidden);

            const res = await controller.deleteVariant(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.FORBIDDEN);
            expect(res.response).toBeDefined();
        });

        it("returns 404 if variant not found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.productVariant.getById as jest.Mock).mockResolvedValueOnce(null);

            const res = await controller.deleteVariant(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        });
    });

    describe("Test getReviews", () => {
        const variant = {
            id: 1,
            name: "test",
            product_id: 1,
            price: 100,
            stock: 10,
        } as ProductVariant;
        const review = {
            id: 1,
            variant_id: 1,
            user_id: 1,
            rating: 5,
            comment: "test",
        } as Review;
        const params = { id: "1" };

        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/api/variants/1/reviews", {
                headers: { Authorization: `Bearer ${token}` }
            });
        });

        it("returns 200 with data", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.productVariant.getById as jest.Mock).mockResolvedValueOnce(variant);
            (Repository.review.getVariantReviews as jest.Mock).mockResolvedValueOnce([review]);

            const res = await controller.getReviews(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.OK);
            expect(res.response).toBeDefined();
        });

        it("returns 404 if variant not found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.productVariant.getById as jest.Mock).mockResolvedValueOnce(null);

            const res = await controller.getReviews(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        });

        it("returns 404 if no reviews found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.productVariant.getById as jest.Mock).mockResolvedValueOnce(variant);
            (Repository.review.getVariantReviews as jest.Mock).mockResolvedValueOnce([]);

            const res = await controller.getReviews(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        });
    });

    describe("Test getReview", () => {
        const variant = {
            id: 1,
            name: "test",
            product_id: 1,
            price: 100,
            stock: 10,
        } as ProductVariant;
        const review = {
            id: 1,
            variant_id: 1,
            user_id: 1,
            rating: 5,
            comment: "test",
        } as Review;
        const params = { id: "1", reviewId: "1" };

        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/api/variants/1/reviews/1", {
                headers: { Authorization: `Bearer ${token}` }
            });
        });

        it("returns 200 with data", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.productVariant.getById as jest.Mock).mockResolvedValueOnce(variant);
            (Repository.review.getById as jest.Mock).mockResolvedValueOnce(review);

            const res = await controller.getReview(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.OK);
            expect(res.response).toBeDefined();
        });

        it("returns 404 if variant not found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.productVariant.getById as jest.Mock).mockResolvedValueOnce(null);

            const res = await controller.getReview(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        });

        it("returns 404 if review not found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.productVariant.getById as jest.Mock).mockResolvedValueOnce(variant);
            (Repository.review.getById as jest.Mock).mockResolvedValueOnce(null);

            const res = await controller.getReview(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        })
    });

    describe("Test createReview", () => {
        const variant = {
            id: 1,
            name: "test",
            product_id: 1,
            price: 100,
            stock: 10,
        } as ProductVariant;
        const review = {
            id: 1,
            variant_id: 1,
            user_id: 1,
            rating: 5,
            comment: "test",
        } as Review;
        const params = { id: "1" };

        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/api/variants/1/reviews", {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
                body: JSON.stringify({
                    rating: 5,
                    comment: "test",
                })
            });
        });

        it("returns 200 with data", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.productVariant.getById as jest.Mock).mockResolvedValueOnce(variant);
            (Repository.review.create as jest.Mock).mockResolvedValueOnce(review);

            const res = await controller.createReview(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.CREATED);
            expect(res.response).toBeDefined();
        });

        it("returns 400 if invalid body", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            req = new NextRequest("http://localhost:3000/api/variants/1/reviews", {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
            });

            const res = await controller.createReview(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.BAD_REQUEST);
            expect(res.response).toBeDefined();
        });

        it("returns 401 if unauthorized", async () => {
            isAllowed.mockResolvedValueOnce(Response.unauthorized());

            const res = await controller.createReview(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(res.response).toBeDefined();
        });

        it("returns 403 if forbidden", async () => {
            isAllowed.mockResolvedValueOnce(Response.forbidden);

            const res = await controller.createReview(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.FORBIDDEN);
            expect(res.response).toBeDefined();
        });

        it("returns 404 if variant not found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.productVariant.getById as jest.Mock).mockResolvedValueOnce(null);

            const res = await controller.createReview(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        });

        it("returns 422 if wrong body", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            req = new NextRequest("http://localhost:3000/api/variants/1/reviews", {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
                body: "{}"
            });
            (Repository.productVariant.getById as jest.Mock).mockResolvedValueOnce(variant);

            const res = await controller.createReview(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.UNPROCESSABLE_ENTITY);
            expect(res.response).toBeDefined();
        });
    });

    describe("Test deleteReviews", () => {
        const variant = {
            id: 1,
            name: "test",
            product_id: 1,
            price: 100,
            stock: 10,
        } as ProductVariant;
        const review = {
            id: 1,
            variant_id: 1,
            user_id: 1,
            rating: 5,
            comment: "test",
        } as Review;
        const params = { id: "1" };

        it("returns 200 with data", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.productVariant.getById as jest.Mock).mockResolvedValueOnce(variant);
            (Repository.review.deleteVariantReviews as jest.Mock).mockResolvedValueOnce({ count: 1 });

            const res = await controller.deleteReviews(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.OK);
            expect(res.response).toBeDefined();
        });

        it("returns 401 if unauthorized", async () => {
            isAllowed.mockResolvedValueOnce(Response.unauthorized());

            const res = await controller.deleteReviews(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(res.response).toBeDefined();
        });

        it("returns 403 if forbidden", async () => {
            isAllowed.mockResolvedValueOnce(Response.forbidden);

            const res = await controller.deleteReviews(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.FORBIDDEN);
            expect(res.response).toBeDefined();
        });

        it("returns 404 if variant not found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.productVariant.getById as jest.Mock).mockResolvedValueOnce(null);

            const res = await controller.deleteReviews(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        });
    });

    describe("Test updateReview", () => {
        const variant = {
            id: 1,
            name: "test",
            product_id: 1,
            price: 100,
            stock: 10,
        } as ProductVariant;
        const review = {
            id: 1,
            variant_id: 1,
            user_id: 1,
            rating: 5,
            comment: "test",
        } as Review;
        const params = { id: "1", reviewId: "1" };

        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/api/variants/1/reviews/1", {
                method: "PUT",
                headers: { Authorization: `Bearer ${token}` },
                body: JSON.stringify({
                    rating: 5,
                    comment: "test",
                })
            });
        });

        it("returns 200 with data", async () => {
             isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.productVariant.getById as jest.Mock).mockResolvedValueOnce(variant);
            (Repository.review.getById as jest.Mock).mockResolvedValueOnce(review);
            (Repository.review.update as jest.Mock).mockResolvedValueOnce(review);

            const res = await controller.updateReview(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.OK);
            expect(res.response).toBeDefined();
        });

        it("returns 400 if invalid body", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            req = new NextRequest("http://localhost:3000/api/variants/1/reviews/1", { method: "PUT" });

            const res = await controller.updateReview(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.BAD_REQUEST);
            expect(res.response).toBeDefined();
        });

        it("returns 401 if unauthorized", async () => {
            isAllowed.mockResolvedValueOnce(Response.unauthorized());

            const res = await controller.updateReview(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(res.response).toBeDefined();
        });

        it("returns 403 if forbidden", async () => {
            isAllowed.mockResolvedValueOnce(Response.forbidden);

            const res = await controller.updateReview(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.FORBIDDEN);
            expect(res.response).toBeDefined();
        });

        it("returns 404 if variant not found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.productVariant.getById as jest.Mock).mockResolvedValueOnce(null);

            const res = await controller.updateReview(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        });

        it("returns 404 if review not found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.productVariant.getById as jest.Mock).mockResolvedValueOnce(variant);
            (Repository.review.getById as jest.Mock).mockResolvedValueOnce(null);

            const res = await controller.updateReview(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        });
    });

    describe("Test deleteReview", () => {
        const variant = {
            id: 1,
            name: "test",
            product_id: 1,
            price: 100,
            stock: 10,
        } as ProductVariant;
        const review = {
            id: 1,
            variant_id: 1,
            user_id: 1,
            rating: 5,
            comment: "test",
        } as Review;
        const params = { id: "1", reviewId: "1" };

        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/api/variants/1/reviews/1", {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
        });

        it("returns 200 with data", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.productVariant.getById as jest.Mock).mockResolvedValueOnce(variant);
            (Repository.review.getById as jest.Mock).mockResolvedValueOnce(review);
            (Repository.review.delete as jest.Mock).mockResolvedValueOnce(review);

            const res = await controller.deleteReview(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.OK);
            expect(res.response).toBeDefined();
        });

        it("returns 401 if unauthorized", async () => {
            isAllowed.mockResolvedValueOnce(Response.unauthorized());

            const res = await controller.deleteReview(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(res.response).toBeDefined();
        });

        it("returns 403 if forbidden", async () => {
            isAllowed.mockResolvedValueOnce(Response.forbidden);

            const res = await controller.deleteReview(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.FORBIDDEN);
            expect(res.response).toBeDefined();
        });

        it("returns 404 if variant not found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.productVariant.getById as jest.Mock).mockResolvedValueOnce(null);

            const res = await controller.deleteReview(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        });

        it("returns 404 if review not found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.productVariant.getById as jest.Mock).mockResolvedValueOnce(variant);
            (Repository.review.getById as jest.Mock).mockResolvedValueOnce(null);

            const res = await controller.deleteReview(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        });
    });
});

