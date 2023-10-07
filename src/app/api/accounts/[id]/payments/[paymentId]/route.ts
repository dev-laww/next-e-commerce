import { type NextRequest, NextResponse } from "next/server";

import AccountsController from "@controller/accounts.controller";
import { getLogger } from "@utils/logging";
import { STATUS_CODE } from "@lib/constants";

const logger = getLogger({ name: "api:accounts:id:payments:paymentId" });

async function handler(req: NextRequest, { params }: { params: { id: string, paymentId: string } }) {
    const controller = new AccountsController();

    const { statusCode, response } = await controller.getPayment(req, params);
    const success = statusCode == STATUS_CODE.OK;
    logger.info(success ? response.message : response, success ? undefined : `Get wishlist item failed: ${ response.message }`);

    return NextResponse.json(response, { status: statusCode })
}

export {
    handler as GET
}