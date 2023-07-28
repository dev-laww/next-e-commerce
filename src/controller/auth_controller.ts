import { NextApiRequest, NextApiResponse } from "next";
import { User } from "@prisma/client";

import z from "zod";

import * as Constants from "@src/lib/constants";
import UserRepository from "@src/repository/user_repo";
import { hash } from "@src/lib/utils/hashing";

const registerSchema = z.object({
    "firstName": z.string({ required_error: "First name is required" })
        .min(3, "First name must be at least 3 characters")
        .max(50, "First name must be at most 50 characters"),
    "lastName": z.string({ required_error: "Last name is required"})
        .min(3, "Last name must be at least 3 characters")
        .max(50, "Last name must be at most 50 characters"),
    "email": z.string({required_error: "Email is required"})
        .email("Invalid email address"),
    "imageUrl": z.optional(z.string().url("Invalid image url")),
    "password": z.string({ required_error: "Password is required"})
        .min(8, "Password must be at least 8 characters")
        .max(50, "Password must be at most 50 characters"),
    "confirmPassword": z.string({ required_error: "Confirm password is required"})
        .min(8, "Password must be at least 8 characters")
        .max(50, "Password must be at most 50 characters"),
})


export default class AuthController {
    userRepo = new UserRepository();

    async registerUser(req: NextApiRequest, res: NextApiResponse) {
        if (req.method !== 'POST')
            return res.status(Constants.STATUS_CODE.BAD_REQUEST)
                .json({message: 'Invalid request method'});

        const requestData = registerSchema.safeParse(req.body || {});

        if (!requestData.success) {
            return res.status(Constants.STATUS_CODE.BAD_REQUEST)
                .json({
                    status: Constants.STATUS.FAILED,
                    message: Constants.ERROR_CODE.VALIDATION_ERROR,
                    data: requestData.error?.errors
                })
        }

        delete req.body.confirmPassword;

        const userExistsByEmail = await this.userRepo.getUserByEmail(req.body.email);
        const userExistsByUsername = await this.userRepo.getUserByUsername(req.body.username);

        if (userExistsByEmail || userExistsByUsername) {
            return res.status(Constants.STATUS_CODE.BAD_REQUEST)
                .json({
                    status: Constants.STATUS.FAILED,
                    message: "Email or username already exists",
                    data: null
                })
        }

        req.body.password = await hash(req.body.password);

        // TODO: implement jwt
        const user = await this.userRepo.createUser(req.body as User)

        delete req.body.password;


        return res.status(Constants.STATUS_CODE.CREATED)
            .json({
                status: Constants.STATUS.SUCCESS,
                message: "User created successfully",
                data: {
                    ...req.body
                }
            })
    }
}