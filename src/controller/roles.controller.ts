import { NextRequest } from "next/server";

import Validators from "@lib/validator/roles.validator";
import Response from "@lib/http";
import { CheckError } from "@utils/decorator";

@CheckError
export default class RolesController {
    public async hello(req: NextRequest) {
        return Response.ok("Hello World");
    }
}
