import { NextRequest, NextResponse } from "next/server";

async function handler(req: NextRequest) {
    return NextResponse.json({message: "Hello world!"})
}

export {
    handler as GET,
    handler as POST,
    handler as PUT
}