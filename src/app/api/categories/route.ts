import { type NextRequest, NextResponse } from "next/server";

import CategoriesController from "@controller/categories.controller";
import Response from "@lib/http";
import { getLogger } from "@utils/logging";
import { STATUS_CODE } from "@lib/constants";

const logger = getLogger({ name: "api:categories" });

async function handler(req: NextRequest) {
    const controller = new CategoriesController();
    let statusCode, response, success;

    switch (req.method) {
        case "GET":
            ({ statusCode, response } = await controller.getCategories(req));
            success = statusCode === STATUS_CODE.OK;
            logger.info(success ? response.message : response, success ? undefined : `Get categories failed: ${ response.message }`);
            break;
        case "POST":
            ({ statusCode, response } = await controller.createCategory(req));
            success = statusCode === STATUS_CODE.CREATED;
            logger.info(success ? response.message : response, success ? undefined : `Create category failed: ${ response.message }`);
            break;
        default:
            ({ statusCode, response } = Response.methodNotAllowed);
    }

    return NextResponse.json(response, { status: statusCode });
}


export {
    handler as GET,
    handler as POST
}
