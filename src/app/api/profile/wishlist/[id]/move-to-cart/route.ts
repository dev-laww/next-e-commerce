import ProfileController from "@controller/profile.controller";
import { NextRequest, NextResponse } from "next/server";
import { STATUS_CODE } from "@lib/constants";
import { getLogger } from "@utils/logging";

const logger = getLogger({ name: "api:profile:wishlist:id:move-to-cart" });

async function handler(req: NextRequest, { params }: { params: { id: string } }) {
    const controller = new ProfileController();
    const { statusCode, response } = await controller.moveWishlistItemToCart(req, params);
    const success = statusCode === STATUS_CODE.CREATED;

    logger.info(success ? response.message : response, success ? undefined : `Move to cart failed: ${response.message}`);
    return NextResponse.json(response, { status: statusCode });
}


export {
    handler as PUT
}
