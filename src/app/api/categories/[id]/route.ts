import { type NextRequest, NextResponse } from "next/server";

import CategoriesController from "@controller/categories.controller";
import Response from "@lib/http";
import { getLogger } from "@utils/logging";
import { STATUS_CODE } from "@lib/constants";

const logger = getLogger({ name: "api:categories" });

async function handler(req: NextRequest, { params }: { params: { id: string } }) {
    const controller = new CategoriesController();
    let statusCode, response, success;

    switch (req.method) {
        case "GET":
            ({ statusCode, response } = await controller.getCategory(req, params));
            success = statusCode === STATUS_CODE.OK;
            logger.info(success ? response.message : response, success ? undefined : `Get categories failed: ${response.message}`);
            break;
        case "PUT":
            ({ statusCode, response } = await controller.updateCategory(req, params));
            success = statusCode === STATUS_CODE.CREATED;
            logger.info(success ? response.message : response, success ? undefined : `Update category failed: ${response.message}`);
            break;
        case "DELETE":
            ({ statusCode, response } = await controller.deleteCategory(req, params));
            success = statusCode === STATUS_CODE.CREATED;
            logger.info(success ? response.message : response, success ? undefined : `Delete category failed: ${response.message}`);
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