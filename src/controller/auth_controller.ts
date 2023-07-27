import UserRepository from "@src/repository/user_repo";
import { User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import * as Constants from "@src/lib/constants";

export default class AuthController {
    userRepo = new UserRepository();

    async registerUser(req: NextApiRequest, res: NextApiResponse) {
        if (req.method !== 'POST')
            return res.status(Constants.STATUS_CODE.BAD_REQUEST)
                .json({message: 'Invalid request method'});

        // TODO: Validate request body
        const user = await this.userRepo.createUser(req.body as User)

        return res.status(Constants.STATUS_CODE.CREATED)
            .json({
                status: Constants.STATUS.SUCCESS,
                message: "User created successfully",
                data: user
            })
    }
}