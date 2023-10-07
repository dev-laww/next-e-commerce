import OrdersController from "@controller/orders.controller";
import { NextRequest, NextResponse } from "next/server";
import { getLogger } from "@utils/logging";
import { STATUS_CODE } from "@lib/constants";

const logger = getLogger({ name: "api:orders:id:cancel" });

async function handler(req: NextRequest, { params }: { params: { id: string } }) {
    const controller = new OrdersController();
    const { statusCode, response } = await controller.cancelOrder(req, params);
    const success = statusCode === STATUS_CODE.CREATED;

    logger.info(success ? response.message : response, success ? undefined : `Cancel order failed: ${ response.message }`);
    return NextResponse.json(response, { status: statusCode });
}


export {
    handler as POST
}
