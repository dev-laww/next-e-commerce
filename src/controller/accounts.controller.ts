import { NextRequest } from "next/server";

import Validators from "@lib/validator/accounts.validator";
import Response from "@lib/http";
import { AllowPermitted, AllowMethod, CheckError } from "@utils/decorator";
import UserRepository from "@repository/user.repo";
import { parsePageToken, generatePageToken } from "@utils/token";
import { User } from "@prisma/client";

@AllowPermitted
@CheckError
export default class AccountsController {
    repo = new UserRepository();

    @AllowMethod("GET")
    public async getAccounts(req: NextRequest) {
        const searchParams = Object.fromEntries(req.nextUrl.searchParams);

        const filters = Validators.search.safeParse(searchParams);

        if (!filters.success) return Response.badRequest("Invalid search params", filters.error.errors);

        let {pageToken, previous, limit, ...filter} = filters.data;
        limit = limit || 50;

        let cursor: User | undefined;
        if (pageToken) {
            cursor = parsePageToken(pageToken);

            if (!cursor) return Response.badRequest("Invalid page token");
        }

        let result = await this.repo.getAll(filter, previous ? -limit : limit, cursor);

        const nextPageToken = result[result.length - 1] ? generatePageToken(result[result.length - 1]) : undefined;
        const hasNextPage = await this.repo.getAll(filter, limit || 50, result[result.length - 1]).then(res => res.length > 0);

        delete searchParams.previous;
        const newSearchParam = new URLSearchParams({
            ...searchParams,
            pageToken: nextPageToken || ""
        });

        const hasPreviousPage = await this.repo.getAll(filter, limit ? -limit : -50, result[0]).then(res => res.length > 0);
        const previousPageToken = result[0] ? generatePageToken(result[0]) : undefined;

        const newPreviousSearchParam = new URLSearchParams({
            ...searchParams,
            previous: "true",
            pageToken: previousPageToken || ""
        });

        const nextUrl = `${req.nextUrl.origin}/${req.nextUrl.pathname}?${newSearchParam.toString()}`;
        const previousUrl = `${req.nextUrl.origin}/${req.nextUrl.pathname}?${newPreviousSearchParam.toString()}`;

        return Response.ok("Test", {
            result,
            meta: {
                previousPageUrl: hasPreviousPage ? previousUrl : undefined,
                nextPageUrl: hasNextPage ? nextUrl : undefined,
            },
        });
    }
}
