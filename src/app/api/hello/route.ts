import { NextRequest, NextResponse } from "next/server";

import Response from "@lib/http";
import Permission from "@utils/api";

@Permission.classDecorator
class Hello {
    async sayHello(req: NextRequest) {
        return Response.success("Hello world!")
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