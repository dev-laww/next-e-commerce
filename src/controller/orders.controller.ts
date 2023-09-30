import { NextRequest } from "next/server";

import Validators from "@lib/validator/orders.validator";
import Response from "@lib/http";
import { AllowPermitted, CheckError } from "@utils/decorator";

@AllowPermitted
@CheckError
export default class OrdersController {
    private logger = getDatabaseLogger({ name: "controller:orders", class: "OrdersController" });

    public async hello(req: NextRequest) {
        return Response.ok("Hello World");
    }
}
