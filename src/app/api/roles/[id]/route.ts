import RolesController from "@controller/roles.controller";
import { NextRequest, NextResponse } from "next/server";
import Response from "@lib/http";
import { getLogger } from "@utils/logging";
import { STATUS_CODE } from "@lib/constants";

const logger = getLogger({ name: "api:profile" });

async function handler(req: NextRequest, { params }: { params: { id: string } }) {
    const controller = new RolesController();
    let statusCode, response, success;

    switch (req.method) {
        case "GET":
            ({ statusCode, response } = await controller.getRole(req, params));
            success = statusCode === STATUS_CODE.OK;
            logger.info(success ? response.message : response, success ? undefined : `Get role failed: ${ response.message }`);
            break;
        case "PUT":
            ({ statusCode, response } = await controller.updateRole(req, params));
            success = statusCode === STATUS_CODE.OK;
            logger.info(success ? response.message : response, success ? undefined : `Update role failed: ${ response.message }`);
            break;
        case "DELETE":
            ({ statusCode, response } = await controller.deleteRole(req, params));
            success = statusCode === STATUS_CODE.OK;
            logger.info(success ? response.message : response, success ? undefined : `Delete role failed: ${ response.message }`);
            break;
        default:
            ({ statusCode, response } = Response.methodNotAllowed);
    }

    return NextResponse.json(response, { status: statusCode });
}


export {
    handler as GET,
    handler as PUT,
    handler as DELETE
}
