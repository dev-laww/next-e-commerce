import ProfileController from "@controller/profile.controller";
import { NextRequest, NextResponse } from "next/server";
import { STATUS_CODE } from "@lib/constants";
import { getLogger } from "@utils/logging";

const logger = getLogger({ name: "api:profile:payments" });

async function handler(req: NextRequest) {
    const controller = new ProfileController();

    const { statusCode, response } = await controller.getPayments(req);
    const success = statusCode === STATUS_CODE.OK;
    logger.info(success ? response.message : response, success ? undefined : `Get payments failed: ${response.message}`);

    return NextResponse.json(response, { status: statusCode });
}


export {
    handler as GET
}
