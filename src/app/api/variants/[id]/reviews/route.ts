import VariantsController from "@controller/variants.controller";
import { NextRequest, NextResponse } from "next/server";
import Response from "@lib/http";
import { getLogger } from "@utils/logging";
import { STATUS_CODE } from "@lib/constants";

const logger = getLogger({ name: "api:variants:id:reviews" });

async function handler(req: NextRequest, { params }: { params: { id: string } }) {
    const controller = new VariantsController();
    let statusCode, response, success;

    switch (req.method) {
        case "GET":
            ({ statusCode, response } = await controller.getReviews(req, params));
            success = statusCode === STATUS_CODE.OK;
            logger.info(success ? response.message : response, success ? undefined : `Get variant reviews failed: ${ response.message }`);
            break;
        case "POST":
            ({ statusCode, response } = await controller.createReview(req, params));
            success = statusCode === STATUS_CODE.CREATED;
            logger.info(success ? response.message : response, success ? undefined : `Create variant review failed: ${ response.message }`);
            break;
        case "DELETE":
            ({ statusCode, response } = await controller.deleteReviews(req, params));
            success = statusCode === STATUS_CODE.OK;
            logger.info(success ? response.message : response, success ? undefined : `Delete variant reviews failed: ${ response.message }`);
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
