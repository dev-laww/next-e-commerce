import {NextRequest, NextResponse} from "next/server";
import { getLogger } from "@lib/utils/logging";

async function handler(req: NextRequest) {
    const logger = getLogger("hello")
    logger.info("Hello World!")
    return NextResponse.json({message: "Hello World!"})
}

export {
    handler as GET,
    handler as POST,
    handler as PUT
}