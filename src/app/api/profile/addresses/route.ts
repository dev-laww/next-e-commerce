import ProfileController from "@controller/profile.controller";
import { NextRequest, NextResponse } from "next/server";
import Response from "@lib/http";
import { getLogger } from "@utils/logging";
import { STATUS_CODE } from "@lib/constants";

const logger = getLogger({ name: "api:profile:address" });

async function handler(req: NextRequest) {
    const controller = new ProfileController();

    let statusCode, response, success;

    switch (req.method) {
        case "GET":
            ({ statusCode, response } = await controller.getAddresses(req));
            success = statusCode === STATUS_CODE.OK;
            logger.info(success ? response.message : response, success ? undefined : `Get addresses failed: ${response.message}`);
            break;
        case "POST":
            ({ statusCode, response } = await controller.addAddress(req));
            success = statusCode === STATUS_CODE.CREATED;
            logger.info(success ? response.message : response, success ? undefined : `Add address failed: ${response.message}`);
            break;
        case "DELETE":
            ({ statusCode, response } = await controller.deleteAddresses(req));
            success = statusCode === STATUS_CODE.OK;
            logger.info(success ? response.message : response, success ? undefined : `Delete addresses failed: ${response.message}`);
            break;
        default:
            ({ statusCode, response } = Response.methodNotAllowed);
    }

    return NextResponse.json(response, { status: statusCode });
}


export {
    handler as GET,
    handler as POST,
    handler as DELETE
}
