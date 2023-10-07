import CouponsController from "@controller/coupons.controller";
import { NextRequest, NextResponse } from "next/server";
import Response from "@lib/http";
import { getLogger } from "@utils/logging";
import { STATUS_CODE } from "@lib/constants";

const logger = getLogger({ name: "api:coupons:code" });

async function handler(req: NextRequest, { params }: { params: { code: string } }) {
    const controller = new CouponsController();
    let statusCode, response, success;

    switch (req.method) {
        case "GET":
            ({ statusCode, response } = await controller.getCoupon(req, params));
            success = statusCode === STATUS_CODE.OK;
            logger.info(success ? response.message : response, success ? undefined : `Get coupon failed: ${ response.message }`);
            break;
        case "PUT":
            ({ statusCode, response } = await controller.updateCoupon(req, params));
            success = statusCode === STATUS_CODE.OK;
            logger.info(success ? response.message : response, success ? undefined : `Update coupon failed: ${ response.message }`);
            break;
        case "DELETE":
            ({ statusCode, response } = await controller.deleteCoupon(req, params));
            success = statusCode === STATUS_CODE.OK;
            logger.info(success ? response.message : response, success ? undefined : `Delete coupon failed: ${ response.message }`);
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
