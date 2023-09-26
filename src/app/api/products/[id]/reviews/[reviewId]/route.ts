import { type NextRequest, NextResponse } from "next/server";

import ProductsController from "@src/controller/products.controller";
import Response from "@src/lib/http";
import { getLogger } from "@utils/logging";
import { STATUS_CODE } from "@lib/constants";

const logger = getLogger({ name: "api:products:id:reviews:reviewId" })

async function handler(req: NextRequest, { params }: { params: { id: string, reviewId: string } }) {
    const controller = new ProductsController();
    const method = req.method
    let statusCode, response, success;

    switch (method) {
        case "PUT":
            ({ statusCode, response } = await controller.updateReview(req, params));
            success = statusCode == STATUS_CODE.OK;
            logger.info(success ? response.message : response, success ? undefined : `Update product reviews failed: ${response.message}`);
            break;
        case "DELETE":
            ({ statusCode, response } = await controller.deleteReview(req, params));
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
    handler as PUT,
    handler as DELETE
}
