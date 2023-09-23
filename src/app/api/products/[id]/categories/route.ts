import { type NextRequest, NextResponse } from "next/server";

import ProductsController from "@src/controller/products.controller";
import { getLogger } from "@utils/logging";
import { STATUS_CODE } from "@lib/constants";

const logger = getLogger({ name: "api:products:categories" })
const controller = new ProductsController()

async function handler(req: NextRequest, { params }: { params: { id: string }}) {
    let statusCode, response, success;

    ({ statusCode, response } = await controller.getCategories(req, params));
    success = statusCode == STATUS_CODE.OK;
    logger.info(success ? response.message : response, success ? undefined : `Get product categories failed: ${response.message}`);

    return NextResponse.json(response, { status: statusCode });
}


export {
    handler as GET
}