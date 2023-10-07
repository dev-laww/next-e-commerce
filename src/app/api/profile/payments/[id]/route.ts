import ProfileController from "@controller/profile.controller";
import { NextRequest, NextResponse } from "next/server";
import { getLogger } from "@utils/logging";
import { STATUS_CODE } from "@lib/constants";

const logger = getLogger({ name: "api:profile:payments:id" });

async function handler(req: NextRequest, { params }: { params: { id: string } }) {
    const controller = new ProfileController();
    const { statusCode, response } = await controller.getPayment(req, params);
    const success = statusCode === STATUS_CODE.OK;

    logger.info(success ? response.message : response, success ? undefined : `Get payment failed: ${ response.message }`);
    return NextResponse.json(response, { status: statusCode });
}


export {
    handler as GET
}
