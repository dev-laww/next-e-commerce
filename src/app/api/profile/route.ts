import ProfileController from "@controller/profile.controller";
import { NextRequest, NextResponse } from "next/server";
import Response from "@lib/http";

async function handler(req: NextRequest) {
    const controller = new ProfileController();

    let statusCode, response;

    switch (req.method) {
        case "GET":
            ({ statusCode, response } = await controller.getProfile(req));
            break;
        case "PUT":
            ({ statusCode, response } = await controller.updateProfile(req));
            break;
        default:
            ({ statusCode, response } = Response.methodNotAllowed);
    }

    return NextResponse.json(response, { status: statusCode });
}


export {
    handler as GET,
    handler as PUT
}
