import { NextRequest } from "next/server";

import Validators from "@lib/validator/shipping-methods.validator";
import Response, { getSession } from "@lib/http";
import { AllowPermitted, CheckBody, CheckError } from "@utils/decorator";
import { getDatabaseLogger } from "@utils/logging";
import Repository from "@src/repository";
import { generatePageToken, parsePageToken } from "@utils/token";
import { ShippingMethod } from "@prisma/client";
import humps from "humps";
import { PageToken } from "@lib/types";

@AllowPermitted
@CheckError
export default class ShippingMethodsController {
    private repo = Repository.shipping
    private logger = getDatabaseLogger({ name: "controller:shipping-methods", class: "ShippingMethodsController" });

    public async getShippingMethods(req: NextRequest) {
        const searchParams = Object.fromEntries(req.nextUrl.searchParams);

        const filters = Validators.search.parse(searchParams);

        let { pageToken, limit, ...filter } = filters;
        limit = limit || 50;

        // Parse page token
        const parsedPageToken = parsePageToken<ShippingMethod>(pageToken || "");

        let isPrevious;
        if (pageToken) {
            if (!parsedPageToken) return Response.badRequest("Invalid page token");

            isPrevious = parsedPageToken.type === "previous";
        }

        const pageSize = isPrevious ? -limit : limit;

        // Fetch the data
        filter = humps.decamelizeKeys(filter);
        const result = await this.repo.getAll(filter, pageSize, parsedPageToken?.cursor as ShippingMethod);

        if (!result.length) return Response.notFound("No shipping method found");

        // Determine if there are more pages
        const hasNextPage = await this.repo.getAll(filter, limit, result[result.length - 1]).then(res => res.length > 0);
        const hasPreviousPage = await this.repo.getAll(filter, -limit, result[0]).then(res => res.length > 0);

        // Generate URLs
        const nextPageToken: PageToken<ShippingMethod> = {
            cursor: {
                id: result[result.length - 1].id
            },
            type: "next"
        };

        const previousPageToken: PageToken<ShippingMethod> = {
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

        await this.logger.info(`Retrieved ${ result.length } shipping methods`);
        return Response.ok("Shipping methods found", {
            result,
            meta,
        });
    }

    public async getShippingMethod(req: NextRequest, params: { id: string }) {
        const { id } = params;
        const shippingMethod = await this.repo.getById(Number(id) || 0);

        if (!shippingMethod) return Response.notFound("Shipping method not found");

        await this.logger.info(`Retrieved shipping method ${ shippingMethod.id }`);
        return Response.ok("Shipping method found", shippingMethod);
    }

    @CheckBody
    public async createShippingMethod(req: NextRequest) {
        const session = await getSession(req);
        const body = await req.json();
        const reqData = Validators.create.safeParse(body);

        if (!reqData.success) return Response.validationError(reqData.error.errors, "Invalid data");

        const shippingMethod = await this.repo.create(reqData.data);

        await this.logger.info(shippingMethod, `User [${ session.id }] created shipping method [${ shippingMethod.id }]`, true);
        return Response.created("Shipping method created", shippingMethod);
    }

    @CheckBody
    public async updateShippingMethod(req: NextRequest, params: { id: string }) {
        const session = await getSession(req);
        const { id } = params;

        const shippingMethodExists = await this.repo.getById(Number(id) || 0);

        if (!shippingMethodExists) return Response.notFound("Shipping method not found");

        const body = await req.json();
        const reqData = Validators.update.safeParse(body);

        if (!reqData.success) return Response.validationError(reqData.error.errors, "Invalid data");

        const shippingMethod = await this.repo.update(Number(id) || 0, reqData.data);

        await this.logger.info(shippingMethod, `User [${ session.id }] updated shipping method [${ shippingMethod.id }]`, true);
        return Response.ok("Shipping method updated", shippingMethod);
    }

    public async deleteShippingMethod(req: NextRequest, params: { id: string }) {
        const session = await getSession(req);
        const { id } = params;

        let shippingMethod = await this.repo.getById(Number(id) || 0);

        if (!shippingMethod) return Response.notFound("Shipping method not found");

        shippingMethod = await this.repo.delete(shippingMethod.id);

        await this.logger.info(shippingMethod, `User [${ session.id }] deleted shipping method [${ shippingMethod.id }]`, true);
        return Response.ok("Shipping method deleted", shippingMethod);
    }

    public async getShippingMethodOrders(req: NextRequest, params: { id: string }) {
        const session = await getSession(req);
        const { id } = params;
        const shippingMethod = await this.repo.getById(Number(id) || 0);

        if (!shippingMethod) return Response.notFound("Shipping method not found");

        const orders = await this.repo.getShippingOrders(shippingMethod.id);

        await this.logger.info(`User [${ session.id }] ${ orders.length } orders for shipping method {${ shippingMethod.id }}`);
        return Response.ok("Orders found", orders);
    }
}
