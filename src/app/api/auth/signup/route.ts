import { type NextRequest, NextResponse } from "next/server";

import AuthController from "@controller/auth.controller";
import { STATUS_CODE } from "@lib/constants";
import { getLogger } from "@utils/logging";

const logger = getLogger({ name: "api:auth:confirm-email" });

async function handler(req: NextRequest) {
    const controller = new AuthController();
    const { statusCode, response } = await controller.signup(req);
    const success = statusCode == STATUS_CODE.CREATED;

    logger.info(success ? response.message : response, success ? undefined : `Signup failed: ${ response.message }`);

    return NextResponse.json(response, { status: statusCode })
}

export {
    handler as GET,
    handler as POST,
    handler as PUT
}
