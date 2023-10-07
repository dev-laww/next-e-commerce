import CouponsController from "@controller/coupons.controller";
import { NextRequest, NextResponse } from "next/server";
import Response from "@lib/http";
import { getLogger } from "@utils/logging";
import { STATUS_CODE } from "@lib/constants";

const logger = getLogger({ name: "api:coupons" });

async function handler(req: NextRequest) {
    const controller = new CouponsController();
    let statusCode, response, success;

    switch (req.method) {
        case "GET":
            ({ statusCode, response } = await controller.getCoupons(req));
            success = statusCode === STATUS_CODE.OK;
            logger.info(success ? response.message : response, success ? undefined : `Get coupons failed: ${ response.message }`);
            break;
        case "POST":
            ({ statusCode, response } = await controller.createCoupon(req));
            success = statusCode === STATUS_CODE.CREATED;
            logger.info(success ? response.message : response, success ? undefined : `Create coupon failed: ${ response.message }`);
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
