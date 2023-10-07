import { NextRequest } from "next/server";

import Validators from "@lib/validator/logs.validator";
import Response from "@lib/http";
import { AllowPermitted, CheckError } from "@utils/decorator";
import { getDatabaseLogger } from "@utils/logging";
import Repository from "@src/repository";
import { generatePageToken, parsePageToken } from "@utils/token";
import { Log } from "@prisma/client";
import humps from "humps";
import { PageToken } from "@lib/types";

@AllowPermitted
@CheckError
export default class LogsController {
    private repo = Repository.log;
    private logger = getDatabaseLogger({ name: "controller:logs", class: "LogsController" });

    public async getLogs(req: NextRequest) {
        const searchParams = Object.fromEntries(req.nextUrl.searchParams);

        const filters = Validators.search.parse(searchParams);

        let { pageToken, limit, ...filter } = filters;
        limit = limit || 50;

        // Parse page token
        const parsedPageToken = parsePageToken<Log>(pageToken || "");

        let isPrevious;
        if (pageToken) {
            if (!parsedPageToken) return Response.badRequest("Invalid page token");

            isPrevious = parsedPageToken.type === "previous";
        }

        const pageSize = isPrevious ? -limit : limit;

        // Fetch the addresses
        filter = humps.decamelizeKeys(filter);
        const result = await this.repo.getAll(filter, pageSize, parsedPageToken?.cursor as Log);

        if (!result.length) return Response.notFound("No account found");

        // Determine if there are more pages
        const hasNextPage = await this.repo.getAll(filter, limit, result[result.length - 1]).then(res => res.length > 0);
        const hasPreviousPage = await this.repo.getAll(filter, -limit, result[0]).then(res => res.length > 0);

        // Generate URLs
        const nextPageToken: PageToken<Log> = {
            cursor: {
                id: result[result.length - 1].id
            },
            type: "next"
        };

        const previousPageToken: PageToken<Log> = {
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

        await this.logger.info(`Retrieved ${ result.length } logs`);
        return Response.ok("Logs found", {
            result,
            meta,
        });
    }
}
