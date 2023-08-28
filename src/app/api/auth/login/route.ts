import { NextRequest, NextResponse } from "next/server";

import AuthController from "@controller/auth.controller";
import { getLogger } from "@utils/logging";

const logger = getLogger('api:auth:login');

async function handler(req: NextRequest) {
    const controller = new AuthController();

    const {statusCode, response} = await controller.login(req);
    await logger.info(statusCode == 200 ? `${response.data.username} logged in` : `Login failed: ${response.message}`);

    return NextResponse.json(response, {status: statusCode})
}


export {
    handler as GET,
    handler as POST,
    handler as PUT
}
