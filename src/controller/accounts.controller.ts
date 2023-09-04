import { NextRequest } from "next/server";

import Validators from "@lib/validator/accounts.validator";
import Response from "@lib/http";
import { AllowPermitted, AllowMethod, CheckError } from "@utils/decorator";
import UserRepository from "@repository/user.repo";
import { parsePageToken, generatePageToken } from "@utils/token";
import { User } from "@prisma/client";
import { PageToken } from "@lib/types";

@AllowPermitted
@CheckError
export default class AccountsController {
    repo = new UserRepository();

    @AllowMethod("GET")
    public async getAccounts(req: NextRequest) {
        const searchParams = Object.fromEntries(req.nextUrl.searchParams);

        const filters = Validators.search.parse(searchParams);

        let {pageToken, limit, ...filter} = filters;
        limit = limit || 50;

        // Parse page token
        let cursor: User | undefined;
        let type: "next" | "previous" | undefined;
        if (pageToken) {
            const token = parsePageToken(pageToken);

            if (!token) return Response.badRequest("Invalid page token");

            const {type: tokenType, ...cursorData} = token;

            cursor = cursorData as User;
            type = tokenType;
        }

        // If type is previous, make limit negative
        const previous = type === "previous";
        let result = await this.repo.getAll(filter, previous ? -limit : limit, cursor);

        if (result.length === 0) return Response.notFound("No accounts found");

        // Parsing page tokens
        const last = result[result.length - 1];
        const first = result[0];
        const nextPageToken: PageToken = {
            id: last.id,
            type: "next"
        };
        const hasNextPage = await this.repo.getAll(filter, limit || 50, result[result.length - 1]).then(res => res.length > 0);

        const nextSearchParams = new URLSearchParams({
            ...searchParams,
            pageToken: generatePageToken(nextPageToken)
        });

        const hasPreviousPage = await this.repo.getAll(filter, limit ? -limit : -50, result[0]).then(res => res.length > 0);
        const previousPageToken: PageToken = {
            id: first.id,
            type: "previous"
        };

        const previousSearchParams = new URLSearchParams({
            ...searchParams,
            pageToken: generatePageToken(previousPageToken)
        });

        // Generate urls
        const nextUrl = `${req.nextUrl.origin}/${req.nextUrl.pathname}?${nextSearchParams.toString()}`;
        const previousUrl = `${req.nextUrl.origin}/${req.nextUrl.pathname}?${previousSearchParams.toString()}`;

        return Response.ok("Accounts found!", {
            result,
            meta: {
                hasNextPage,
                hasPreviousPage,
                previousPageUrl: hasPreviousPage ? previousUrl : undefined,
                nextPageUrl: hasNextPage ? nextUrl : undefined,
            },
        });
    }
}
