import ShippingMethodsController from "@controller/shipping-methods.controller";
import { NextRequest, NextResponse } from "next/server";
import Response from "@lib/http";
import { getLogger } from "@utils/logging";
import { STATUS_CODE } from "@lib/constants";

const logger = getLogger({ name: "api:shipping-methods:id" });

async function handler(req: NextRequest, { params }: { params: { id: string } }) {
    const controller = new ShippingMethodsController();
    let statusCode, response, success;

    switch (req.method) {
        case "GET":
            ({ statusCode, response } = await controller.getShippingMethod(req, params));
            success = statusCode === STATUS_CODE.OK;
            logger.info(success ? response.message : response, success ? undefined : `Get shipping method failed: ${response.message}`);
            break;
        case "PUT":
            ({ statusCode, response } = await controller.updateShippingMethod(req, params));
            success = statusCode === STATUS_CODE.OK;
            logger.info(success ? response.message : response, success ? undefined : `Update shipping method failed: ${response.message}`);
            break;
        case "DELETE":
            ({ statusCode, response } = await controller.deleteShippingMethod(req, params));
            success = statusCode === STATUS_CODE.OK;
            logger.info(success ? response.message : response, success ? undefined : `Delete shipping method failed: ${response.message}`);
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
