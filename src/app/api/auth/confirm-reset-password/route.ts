import { NextRequest, NextResponse } from "next/server";

import AuthController from "@controller/auth.controller";
import { getLogger } from "@utils/logging";
import { STATUS_CODE } from "@lib/constants";

const logger = getLogger('api:auth:confirm-reset-password');

async function handler(req: NextRequest) {
    const controller = new AuthController();

    const {statusCode, response} = await controller.confirmResetPassword(req);
    const success = statusCode == STATUS_CODE.OK;
    await logger.info(success ? response.message : response, success ? undefined : `Confirm reset password failed: ${response.message}`);

    return NextResponse.json(response, {status: statusCode})
}

export {
    handler as GET,
    handler as POST,
    handler as PUT
}
