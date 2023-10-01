import { NextRequest } from "next/server";

import Validators from "@lib/validator/shipping-methods.validator";
import Response from "@lib/http";
import { AllowPermitted, CheckError } from "@utils/decorator";
import { getDatabaseLogger } from "@utils/logging";

@AllowPermitted
@CheckError
export default class ShippingMethodsController {
    private logger = getDatabaseLogger({ name: "controller:shipping-methods", class: "ShippingMethodsController" });

    public async hello(req: NextRequest) {
        return Response.ok("Hello World");
    }
}
