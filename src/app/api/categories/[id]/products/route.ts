import { type NextRequest, NextResponse } from "next/server";

import CategoriesController from "@controller/categories.controller";
import { getLogger } from "@utils/logging";
import { STATUS_CODE } from "@lib/constants";

const logger = getLogger({ name: "api:categories:id:products" })

async function handler(req: NextRequest, { params }: { params: { id: string } }) {
    const controller = new CategoriesController()
    const { statusCode, response } = await controller.getProducts(req, params);
    const success = statusCode == STATUS_CODE.OK;

    logger.info(success ? response.message : response, success ? undefined : `Get products failed: ${response.message}`);
    return NextResponse.json(response, { status: statusCode });
}


export {
    handler as GET
}