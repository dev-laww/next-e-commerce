import { NextRequest } from "next/server";

import Validators from "@lib/validator/variants.validator";
import Response from "@lib/http";
import { CheckError } from "@utils/decorator";

@CheckError
export default class VariantsController {
    public async hello(req: NextRequest) {
        return Response.ok("Hello World");
    }
}
