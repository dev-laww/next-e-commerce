import { type NextRequest, NextResponse } from "next/server";

import AuthController from "@controller/auth.controller";
import { getLogger } from "@utils/logging";
import { STATUS_CODE } from "@lib/constants";

const logger = getLogger({ name: "api:auth:refresh" });

async function handler(req: NextRequest) {
    const controller = new AuthController();

    const { statusCode, response } = await controller.refreshToken(req);
    const success = statusCode == STATUS_CODE.OK;
    logger.info(success ? response.message : `Refresh token failed: ${response.message}`, success ? undefined : `Refresh token failed: ${response.message}`);

    return NextResponse.json(response, { status: statusCode });
}

export {
    handler as GET,
    handler as POST,
    handler as PUT
}
