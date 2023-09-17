import ProfileController from "@controller/profile.controller";
import { NextRequest, NextResponse } from "next/server";

async function handler(req: NextRequest) {
    const controller = new ProfileController();

    const { statusCode, response } = await controller.checkout(req);

    return NextResponse.json(response, { status: statusCode });
}


export {
    handler as POST
}
