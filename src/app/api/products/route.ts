import { type NextRequest, NextResponse } from "next/server";

import ProductsController from "@src/controller/products.controller";
import Response from "@src/lib/http";
import { getLogger } from "@utils/logging";
import { STATUS_CODE } from "@lib/constants";

const logger = getLogger({ name: "api:products" })
const controller = new ProductsController()

async function handler(req: NextRequest) {
    const method = req.method
    let statusCode, response, success;

    switch (method) {
        case "GET":
            ({ statusCode, response } = await controller.getProducts(req));
            success = statusCode == STATUS_CODE.OK;
            logger.info(success ? response.message : response, success ? undefined : `Get products failed: ${response.message}`);
            break;
        case "POST":
            ({ statusCode, response } = await controller.createProduct(req));
            success = statusCode == STATUS_CODE.CREATED;
            logger.info(success ? response.message : response, success ? undefined : `Create products failed: ${response.message}`);
            break;
        default:
            ({ statusCode, response } = Response.methodNotAllowed);
            logger.warn(`Method ${method} not supported`);
    }

    return NextResponse.json(response, { status: statusCode });
}


export {
    handler as GET,
    handler as POST
}
