import { type NextRequest } from "next/server";

import Validators from "@lib/validator/profile.validator";
import Response from "@lib/http";
import { AllowPermitted, CheckError } from "@utils/decorator";
import { generatePageToken, parsePageToken, verifyAccessToken } from "@utils/token";
import Repository from "@src/repository";
import { hash } from "@utils/hashing";
import { Address } from "@prisma/client";
import { PageToken } from "@lib/types";

const getSession = async (req: NextRequest) => {
    const token = req.headers.get("Authorization")!.split(" ")[1];

    return (await verifyAccessToken(token))!;
}

@AllowPermitted
@CheckError
export default class ProfileController {
    private repo = Repository.user;

    public async getProfile(req: NextRequest) {
        const session = await getSession(req);

        return Response.ok("Profile retrieved successfully", session);
    }

    public async updateProfile(req: NextRequest) {
        const session = await getSession(req);

        const profile = Validators.update.safeParse(req.body);

        if (!profile.success) return Response.validationError(profile.error.errors);

        const isEmailUpdated = !!profile.data.email && profile.data.email !== session.email;
        const isUsernameUpdated = !!profile.data.username && profile.data.username !== session.username;

        if (isEmailUpdated) {
            const emailExists = await this.repo.getByEmail(profile.data.email!);

            if (emailExists) return Response.badRequest("Email already exists");
        }

        if (isUsernameUpdated) {
            const usernameExists = await this.repo.getByUsername(profile.data.username!);

            if (usernameExists) return Response.badRequest("Username already exists");
        }

        const passwordMatches = await this.repo.verifyPassword(session.id, profile.data.password);

        if (!passwordMatches) return Response.unauthorized("Password is incorrect");

        const updatedProfile = await this.repo.update(session.id, profile.data);

        return Response.ok("Profile updated successfully", updatedProfile);
    }

    public async updateEmail(req: NextRequest) {
        const session = await getSession(req);

        const email = Validators.email.safeParse(req.body);

        if (!email.success) return Response.validationError(email.error.errors);

        const emailExists = await this.repo.getByEmail(email.data.email!);

        if (emailExists) return Response.badRequest("Email already exists");

        const passwordMatches = await this.repo.verifyPassword(session.id, email.data.password);

        if (!passwordMatches) return Response.unauthorized("Password is incorrect");

        const updatedProfile = await this.repo.update(session.id, email.data);

        return Response.ok("Email updated successfully", updatedProfile);
    }

    public async updateUsename(req: NextRequest) {
        const session = await getSession(req);

        const username = Validators.username.safeParse(req.body);

        if (!username.success) return Response.validationError(username.error.errors);

        const usernameExists = await this.repo.getByUsername(username.data.username!);

        if (usernameExists) return Response.badRequest("Username already exists");

        const updatedProfile = this.repo.update(session.id, username.data);

        return Response.ok("Username updated successfully", updatedProfile);

    }

    public async updatePassword(req: NextRequest) {
        const session = await getSession(req);

        const password = Validators.password.safeParse(req.body);

        if (!password.success) return Response.validationError(password.error.errors);

        const passwordMatches = await this.repo.verifyPassword(session.id, password.data.oldPassword);

        if (!passwordMatches) return Response.unauthorized("Password is incorrect");

        const hashedPassword = await hash(password.data.newPassword);

        const updatedProfile = await this.repo.update(session.id, { password: hashedPassword });

        return Response.ok("Password updated successfully", updatedProfile);
    }

    public async getAddresses(req: NextRequest) {
        const searchParams = Object.fromEntries(req.nextUrl.searchParams);

        const filters = Validators.addresses.parse(searchParams);

        let { pageToken, limit, ...filter } = filters;
        limit = limit || 50;

        // Parse page token
        let cursor: Address | undefined;
        let type: "next" | "previous" | undefined;
        if (pageToken) {
            const token = parsePageToken(pageToken);

            if (!token) return Response.badRequest("Invalid page token");

            const { type: tokenType, ...cursorData } = token;

            cursor = cursorData as Address;
            type = tokenType;
        }

        // If type is previous, make limit negative
        const previous = type === "previous";
        let result = await Repository.address.getAll(filter, previous ? -limit : limit, cursor);

        if (result.length === 0) return Response.notFound("No address found");

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

        return Response.ok("Addresses found", {
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
