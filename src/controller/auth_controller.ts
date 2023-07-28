import { NextApiRequest } from "next";
import { User } from "@prisma/client";

import z from "zod";

import * as Constants from "@src/lib/constants";
import { hash } from "@src/lib/utils/hashing";
import { UserSession } from "@src/lib/types";
import UserRepository from "@src/repository/user_repo";
import { generateAccessTooken, generateRefreshToken } from "@src/lib/utils/token";
import { objectToSnake } from "@src/lib/utils/string_case";

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

    async registerUser(req: NextApiRequest) {
        if (req.method !== 'POST')
            return {
                statusCode: Constants.STATUS_CODE.BAD_REQUEST,
                response: {
                    status: Constants.STATUS.FAILED,
                    message: "Invalid request method"
                }
            }

        const requestData = registerSchema.safeParse(req.body || {});

        if (!requestData.success) {
            return {
                statusCode: Constants.STATUS_CODE.BAD_REQUEST,
                response: {
                    status: Constants.STATUS.FAILED,
                    message: "Invalid request data",
                    data: requestData.error.errors
                }
            }
        }

        delete req.body.confirmPassword;

        const userExistsByEmail = await this.userRepo.getUserByEmail(req.body.email);
        const userExistsByUsername = await this.userRepo.getUserByUsername(req.body.username);

        if (userExistsByEmail || userExistsByUsername) {
            return {
                statusCode: Constants.STATUS_CODE.BAD_REQUEST,
                response: {
                    status: Constants.STATUS.FAILED,
                    message: "User already exists"
                }
            }
        }

        req.body.password = await hash(req.body.password);


        const user = await this.userRepo.createUser(objectToSnake(req.body) as User)

        const userSession: UserSession = {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            username: user.username,
            image_url: user.image_url
        }

        return {
            statusCode: Constants.STATUS_CODE.CREATED,
            response: {
                status: Constants.STATUS.SUCCESS,
                message: "User created successfully",
                data: {
                    ...userSession,
                    refresh_token: generateRefreshToken(userSession),
                    access_token: generateAccessTooken(userSession)
                }
            }
        }
    }
}