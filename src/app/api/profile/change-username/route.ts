import ProfileController from "@controller/profile.controller";
import { NextRequest, NextResponse } from "next/server";
import { getLogger } from "@utils/logging";
import { STATUS_CODE } from "@lib/constants";

const logger = getLogger({ name: "api:profile:change-username" });

async function handler(req: NextRequest) {
    const controller = new ProfileController();
    const { statusCode, response } = await controller.updateUsername(req);
    const success = statusCode === STATUS_CODE.OK;

    logger.info(success ? response.message : response, success ? undefined : `Update username failed: ${response.message}`);
    return NextResponse.json(response, { status: statusCode });
}


export {
    handler as PUT
}
