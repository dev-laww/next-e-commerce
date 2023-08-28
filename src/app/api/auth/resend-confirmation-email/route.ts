import { NextRequest, NextResponse } from "next/server";

import AuthController from "@controller/auth.controller";
import { getLogger } from "@utils/logging";

async function handler(req: NextRequest) {
    const logger = getLogger('api:auth:resend-confirmation-email');
    const controller = new AuthController();

    const {statusCode, response} = await controller.resendEmailConfirmation(req);
    await logger.info(statusCode == 200 ? response.message : `Resend confirmation email failed: ${response.message}`);

    return NextResponse.json(response, {status: statusCode});
}

export {
    handler as GET,
    handler as POST,
    handler as PUT
}
