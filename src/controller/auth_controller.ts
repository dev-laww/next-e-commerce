import { NextApiRequest } from "next";
import { User } from "@prisma/client";

import * as Constants from "@lib/constants";
import { hash, compare } from "@utils/hashing";
import { UserSession } from "@lib/types";
import UserRepository from "@repository/user_repo";
import {
    generateAccessToken, verifyAccessToken,
    generateRefreshToken, verifyRefreshToken,
    generateRandomToken
} from "@src/lib/utils/token";
import { objectToSnake } from "@src/lib/utils/string_case";
import {
    registerSchema,
    loginSchema,
    confirmEmailSchema,
    refreshTokenSchema
} from "@lib/validator/auth";


export default class AuthController {
    userRepo = new UserRepository();

    async signUp(req: NextApiRequest) {
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

        const token = generateRandomToken();
        const confirmationToken = await this.userRepo.generateTokenOTP(
            user.id,
            token,
            Constants.TOKEN_TYPE.EMAIL_CONFIRMATION_TOKEN
        );
        // TODO: Send confirmation email

        return {
            statusCode: Constants.STATUS_CODE.CREATED,
            response: {
                status: Constants.STATUS.SUCCESS,
                message: "User created successfully",
                data: {
                    ...userSession,
                    refresh_token: generateRefreshToken(userSession),
                    access_token: generateAccessToken(userSession)
                }
            }
        }
    }

    async login(req: NextApiRequest) {
        if (req.method !== 'POST')
            return {
                statusCode: Constants.STATUS_CODE.BAD_REQUEST,
                response: {
                    status: Constants.STATUS.FAILED,
                    message: "Invalid request method"
                }
            }

        const requestData = loginSchema.safeParse(req.body || {});

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

        let user = await this.userRepo.getUserByEmail(req.body.email);

        if (!user) {
            user = await this.userRepo.getUserByUsername(req.body.email);

            if (!user) {
                return {
                    statusCode: Constants.STATUS_CODE.UNAUTHORIZED,
                    response: {
                        status: Constants.STATUS.FAILED,
                        message: "Invalid username or email"
                    }
                }
            }
        }

        const isPasswordValid = await compare(req.body.password, user.password);

        if (!isPasswordValid) {
            return {
                statusCode: Constants.STATUS_CODE.UNAUTHORIZED,
                response: {
                    status: Constants.STATUS.FAILED,
                    message: "Invalid password"
                }
            }
        }

        const userSession: UserSession = {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            username: user.username,
            image_url: user.image_url
        }

        return {
            statusCode: Constants.STATUS_CODE.SUCCESS,
            response: {
                status: Constants.STATUS.SUCCESS,
                message: "User logged in successfully",
                data: {
                    ...userSession,
                    refresh_token: generateRefreshToken(userSession),
                    access_token: generateAccessToken(userSession)
                }
            }
        }
    }

    // TODO: make this accept otp
    async confirmEmail(req: NextApiRequest) {
        if (req.method !== 'POST')
            return {
                statusCode: Constants.STATUS_CODE.BAD_REQUEST,
                response: {
                    status: Constants.STATUS.FAILED,
                    message: "Invalid request method"
                }
            }

        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return {
                statusCode: Constants.STATUS_CODE.UNAUTHORIZED,
                response: {
                    status: Constants.STATUS.FAILED,
                    message: "Invalid token"
                }
            }
        }

        let data: UserSession

        try {
            data = await verifyAccessToken(token);
        } catch (error) {
            return {
                statusCode: Constants.STATUS_CODE.UNAUTHORIZED,
                response: {
                    status: Constants.STATUS.FAILED,
                    message: "Invalid token"
                }
            }
        }

        const requestData = confirmEmailSchema.safeParse(req.body || {});

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

        const verifyToken = await this.userRepo.verifyTokenOTP(
            data.id,
            requestData.data.token,
            Constants.TOKEN_TYPE.EMAIL_CONFIRMATION_TOKEN
        );

        if (!verifyToken) {
            return {
                statusCode: Constants.STATUS_CODE.UNAUTHORIZED,
                response: {
                    status: Constants.STATUS.FAILED,
                    message: "Invalid token"
                }
            }
        }

        const user = await this.userRepo.getUserById(data.id);

        if (!user) {
            return {
                statusCode: Constants.STATUS_CODE.UNAUTHORIZED,
                response: {
                    status: Constants.STATUS.FAILED,
                    message: "Invalid token"
                }
            }
        }

        if (user.confirmed) {
            return {
                statusCode: Constants.STATUS_CODE.BAD_REQUEST,
                response: {
                    status: Constants.STATUS.FAILED,
                    message: "Email already confirmed"
                }
            }
        }

        await this.userRepo.updateUser(user.id, {confirmed: true});

        return {
            statusCode: Constants.STATUS_CODE.SUCCESS,
            response: {
                status: Constants.STATUS.SUCCESS,
                message: "Email confirmed successfully"
            }
        }
    }
}