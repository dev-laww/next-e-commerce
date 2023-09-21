import { NextRequest } from "next/server";

import Validators from "@lib/validator/roles.validator";
import Response, { getSession } from "@lib/http";
import { AllowPermitted, CheckBody, CheckError } from "@utils/decorator";
import Repository from "@src/repository";
import { generatePageToken, parsePageToken } from "@utils/token";
import { Role } from "@prisma/client";
import { PageToken } from "@lib/types";
import { getDatabaseLogger } from "@utils/logging";

@AllowPermitted
@CheckError
export default class RolesController {
    private repo = Repository.role;
    private logger = getDatabaseLogger({ name: "controller:roles", class: "RolesController" });

    public async getRoles(req: NextRequest) {
        const session = await getSession(req);

        const searchParams = Object.fromEntries(req.nextUrl.searchParams);

        const filters = Validators.search.parse(searchParams);

        let { pageToken, limit, ...filter } = filters;
        limit = limit || 50;

        // Parse page token
        const parsedPageToken = parsePageToken<Role>(pageToken || "");

        let isPrevious;
        if (pageToken) {
            if (!parsedPageToken) return Response.badRequest("Invalid page token");

            isPrevious = parsedPageToken.type === "previous";
        }

        const pageSize = isPrevious ? -limit : limit;

        // Fetch the addresses
        const result = await this.repo.getAll(filter, pageSize, parsedPageToken?.cursor as Role);

        if (!result.length) return Response.notFound("No role found");

        // Determine if there are more pages
        const hasNextPage = await this.repo.getAll(filter, limit, result[result.length - 1]).then(res => res.length > 0);
        const hasPreviousPage = await this.repo.getAll(filter, -limit, result[0]).then(res => res.length > 0);

        // Generate URLs
        const nextPageToken: PageToken<Role> = {
            cursor: {
                id: result[result.length - 1].id
            },
            type: "next"
        };

        const previousPageToken: PageToken<Role> = {
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

        await this.logger.info(`User ${session.id} fetched roles`)
        return Response.ok("Roles found", {
            result,
            meta,
        });
    }

    public async getRole(req: NextRequest, params: { id: string }) {
        const session = await getSession(req);

        const id = parseInt(params.id, 10);

        const result = await this.repo.getById(id);

        if (!result) return Response.notFound("Role not found");

        await this.logger.info(`User ${session.id} fetched role ${id}`)
        return Response.ok("Role found", result);
    }

    @CheckBody
    public async createRole(req: NextRequest) {
        const session = await getSession(req);

        const body = await req.json();

        const data = Validators.create.safeParse(body);

        if (!data.success) return Response.validationError(data.error.errors, "Invalid data");

        const result = await this.repo.create(data.data);

        await this.logger.info(result, `User ${session.id} created role ${result.id}`, true)
        return Response.created("Role created", result);
    }

    @CheckBody
    public async updateRole(req: NextRequest, params: { id: string }) {
        const session = await getSession(req);

        const id = parseInt(params.id, 10);

        const body = await req.json();

        const data = Validators.update.safeParse(body);

        if (!data.success) return Response.badRequest("Invalid data", data.error);

        let result = await this.repo.getById(id);

        if (!result) return Response.notFound("Role not found");

        result = await this.repo.update(id, data.data);

        await this.logger.info(result, `User ${session.id} updated role ${id}`, true)
        return Response.ok("Role updated", result);
    }

    public async deleteRole(req: NextRequest, params: { id: string }) {
        const session = await getSession(req);

        const { id } = params;

        let result = await this.repo.getById(Number(id) || 0);

        if (!result) return Response.notFound("Role not found");

        result = await this.repo.delete(Number(id) || 0);

        await this.logger.info(result, `User ${session.id} deleted role ${id}`, true)
        return Response.ok("Role deleted", result);
    }

    public async getRolePermissions(req: NextRequest, params: { id: string }) {
        const session = await getSession(req);

        const { id } = params;

        const role = await this.repo.getById(Number(id) || 0);

        if (!role) return Response.notFound("Role not found");

        const result = await this.repo.getPermissions(Number(id) || 0);

        if (!result.length) return Response.notFound("Permissions not found");

        await this.logger.info(`User ${session.id} fetched role ${id} permissions`)
        return Response.ok("Role permissions found", result);
    }

    public async addRolePermission(req: NextRequest, params: { id: string, permissionId: string }) {
        const session = await getSession(req);
        const { id, permissionId } = params;

        const role = await this.repo.getById(Number(id) || 0);

        if (!role) return Response.notFound("Role not found");

        const permission = await Repository.permission.getById(Number(permissionId) || 0);

        if (!permission) return Response.notFound("Permission not found");

        const result = await this.repo.addPermission(Number(id) || 0, Number(permissionId) || 0);

        if (!result) return Response.notFound("Role not found");

        await this.logger.info(result, `User ${session.id} added permission ${permissionId} to role ${id}`, true)
        return Response.ok("Role permission added", result);
    }

    public async removeRolePermission(_req: NextRequest, params: { id: string, permissionId: string }) {
        const session = await getSession(_req);

        const { id, permissionId } = params;

        const role = await this.repo.getById(Number(id) || 0);

        if (!role) return Response.notFound("Role not found");

        const permission = await Repository.permission.getById(Number(permissionId) || 0);

        if (!permission) return Response.notFound("Permission not found");

        const result = await this.repo.removePermission(Number(id) || 0, Number(permissionId) || 0);

        await this.logger.info(result, `User ${session.id} removed permission ${permissionId} from role ${id}`, true)
        return Response.ok("Role permission removed", result);
    }

    public async getRoleUsers(req: NextRequest, params: { id: string }) {
        const session = await getSession(req);
        const { id } = params;

        const result = await this.repo.getUsers(Number(id) || 0);

        if (!result) return Response.notFound("Role not found");

        await this.logger.info(`User ${session.id} fetched role ${id} users`)
        return Response.ok("Role users found", result);
    }
}
