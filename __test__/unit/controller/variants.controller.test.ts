import { NextRequest } from "next/server";
import VariantsController from "@controller/variants.controller";


describe("VariantsController", () => {
    let controller: VariantsController;
    let req: NextRequest;

    beforeEach(() => {
        controller = new VariantsController();
    });

    describe("Test getVariants", () => {
        it.todo("returns 200 with data");
        it.todo("returns 404 if no variants found");
    })

    describe("Test getVariant", () => {
        it.todo("returns 200 with data");
        it.todo("returns 404 if variant not found");
    });

    describe("Test createVariant", () => {
        it.todo("returns 200 with data");
        it.todo("returns 400 if invalid body");
        it.todo("returns 401 if unauthorized");
        it.todo("returns 403 if forbidden");
        it.todo("returns 422 if wrong body");
    });

    describe("Test updateVariant", () => {
        it.todo("returns 200 with data");
        it.todo("returns 400 if invalid body");
        it.todo("returns 401 if unauthorized");
        it.todo("returns 403 if forbidden");
        it.todo("returns 404 if variant not found");
        it.todo("returns 422 if wrong body");
    });

    describe("Test deleteVariant", () => {
        it.todo("returns 200 with data");
        it.todo("returns 401 if unauthorized");
        it.todo("returns 403 if forbidden");
        it.todo("returns 404 if variant not found");
    });

    describe("Test getReviews", () => {
        it.todo("returns 200 with data");
        it.todo("returns 404 if variant not found");
        it.todo("returns 404 if no reviews found");
    });

    describe("Test getReview", () => {
        it.todo("returns 200 with data");
        it.todo("returns 404 if variant not found");
        it.todo("returns 404 if review not found");
    });

    describe("Test createReview", () => {
        it.todo("returns 200 with data");
        it.todo("returns 400 if invalid body");
        it.todo("returns 401 if unauthorized");
        it.todo("returns 403 if forbidden");
        it.todo("returns 404 if variant not found");
        it.todo("returns 422 if wrong body");
    });

    describe("Test deleteReviews", () => {
        it.todo("returns 200 with data");
        it.todo("returns 401 if unauthorized");
        it.todo("returns 403 if forbidden");
        it.todo("returns 404 if variant not found");
    });

    describe("Test updateReview", () => {
        it.todo("returns 200 with data");
        it.todo("returns 400 if invalid body");
        it.todo("returns 401 if unauthorized");
        it.todo("returns 403 if forbidden");
        it.todo("returns 404 if variant not found");
        it.todo("returns 404 if review not found");
        it.todo("returns 422 if wrong body");
    });

    describe("Test deleteReview", () => {
        it.todo("returns 200 with data");
        it.todo("returns 401 if unauthorized");
        it.todo("returns 403 if forbidden");
        it.todo("returns 404 if variant not found");
        it.todo("returns 404 if review not found");
    });
});

