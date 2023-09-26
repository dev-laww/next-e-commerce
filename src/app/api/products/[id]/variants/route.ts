import { type NextRequest, NextResponse } from "next/server";

import ProductsController from "@src/controller/products.controller";
import Response from "@src/lib/http";
import { getLogger } from "@utils/logging";
import { STATUS_CODE } from "@lib/constants";

const logger = getLogger({ name: "api:products:id:variants" })
const controller = new ProductsController()

async function handler(req: NextRequest, { params }: { params: { id: string } }) {
    const method = req.method
    let statusCode, response, success;

    switch (method) {
        case "GET":
            ({ statusCode, response } = await controller.getVariants(req, params));
            success = statusCode == STATUS_CODE.OK;
            logger.info(success ? response.message : response, success ? undefined : `Get product variants failed: ${response.message}`);
            break;
        case "POST":
            ({ statusCode, response } = await controller.addVariant(req, params));
            success = statusCode == STATUS_CODE.CREATED;
            logger.info(success ? response.message : response, success ? undefined : `Add product variant failed: ${response.message}`);
            break;
        case "DELETE":
            ({ statusCode, response } = await controller.deleteVariants(req, params));
            success = statusCode == STATUS_CODE.OK;
            logger.info(success ? response.message : response, success ? undefined : `Delete product variants failed: ${response.message}`);
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
