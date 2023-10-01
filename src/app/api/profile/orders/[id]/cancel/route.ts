import ProfileController from "@controller/profile.controller";
import { NextRequest, NextResponse } from "next/server";
import { getLogger } from "@utils/logging";
import { STATUS_CODE } from "@lib/constants";

const logger = getLogger({ name: "api:profile:orders:id:cancel" });

async function handler(req: NextRequest, { params }: { params: { id: string } }) {
    const controller = new ProfileController();
    const { statusCode, response } = await controller.cancelOrder(req, params);
    const success = statusCode === STATUS_CODE.OK;

    logger.info(success ? response.message : response, success ? undefined : `Cancel order failed: ${response.message}`);
    return NextResponse.json(response, { status: statusCode });
}


export {
    handler as PUT
}