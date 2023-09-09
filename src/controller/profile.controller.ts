import { NextRequest } from "next/server";

import Validators from "@lib/validator/profile.validator";
import Response from "@lib/http";
import { CheckError } from "@utils/decorator";

@CheckError
export default class ProfileController {
    public async hello(req: NextApiRequest) {
        return Response.ok("Hello World");
    }
}
