import { NextRequest } from "next/server";

import UserRepository from "@repository/user.repo";
import PermissionRepository from "@repository/permission.repo";
import { getLogger } from "@utils/logging";
import { verifyAccessToken } from "@utils/token";

/**
 * Controller for permission
 * Check if the user is allowed to access the resource
 */
export default class PermissionController {
    private static repo = new UserRepository();
    private static permissionRepo = new PermissionRepository();
    private static logger = getLogger({name: "controller:permission"});

    private static getRequestedResource(resource: string, availableResource: string[]): string | undefined {
        for (const available of availableResource) {
            const pattern = available.replace(/:[^/]+/g, '([^/]+)')
            const regex = new RegExp(`^${pattern}$`);

            if (resource.match(regex)) return available;
        }

        return undefined;
    }

    public static async isAllowed(req: NextRequest): Promise<boolean> {
        const logger = this.logger.child({function: "isAllowed"});
        const path = req.nextUrl.pathname;
        const token = req.headers.get("authorization")?.split(" ")[1];

        let resource = `${req.method}${path}`;

        if (path.startsWith("/api/auth")) return true;
        // TODO: Add common resources without permission needed

        logger.info(`Checking permission for ${resource}`);

        const resourceList = await this.permissionRepo.getAvailableResources();
        const requestedResource = this.getRequestedResource(resource, resourceList);

        if (!requestedResource || !token) return false;

        const session = await verifyAccessToken(token);

        if (!session) return false;

        const permissions = await this.repo.getPermissions(session.id);

        if (!permissions) return false;

        logger.debug(permissions.map(permission => permission.resource), `${session.username} allowed resources`);
        return permissions.some(permission => permission.resource == requestedResource);
    }
}
