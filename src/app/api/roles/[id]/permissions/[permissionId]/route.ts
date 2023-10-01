import RolesController from "@controller/roles.controller";
import { NextRequest, NextResponse } from "next/server";
import Response from "@lib/http";
import { getLogger } from "@utils/logging";
import { STATUS_CODE } from "@lib/constants";

const logger = getLogger({ name: "api:profile" });

async function handler(req: NextRequest, { params }: { params: { id: string, permissionId: string } }) {
    const controller = new RolesController();
    let statusCode, response, success;

    switch (req.method) {
        case "POST":
            ({ statusCode, response } = await controller.addRolePermission(req, params));
            success = statusCode === STATUS_CODE.OK;
            logger.info(success ? response.message : response, success ? undefined : `Add role permission failed: ${response.message}`);
            break;
        case "DELETE":
            ({ statusCode, response } = await controller.removeRolePermission(req, params));
            success = statusCode === STATUS_CODE.OK;
            logger.info(success ? response.message : response, success ? undefined : `Remove role permission failed: ${response.message}`);
            break;
        default:
            ({ statusCode, response } = Response.methodNotAllowed);
    }

    return NextResponse.json(response, { status: statusCode });
}


export {
    handler as POST,
    handler as DELETE
}
