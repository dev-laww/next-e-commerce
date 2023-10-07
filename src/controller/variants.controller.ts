import { NextRequest } from "next/server";

import Validators from "@lib/validator/variants.validator";
import Response, { getSession } from "@lib/http";
import { AllowPermitted, CheckBody, CheckError } from "@utils/decorator";
import Repository from "@src/repository";
import { getDatabaseLogger } from "@utils/logging";
import { generatePageToken, parsePageToken } from "@utils/token";
import { ProductVariant, Review } from "@prisma/client";
import { PageToken } from "@lib/types";
import humps from "humps";

@AllowPermitted
@CheckError
export default class VariantsController {
    private repo = Repository.productVariant;
    private logger = getDatabaseLogger({ name: "controller:variants", class: "VariantsController" });

    public async getVariants(req: NextRequest) {
        const searchParams = Object.fromEntries(req.nextUrl.searchParams);

        const filters = Validators.search.parse(searchParams);

        let { pageToken, limit, ...filter } = filters;
        limit = limit || 50;

        // Parse page token
        const parsedPageToken = parsePageToken<ProductVariant>(pageToken || "");

        let isPrevious;
        if (pageToken) {
            if (!parsedPageToken) return Response.badRequest("Invalid page token");

            isPrevious = parsedPageToken.type === "previous";
        }

        const pageSize = isPrevious ? -limit : limit;

        // Fetch the addresses
        filter = humps.decamelizeKeys(filter);
        const result = await Repository.productVariant.getAll(filter, pageSize, parsedPageToken?.cursor as ProductVariant);

        if (!result.length) return Response.notFound("No account found");

        // Determine if there are more pages
        const hasNextPage = await this.repo.getAll(filter, limit, result[result.length - 1]).then(res => res.length > 0);
        const hasPreviousPage = await this.repo.getAll(filter, -limit, result[0]).then(res => res.length > 0);

        // Generate URLs
        const nextPageToken: PageToken<ProductVariant> = {
            cursor: {
                id: result[result.length - 1].id
            },
            type: "next"
        };

        const previousPageToken: PageToken<ProductVariant> = {
            cursor: {
                id: result[0].id
            },
            type: "previous"
        };

        const nextSearchParams = new URLSearchParams({
            ...searchParams,
            pageToken: generatePageToken(nextPageToken)
        });

        const previousSearchParams = new URLSearchParams({
            ...searchParams,
            pageToken: generatePageToken(previousPageToken)
        });

        const meta = {
            hasNextPage,
            hasPreviousPage,
            previousPageUrl: hasPreviousPage ? `${ req.nextUrl.origin }/${ req.nextUrl.pathname }?${ previousSearchParams.toString() }` : undefined,
            nextPageUrl: hasNextPage ? `${ req.nextUrl.origin }/${ req.nextUrl.pathname }?${ nextSearchParams.toString() }` : undefined,
        };

        await this.logger.info(`Retrieved ${ result.length } variants`);
        return Response.ok("Variants found", {
            result,
            meta,
        });
    }

    @CheckBody
    public async createVariant(req: NextRequest) {
        const session = await getSession(req);
        const body = await req.json();
        const data = Validators.create.safeParse(body);

        if (!data.success) return Response.validationError(data.error.errors, "Invalid data");

        const result = await this.repo.create(humps.decamelizeKeys({
            ...data.data,
            imageUrl: "https://via.placeholder.com/150",
        }) as ProductVariant);

        await this.logger.info(result, `User ${ session.id } created variant ${ result.id }`, true);
        return Response.created("Variant created", result);
    }

    public async getVariant(_req: NextRequest, params: { id: string }) {
        const { id } = params;
        const result = await this.repo.getById(Number(id) || 0);

        if (!result) return Response.notFound("Variant not found");

        await this.logger.info(`Retrieved variant ${ result.id }`);
        return Response.ok("Variant found", result);
    }

    @CheckBody
    public async updateVariant(req: NextRequest, params: { id: string }) {
        const { id } = params;
        const session = await getSession(req);
        const body = await req.json();

        let result = await this.repo.getById(Number(id));

        if (!result) return Response.notFound("Variant not found");

        const data = Validators.update.safeParse(body);

        if (!data.success) return Response.validationError(data.error.errors, "Invalid data");

        result = await this.repo.update(result.id, humps.decamelizeKeys(data.data) as ProductVariant);

        await this.logger.info(result, `User ${ session.id } updated variant ${ result.id }`, true);
        return Response.ok("Variant updated", result);
    }

    public async deleteVariant(req: NextRequest, params: { id: string }) {
        const session = await getSession(req);
        const { id } = params;
        let result = await this.repo.getById(Number(id) || 0);

        if (!result) return Response.notFound("Variant not found");

        result = await this.repo.delete(result.id);

        await this.logger.info(result, `User ${ session.id } deleted variant ${ result.id }`, true);
        return Response.ok("Variant deleted", result);
    }

    public async getReviews(_req: NextRequest, params: { id: string }) {
        const { id } = params;

        const variant = await this.repo.getById(Number(id) || 0);

        if (!variant) return Response.notFound("Variant not found");

        const result = await Repository.review.getVariantReviews(variant.id);

        if (!result.length) return Response.notFound("Variant not found");

        await this.logger.info(`Retrieved reviews for variant ${ id }`);
        return Response.ok("Reviews found", result);
    }

    public async deleteReviews(req: NextRequest, params: { id: string }) {
        const session = await getSession(req);
        const { id } = params;
        const variant = await this.repo.getById(Number(id) || 0);

        if (!variant) return Response.notFound("Variant not found");

        const result = await Repository.review.deleteVariantReviews(variant.id);

        await this.logger.info(`User ${ session.id } deleted reviews for variant ${ variant.id }`, undefined, true);
        return Response.ok(`${ result.count } review${ result.count > 1 ? "s" : "" } deleted successfully`);
    }

    public async getReview(_req: NextRequest, params: { id: string, reviewId: string }) {
        const { id, reviewId } = params;
        const variant = await this.repo.getById(Number(id) || 0);

        if (!variant) return Response.notFound("Variant not found");

        const result = await Repository.review.getById(Number(reviewId) || 0);

        if (!result) return Response.notFound("Review not found");

        await this.logger.info(`Retrieved review ${ result.id } for variant ${ variant.id }`);
        return Response.ok("Review found", result);
    }

    @CheckBody
    public async createReview(req: NextRequest, params: { id: string }) {
        const { id } = params;
        const session = await getSession(req);
        const body = await req.json();

        const variant = await this.repo.getById(Number(id) || 0);

        if (!variant) return Response.notFound("Variant not found");

        const data = Validators.createReview.safeParse(body);

        if (!data.success) return Response.validationError(data.error.errors, "Invalid data");

        const result = await Repository.review.create(humps.decamelizeKeys({
            ...data.data,
            variantId: variant.id,
            userId: session.id,
            productId: variant.product_id,
        }) as Review);

        await this.logger.info(result, `User ${ session.id } created review ${ result.id }`, true)
        return Response.created("Review created", result);
    }

    @CheckBody
    public async updateReview(req: NextRequest, params: { id: string, reviewId: string }) {
        const { id, reviewId } = params;
        const session = await getSession(req);
        const body = await req.json();
        const variant = await this.repo.getById(Number(id) || 0);

        if (!variant) return Response.notFound("Variant not found");

        const review = await Repository.review.getById(Number(reviewId) || 0);

        if (!review) return Response.notFound("Review not found");

        const data = Validators.updateReview.safeParse(body);

        if (!data.success) return Response.validationError(data.error.errors, "Invalid data");

        const result = await Repository.review.update(Number(reviewId) || 0, humps.decamelizeKeys(data.data) as Review);

        await this.logger.info(result, `User ${ session.id } updated review ${ result.id }`, true)
        return Response.ok("Review updated", result);
    }

    public async deleteReview(req: NextRequest, params: { id: string, reviewId: string }) {
        const { id, reviewId } = params;
        const session = await getSession(req);
        const variant = await this.repo.getById(Number(id) || 0);

        if (!variant) return Response.notFound("Variant not found");

        const review = await Repository.review.getById(Number(reviewId) || 0);

        if (!review) return Response.notFound("Review not found");

        const result = await Repository.review.delete(Number(reviewId) || 0);

        await this.logger.info(result, `User ${ session.id } deleted review ${ result.id }`, true)
        return Response.ok("Review deleted", result);
    }
}
