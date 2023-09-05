import { type NextRequest, NextResponse } from "next/server";

import AccountsController from "@controller/accounts.controller";
import { STATUS_CODE } from "@lib/constants";
import Response from "@lib/http";
import { getLogger } from "@utils/logging";


const logger = getLogger({ name: "api:accounts:id" });


export async function handler(req: NextRequest, { params }: { params: { id: string } }) {
    const method = req.method;
    let statusCode: number;
    let response: any;
    let success: boolean;

    const controller = new AccountsController();

    switch (method) {
        case "GET":
            ({ statusCode, response } = await controller.getAccount(req, params));
            success = statusCode == STATUS_CODE.OK;
            logger.info(success ? response.message : response, success ? undefined : `Get accounts failed: ${response.message}`);
            break;
        case "POST":
            ({ statusCode, response } = await controller.updateAccount(req, params));
            success = statusCode == STATUS_CODE.OK;
            logger.info(success ? response.message : response, success ? undefined : `Create account failed: ${response.message}`);
            break;
        case "DELETE":
            ({ statusCode, response } = await controller.deleteAccount(req, params));
            success = statusCode == STATUS_CODE.OK;
            logger.info(success ? response.message : response, success ? undefined : `Delete account failed: ${response.message}`);
            break;
        default:
            ({ statusCode, response } = Response.methodNotAllowed);
            logger.warn(`Method ${method} not supported`);
    }

    return NextResponse.json(response, { status: statusCode })
}

export {
    handler as GET,
    handler as PUT,
    handler as DELETE,
}

