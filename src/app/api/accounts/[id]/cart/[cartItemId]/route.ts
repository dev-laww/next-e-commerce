import { type NextRequest, NextResponse } from "next/server";

import AccountsController from "@controller/accounts.controller";
import { getLogger } from "@utils/logging";
import { STATUS_CODE } from "@lib/constants";

const logger = getLogger({ name: "api:accounts:id:cart:cartItemId" });

async function handler(req: NextRequest, { params }: { params: { id: string, cartItemId: string } }) {
    const controller = new AccountsController();

    const { statusCode, response } = await controller.getCartItem(req, params);
    const success = statusCode == STATUS_CODE.OK;
    logger.info(success ? response.message : response, success ? undefined : `Get cart item failed: ${response.message}`);

    return NextResponse.json(response, { status: statusCode })
}

export {
    handler as GET
}