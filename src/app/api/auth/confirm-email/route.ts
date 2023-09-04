import { NextRequest, NextResponse } from "next/server";

import AuthController from "@controller/auth.controller";
import { getLogger } from "@utils/logging";
import { STATUS_CODE } from "@lib/constants";

const logger = getLogger({ name: "api:auth:confirm-email" });

async function handler(req: NextRequest) {
    const controller = new AuthController();

    const { statusCode, response } = await controller.confirmEmail(req);
    const success = statusCode == STATUS_CODE.OK;
    logger.info(success ? response.message : response, success ? undefined : `Confirm email failed: ${response.message}`);

    return NextResponse.json(response, { status: statusCode })
}

export {
    handler as GET,
    handler as POST,
    handler as PUT
}
