import ProfileController from "@controller/profile.controller";
import { NextRequest, NextResponse } from "next/server";

async function handler(req: NextRequest, { params }: { params: { id: string } }) {
    const controller = new ProfileController();

    const { statusCode, response } = await controller.getOrder(req, params);

    return NextResponse.json(response, { status: statusCode });
}


export {
    handler as GET
}