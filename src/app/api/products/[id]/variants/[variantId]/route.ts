import { type NextRequest, NextResponse } from "next/server";

import ProductsController from "@src/controller/products.controller";
import Response from "@src/lib/http";
import { getLogger } from "@utils/logging";
import { STATUS_CODE } from "@lib/constants";

const logger = getLogger({ name: "api:products:id:variants:variantId" })

async function handler(req: NextRequest, { params }: { params: { id: string, variantId: string } }) {
    const controller = new ProductsController()
    const method = req.method
    let statusCode, response, success;

    switch (method) {
        case "PUT":
            ({ statusCode, response } = await controller.updateVariant(req, params));
            success = statusCode == STATUS_CODE.OK;
            logger.info(success ? response.message : response, success ? undefined : `Update product variant failed: ${response.message}`);
            break;
        case "DELETE":
            ({ statusCode, response } = await controller.deleteVariant(req, params));
            logger.info(success ? response.message : response, success ? undefined : `Delete product variant failed: ${response.message}`);
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
