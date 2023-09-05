import { type NextRequest, NextResponse } from "next/server";
import AccountsController from "@controller/accounts.controller";


export async function handler(req: NextRequest, { params }: { params: { id: string } }) {
    const controller = new AccountsController();

    const { statusCode, response } = await controller.getCart(req, params);

    return NextResponse.json(response, { status: statusCode });
}

export {
    handler as GET,
    handler as PUT,
    handler as DELETE,
    handler as PATCH,
    handler as POST
}

