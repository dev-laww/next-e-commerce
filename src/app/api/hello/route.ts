import { NextRequest, NextResponse } from "next/server";

import Response from "@lib/http";

class Hello {
    async sayHello(req: NextRequest) {
        await req.json();

        return Response.ok("Hello world!")
    }
}

async function handler(req: NextRequest) {
    const controller = new Hello();

    const {statusCode, response} = await controller.sayHello(req);

    return NextResponse.json(response, {status: statusCode});
}

export {
    handler as GET,
    handler as POST,
    handler as PUT
}