import { NextRequest } from "next/server";

import Validators from "@lib/validator/logs.validator";
import Response from "@lib/http";
import { AllowPermitted, CheckError } from "@utils/decorator";
import { getDatabaseLogger } from "@utils/logging";

@AllowPermitted
@CheckError
export default class LogsController {
    private logger = getDatabaseLogger({ name: "controller:logs", class: "LogsController" });

    public async hello(req: NextRequest) {
        return Response.ok("Hello World");
    }
}
