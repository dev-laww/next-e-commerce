import ShippingMethodsController from "@controller/shipping-methods.controller";
import { NextRequest, NextResponse } from "next/server";
import Response from "@lib/http";
import { getLogger } from "@utils/logging";
import { STATUS_CODE } from "@lib/constants";

const logger = getLogger({ name: "api:shipping-methods" });

async function handler(req: NextRequest) {
    const controller = new ShippingMethodsController();
    let statusCode, response, success;

    switch (req.method) {
        case "GET":
            ({ statusCode, response } = await controller.getShippingMethods(req));
            success = statusCode === STATUS_CODE.OK;
            logger.info(success ? response.message : response, success ? undefined : `Get shipping methods failed: ${response.message}`);
            break;
        case "POST":
            ({ statusCode, response } = await controller.createShippingMethod(req));
            success = statusCode === STATUS_CODE.CREATED;
            logger.info(success ? response.message : response, success ? undefined : `Create shipping method failed: ${response.message}`);
            break;
        default:
            ({ statusCode, response } = Response.methodNotAllowed);
    }

    return NextResponse.json(response, { status: statusCode });
}


export {
    handler as GET,
    handler as POST
}
