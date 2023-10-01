import VariantsController from "@controller/variants.controller";
import { NextRequest, NextResponse } from "next/server";
import Response from "@lib/http";
import { getLogger } from "@utils/logging";
import { STATUS_CODE } from "@lib/constants";

const logger = getLogger({ name: "api:variants:id:reviews:review-id" });

async function handler(req: NextRequest, { params }: { params: { id: string, reviewId: string } }) {
    const controller = new VariantsController();
    let statusCode, response, success;

    switch (req.method) {
        case "GET":
            ({ statusCode, response } = await controller.getReview(req, params));
            success = statusCode === STATUS_CODE.OK;
            logger.info(success ? response.message : response, success ? undefined : `Get variant review failed: ${response.message}`);
            break;
        case "PUT":
            ({ statusCode, response } = await controller.updateReview(req, params));
            success = statusCode === STATUS_CODE.OK;
            logger.info(success ? response.message : response, success ? undefined : `Update variant review failed: ${response.message}`);
            break;
        case "DELETE":
            ({ statusCode, response } = await controller.deleteReview(req, params));
            success = statusCode === STATUS_CODE.OK;
            logger.info(success ? response.message : response, success ? undefined : `Delete variant review failed: ${response.message}`);
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
