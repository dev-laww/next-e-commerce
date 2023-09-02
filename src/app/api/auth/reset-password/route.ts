import { NextRequest, NextResponse } from "next/server";

import AuthController from "@controller/auth.controller";
import { STATUS_CODE } from "@lib/constants";
import { getLogger } from "@utils/logging";

const logger = getLogger('api:auth:reset-password');

async function handler(req: NextRequest) {
    const controller = new AuthController();

    const {statusCode, response} = await controller.resetPassword(req);
    const success = statusCode == STATUS_CODE.OK;
    await logger.info(success ? response.message : response, success ? undefined : `Reset password failed: ${response.message}`);

    return NextResponse.json(response, {status: statusCode});
}

export {
    handler as GET,
    handler as POST,
    handler as PUT
}
