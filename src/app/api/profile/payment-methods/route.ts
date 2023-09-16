import ProfileController from "@controller/profile.controller";
import { NextRequest, NextResponse } from "next/server";
import Response from "@lib/http";

async function handler(req: NextRequest) {
    const controller = new ProfileController();

    let statusCode, response;

    switch (req.method) {
        case "GET":
            ({ statusCode, response } = await controller.getPaymentMethods(req));
            break;
        case "POST":
            ({ statusCode, response } = await controller.addPaymentMethod(req));
            break;
        case "DELETE":
            ({ statusCode, response } = await controller.deletePaymentMethods(req));
            break;
        default:
            ({ statusCode, response } = Response.methodNotAllowed);
    }

    return NextResponse.json(response, { status: statusCode });
}


export {
    handler as GET,
    handler as POST,
    handler as DELETE
}
