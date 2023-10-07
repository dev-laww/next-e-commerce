import { NextRequest } from "next/server";

import Validators from "@lib/validator/orders.validator";
import Response from "@lib/http";
import { AllowPermitted, CheckError } from "@utils/decorator";
import { getDatabaseLogger } from "@utils/logging";
import Repository from "@src/repository";
import { generatePageToken, parsePageToken } from "@utils/token";
import humps from "humps";
import { PageToken } from "@lib/types";
import { Order } from "@prisma/client";
import { ORDER_STATUS } from "@lib/constants";

@AllowPermitted
@CheckError
export default class OrdersController {
    private repo = Repository.order;
    private logger = getDatabaseLogger({ name: "controller:orders", class: "OrdersController" });

    public async getOrders(req: NextRequest) {

        const searchParams = Object.fromEntries(req.nextUrl.searchParams);

        const filters = Validators.search.parse(searchParams);

        let { pageToken, limit, ...filter } = filters;
        limit = limit || 50;

        // Parse page token
        const parsedPageToken = parsePageToken<Order>(pageToken || "");

        let isPrevious;
        if (pageToken) {
            if (!parsedPageToken) return Response.badRequest("Invalid page token");

            isPrevious = parsedPageToken.type === "previous";
        }

        const pageSize = isPrevious ? -limit : limit;

        // Fetch the results
        filter = humps.decamelizeKeys(filter);
        const result = await this.repo.getAll(filter, pageSize, humps.decamelizeKeys(parsedPageToken?.cursor) as Order);

        if (!result.length) return Response.notFound("No account found");

        // Determine if there are more pages
        const hasNextPage = await this.repo.getAll(filter, limit, { id: result[result.length - 1].id }).then(res => res.length > 0);
        const hasPreviousPage = await this.repo.getAll(filter, -limit, { id: result[0].id }).then(res => res.length > 0);

        // Generate URLs
        const nextPageToken: PageToken<Order> = {
            cursor: {
                id: result[result.length - 1].id
            },
            type: "next"
        };

        const previousPageToken: PageToken<Order> = {
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

        await this.logger.info(`Retrieved ${ result.length } orders`);
        return Response.ok("Orders found", {
            result,
            meta,
        });
    }

    public async getOrder(req: NextRequest, params: { id: string }) {
        const { id } = params;

        console.log(id)

        const result = await this.repo.getById(Number(id) || 0);

        if (!result) return Response.notFound("Order not found");

        await this.logger.info(`Retrieved order ${ id }`);
        return Response.ok("Order found", result);
    }

    public async cancelOrder(req: NextRequest, params: { id: string }) {
        const { id } = params;

        const order = await this.repo.getById(Number(id) || 0);

        if (!order) return Response.notFound("Order not found");

        if (order.status !== ORDER_STATUS.PROCESSING) return Response.badRequest("Order cannot be cancelled");

        const result = await this.repo.cancel(order.id)

        if (!result) return Response.notFound("Order not found");

        await this.logger.info(`Cancelled order ${ id }`);
        return Response.ok("Order cancelled", result);
    }
}
