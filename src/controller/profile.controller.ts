import { type NextRequest } from "next/server";

import Validators from "@lib/validator/profile.validator";
import Response from "@lib/http";
import { AllowPermitted, CheckError } from "@utils/decorator";
import { generatePageToken, parsePageToken, verifyAccessToken } from "@utils/token";
import Repository from "@src/repository";
import { hash } from "@utils/hashing";
import { PageToken } from "@lib/types";
import { Address, User } from "@prisma/client";

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
        const parsedPageToken = parsePageToken<Address>(pageToken || "");

        let isPrevious;
        if (pageToken) {
            if (!parsedPageToken) return Response.badRequest("Invalid page token");

            isPrevious = parsedPageToken.type === "previous";
        }

        const pageSize = isPrevious ? -limit : limit;

        // Fetch the addresses
        const result = await Repository.user.getAll(filter, pageSize, parsedPageToken?.cursor as User);

        if (!result.length) return Response.notFound("No address found");

        // Determine if there are more pages
        const hasNextPage = await this.repo.getAll(filter, limit, result[result.length - 1]).then(res => res.length > 0);
        const hasPreviousPage = await this.repo.getAll(filter, -limit, result[0]).then(res => res.length > 0);

        // Generate URLs
        const nextPageToken: PageToken<Address> = {
            cursor: {
                id: result[result.length - 1].id
            },
            type: "next"
        };

        const previousPageToken: PageToken<Address> = {
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

        return Response.ok("Addresses found", {
            result,
            meta,
        });
    }
}
