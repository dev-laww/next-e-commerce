import ShippingMethodsController from "@controller/shipping-methods.controller";
import { NextRequest, NextResponse } from "next/server";
import { getLogger } from "@utils/logging";
import { STATUS_CODE } from "@lib/constants";

const logger = getLogger({ name: "api:shipping-methods:id:orders" });

async function handler(req: NextRequest, {params}: {params: { id: string } }) {
    const controller = new ShippingMethodsController();
    const { statusCode, response } = await controller.getShippingMethodOrders(req, params);
    const success = statusCode === STATUS_CODE.CREATED;

    logger.info(success ? response.message : response, success ? undefined : `Get shipping method orders failed: ${response.message}`);
    return NextResponse.json(response, { status: statusCode });
}


export {
    handler as GET
}
