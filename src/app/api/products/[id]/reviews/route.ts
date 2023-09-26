import { type NextRequest, NextResponse } from "next/server";

import ProductsController from "@controller/products.controller";
import Response from "@src/lib/http";
import { getLogger } from "@utils/logging";
import { STATUS_CODE } from "@lib/constants";

const logger = getLogger({ name: "api:products:id:reviews" })

async function handler(req: NextRequest, { params }: { params: { id: string } }) {
    const controller = new ProductsController()
    const method = req.method
    let statusCode, response, success;

    switch (method) {
        case "GET":
            ({ statusCode, response } = await controller.getReviews(req, params));
            success = statusCode == STATUS_CODE.OK;
            logger.info(success ? response.message : response, success ? undefined : `Get product reviews failed: ${response.message}`);
            break;
        case "POST":
            ({ statusCode, response } = await controller.addReview(req, params));
            success = statusCode == STATUS_CODE.CREATED;
            logger.info(success ? response.message : response, success ? undefined : `Add product review failed: ${response.message}`);
            break;
        case "DELETE":
            ({ statusCode, response } = await controller.deleteReviews(req, params));
            success = statusCode == STATUS_CODE.OK;
            logger.info(success ? response.message : response, success ? undefined : `Delete product reviews failed: ${response.message}`);
            break;
        default:
            ({ statusCode, response } = Response.methodNotAllowed);
            logger.warn(`Method ${method} not supported`);
    }

    return NextResponse.json(response, { status: statusCode });
}


export {
    handler as GET,
    handler as POST,
    handler as DELETE
}
