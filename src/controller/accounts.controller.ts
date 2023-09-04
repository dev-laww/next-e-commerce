import { NextRequest } from "next/server";

import Validators from "@lib/validator/accounts.validator";
import Response from "@lib/http";
import { CheckError } from "@utils/decorator";

@CheckError
export default class AccountsController {
  async hello(req: NextRequest) {
    return Response.ok("Hello World", {});
  }
}
