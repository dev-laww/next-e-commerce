import { NextRequest } from "next/server";

import Validators from "@lib/validator/coupons.validator";
import Response, { getSession } from "@lib/http";
import { AllowPermitted, CheckBody, CheckError } from "@utils/decorator";
import { getDatabaseLogger } from "@utils/logging";
import { generateCouponCode, generatePageToken, parsePageToken } from "@utils/token";
import { Coupon } from "@prisma/client";
import humps from "humps";
import Repository from "@src/repository";
import { PageToken } from "@lib/types";

@AllowPermitted
@CheckError
export default class CouponsController {
    private repo = Repository.coupon;
    private logger = getDatabaseLogger({ name: "controller:coupons", class: "CouponsController" });

    public async getCoupons(req: NextRequest) {
        const searchParams = Object.fromEntries(req.nextUrl.searchParams);

        const filters = Validators.search.parse(searchParams);

        let { pageToken, limit, ...filter } = filters;
        limit = limit || 50;

        // Parse page token
        const parsedPageToken = parsePageToken<Coupon>(pageToken || "");

        let isPrevious;
        if (pageToken) {
            if (!parsedPageToken) return Response.badRequest("Invalid page token");

            isPrevious = parsedPageToken.type === "previous";
        }

        const pageSize = isPrevious ? -limit : limit;

        // Fetch the data
        filter = humps.decamelizeKeys(filter);
        const result = await this.repo.getAll(filter, pageSize, parsedPageToken?.cursor as Coupon);

        if (!result.length) return Response.notFound("No coupon found");

        // Determine if there are more pages
        const hasNextPage = await this.repo.getAll(filter, limit, result[result.length - 1]).then(res => res.length > 0);
        const hasPreviousPage = await this.repo.getAll(filter, -limit, result[0]).then(res => res.length > 0);

        // Generate URLs
        const nextPageToken: PageToken<Coupon> = {
            cursor: {
                id: result[result.length - 1].id
            },
            type: "next"
        };

        const previousPageToken: PageToken<Coupon> = {
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
            previousPageUrl: hasPreviousPage ? `${req.nextUrl.origin}/${req.nextUrl.pathname}?${previousSearchParams.toString()}` : undefined,
            nextPageUrl: hasNextPage ? `${req.nextUrl.origin}/${req.nextUrl.pathname}?${nextSearchParams.toString()}` : undefined,
        };

        await this.logger.info(`Retrieved ${result.length} variants`);
        return Response.ok("Variants found", {
            result,
            meta,
        });
    }

    public async getCoupon(req: NextRequest, params: { code: string }) {
        const { code } = params;
        const coupon = await this.repo.getByCode(code);

        if (!coupon) return Response.notFound("Coupon not found");

        await this.logger.info(`Retrieved coupon [${coupon.code}]`);
        return Response.ok("Coupon found", coupon);
    }

    @CheckBody
    public async createCoupon(req: NextRequest) {
        const session = await getSession(req);
        const body = await req.json();
        let code = body.code;

        if (code) {
            const coupon = await this.repo.getByCode(code.toUpperCase());
            if (coupon) return Response.badRequest("Coupon code already exists");

            code ??= code.toUpperCase();
        }

        code ??= generateCouponCode(6);

        const reqData = Validators.create.safeParse(body);

        if (!reqData.success) return Response.validationError(reqData.error.errors, "Invalid body");

        const coupon = await this.repo.create({
            ...reqData.data,
            code: code,
        } as Coupon);

        await this.logger.info(`User [${session.username}] created coupon [${coupon.code}]`);
        return Response.created("Coupon created", coupon);
    }

    @CheckBody
    public async updateCoupon(req: NextRequest, params: { code: string }) {
        const session = await getSession(req);
        const { code } = params;
        const body = await req.json();

        const coupon = await this.repo.getByCode(code);

        if (!coupon) return Response.notFound("Coupon not found");

        const reqData = Validators.update.safeParse(body);

        if (!reqData.success) return Response.validationError(reqData.error.errors, "Invalid body");

        const updatedCoupon = await this.repo.update(coupon.id, reqData.data);

        await this.logger.info(`User [${session.username}] updated coupon [${coupon.code}]`);
        return Response.ok("Coupon updated", updatedCoupon);
    }

    public async deleteCoupon(req: NextRequest, params: { code: string }) {
        const session = await getSession(req);
        const { code } = params;

        let coupon = await this.repo.getByCode(code);

        if (!coupon) return Response.notFound("Coupon not found");

        coupon = await this.repo.delete(coupon.id);

        await this.logger.info(`User [${session.username}] deleted coupon [${coupon.code}]`);
        return Response.ok("Coupon deleted", coupon);
    }
}
