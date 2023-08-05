import { NextApiRequest, NextApiResponse } from "next";

import AuthController from "@controller/auth.controller";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const controller = new AuthController();

    const {statusCode, response} = await controller.signup(req);

    return res.status(statusCode).json(response);
}
