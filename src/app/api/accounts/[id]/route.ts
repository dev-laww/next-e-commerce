import { type NextRequest, NextResponse } from "next/server";

import AccountsController from "@controller/accounts.controller";
import { STATUS_CODE } from "@lib/constants";
import { getLogger } from "@utils/logging";

const logger = getLogger({ name: "api:accounts:id" });


export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const controller = new AccountsController();

    const { statusCode, response } = await controller.getAccount(req, params);
    const success = statusCode == STATUS_CODE.OK;

    logger.info(success ? response.message : response, success ? undefined : `Get account failed: ${response.message}`);

    return NextResponse.json(response, { status: statusCode })
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    const controller = new AccountsController();

    const { statusCode, response } = await controller.updateAccount(req, params);
    const success = statusCode == STATUS_CODE.OK;

    logger.info(success ? response.message : response, success ? undefined : `Update account failed: ${response.message}`);

    return NextResponse.json(response, { status: statusCode })
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    const controller = new AccountsController();

    const { statusCode, response } = await controller.deleteAccount(req, params);
    const success = statusCode == STATUS_CODE.OK;

    logger.info(success ? response.message : response, success ? undefined : `Delete account failed: ${response.message}`);

    return NextResponse.json(response, { status: statusCode })
}

