import { NextRequest, NextResponse } from "next/server";

import AuthController from "@controller/auth.controller";

async function handler(req: NextRequest) {
    const controller = new AuthController();

    const {statusCode, response} = await controller.resetPassword(req);

    return NextResponse.json(response, {status: statusCode});
}

export {
    handler as GET,
    handler as POST,
    handler as PUT
}
