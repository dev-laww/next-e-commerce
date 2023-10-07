import { type NextRequest, NextResponse } from "next/server";


import AccountsController from "@controller/accounts.controller";
import { STATUS_CODE } from "@lib/constants";
import Response from "@lib/http";
import { getLogger } from "@utils/logging";

const logger = getLogger({ name: "api:auth:accounts" });

async function handler(req: NextRequest, { params }: { params: { id: string } }) {
    const method = req.method;
    let statusCode, response, success;
    const controller = new AccountsController();

    switch (method) {
        case "GET":
            ({ statusCode, response } = await controller.getAccountRoles(req, params));
            success = statusCode == STATUS_CODE.OK;
            logger.info(success ? response.message : response, success ? undefined : `Get account roles failed: ${ response.message }`);
            break;
        case "PUT":
            ({ statusCode, response } = await controller.updateAccountRoles(req, params));
            success = statusCode == STATUS_CODE.OK;
            logger.info(success ? response.message : response, success ? undefined : `Update account roles failed: ${ response.message }`);
            break;
        default:
            ({ statusCode, response } = Response.methodNotAllowed);
            logger.warn(`Method ${ method } not supported`);
    }

    return NextResponse.json(response, { status: statusCode })
}

export {
    handler as GET,
    handler as PUT
}
