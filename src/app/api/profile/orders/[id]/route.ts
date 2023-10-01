import ProfileController from "@controller/profile.controller";
import { NextRequest, NextResponse } from "next/server";
import { getLogger } from "@utils/logging";
import { STATUS_CODE } from "@lib/constants";

const logger = getLogger({ name: "api:profile:orders:id" });

async function handler(req: NextRequest, { params }: { params: { id: string } }) {
    const controller = new ProfileController();
    const { statusCode, response } = await controller.getOrder(req, params);
    const success = statusCode === STATUS_CODE.OK;

    logger.info(success ? response.message : response, success ? undefined : `Get order failed: ${response.message}`);
    return NextResponse.json(response, { status: statusCode });
}


export {
    handler as GET
}