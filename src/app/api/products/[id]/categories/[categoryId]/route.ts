import { type NextRequest, NextResponse } from "next/server";

import ProductsController from "@src/controller/products.controller";
import Response from "@src/lib/http";
import { getLogger } from "@utils/logging";
import { STATUS_CODE } from "@lib/constants";

const logger = getLogger({ name: "api:products:categories:id" })
const controller = new ProductsController()

async function handler(req: NextRequest, { params }: { params: { id: string, categoryId: string }}) {
    const method = req.method
    let statusCode, response, success;

    switch (method) {
        case "POST":
            ({ statusCode, response } = await controller.addCategory(req, params));
            success = statusCode == STATUS_CODE.OK;
            logger.info(success ? response.message : response, success ? undefined : `Add product category failed: ${response.message}`);
            break;
        case "DELETE":
            ({ statusCode, response } = await controller.deleteCategory(req, params));
            success = statusCode == STATUS_CODE.OK;
            logger.info(success ? response.message : response, success ? undefined : `Delete product category failed: ${response.message}`);
            break;
        default:
            ({ statusCode, response } = Response.methodNotAllowed);
            logger.warn(`Method ${method} not supported`);
    }

    return NextResponse.json(response, { status: statusCode });
}


export {
    handler as DELETE
}