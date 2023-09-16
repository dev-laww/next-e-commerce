import ProfileController from "@controller/profile.controller";
import { NextRequest, NextResponse } from "next/server";
import Response from "@lib/http";

async function handler(req: NextRequest, { params }: { params: { id: string } }) {
    const controller = new ProfileController();

    let statusCode, response;

    switch (req.method) {
        case "GET":
            ({ statusCode, response } = await controller.getPaymentMethod(req, params));
            break;
        case "PUT":
            ({ statusCode, response } = await controller.updatePaymentMethod(req, params));
            break;
        case "DELETE":
            ({ statusCode, response } = await controller.deletePaymentMethod(req, params));
            break;
        default:
            ({ statusCode, response } = Response.methodNotAllowed);
    }

    return NextResponse.json(response, { status: statusCode });
}


export {
    handler as GET,
    handler as PUT,
    handler as DELETE
}

