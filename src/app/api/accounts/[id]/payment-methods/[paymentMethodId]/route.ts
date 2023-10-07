import { type NextRequest, NextResponse } from "next/server";

import AccountsController from "@controller/accounts.controller";
import { getLogger } from "@utils/logging";
import { STATUS_CODE } from "@lib/constants";

const logger = getLogger({ name: "api:accounts:id:payment-methods:paymentMethodId" });

async function handler(req: NextRequest, { params }: { params: { id: string, paymentMethodId: string } }) {
    const controller = new AccountsController();
    const { statusCode, response } = await controller.getPaymentMethod(req, params);
    const success = statusCode == STATUS_CODE.OK;

    logger.info(success ? response.message : response, success ? undefined : `Get address failed: ${ response.message }`);
    return NextResponse.json(response, { status: statusCode })
}

export {
    handler as GET
}