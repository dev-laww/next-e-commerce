import { NextRequest } from "next/server";

import UserRepository from "@repository/user.repo";
import PermissionRepository from "@repository/permission.repo";
import { getDatabaseLogger } from "@utils/logging";
import { verifyAccessToken } from "@utils/token";
import { COMMON_RESOURCES } from "@lib/constants";
import { UserSession } from "@lib/types";

/**
 * Controller for permission
 * Check if the user is allowed to access the resource
 */
export default class PermissionController {
    private static repo = new UserRepository();
    private static permissionRepo = new PermissionRepository();
    private static logger = getDatabaseLogger({ name: "controller:permission" });

    private static getRequestedResource(resource: string, availableResource: string[]): string | undefined {
        for (const available of availableResource) {
            const pattern = available.replace(/:[^/]+/g, '([^/]+)')
            const regex = new RegExp(`^${pattern}$`);

            if (resource.match(regex)) return available;
        }

        return undefined;
    }

    public static async isAllowed(req: NextRequest): Promise<boolean> {
        const path = req.nextUrl.pathname;
        const token = req.headers.get("Authorization")?.split(" ")[1];

        let resource = `${req.method}${path}`;
        await this.logger.info(`Checking permission for ${resource}`);

        if (path.startsWith("/api/auth")) return true;

        const isCommonResource = this.getRequestedResource(resource, COMMON_RESOURCES);

        if (isCommonResource) return true;

        const resourceList = await this.permissionRepo.getAvailableResources();
        const requestedResource = this.getRequestedResource(resource, resourceList);

        if (!requestedResource || !token) return false;

        let session: UserSession;
        try {
            session = await verifyAccessToken(token);
        } catch (err) {
            await this.logger.info("Failed to verify access token");
            return false;
        }

        const permissions = await this.repo.getPermissions(session.id);

        if (!permissions || permissions.length === 0) return false;

        await this.logger.debug(permissions.map(permission => permission.resource), `${session.username} allowed resources`);

        const allowed = permissions.some(permission => permission.resource === requestedResource);

        await this.logger.info(`${allowed ? "Allowed" : "Denied"} ${session.username} to access ${requestedResource}`, undefined, allowed);

        return allowed;
    }
}
