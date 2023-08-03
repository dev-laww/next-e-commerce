import { NextApiRequest, NextApiResponse } from "next";

import AuthController from "@controller/auth_controller";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const controller = new AuthController();

    const {statusCode, response} = await controller.confirmResetPassword(req);

    return res.status(statusCode).json(response);
}
