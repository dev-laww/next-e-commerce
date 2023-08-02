import { NextApiRequest } from "next";
import { User } from "@prisma/client";

import * as Constants from "@lib/constants";
import { hash, compare } from "@utils/hashing";
import { UserSession } from "@lib/types";
import UserRepository from "@repository/user_repo";
import {
    generateAccessToken,
    generateRefreshToken, verifyRefreshToken,
    generateRandomToken, generateOTP
} from "@src/lib/utils/token";
import { objectToSnake } from "@src/lib/utils/string_case";
import Validators from "@lib/validator/auth";


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

        const requestData = Validators.registerSchema.safeParse(req.body || {});

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

        const requestData = Validators.loginSchema.safeParse(req.body || {});

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
    async resetPassword(req: NextApiRequest) {
        if (req.method !== 'POST')
            return {
                statusCode: Constants.STATUS_CODE.BAD_REQUEST,
                response: {
                    status: Constants.STATUS.FAILED,
                    message: "Invalid request method"
                }
            }

        const requestData = resetPasswordSchema.safeParse(req.body || {});

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

        let user = await this.userRepo.getUserByEmail(requestData.data.email);

        if (!user) {
            user = await this.userRepo.getUserByUsername(requestData.data.email);

            if (!user) return {
                statusCode: Constants.STATUS_CODE.BAD_REQUEST,
                response: {
                    status: Constants.STATUS.FAILED,
                    message: "User does not exist"
                }
            }
        }

        const token = generateRandomToken();

        const resetPasswordToken = await this.userRepo.generateTokenOTP(
            user.id,
            token,
            Constants.TOKEN_TYPE.PASSWORD_RESET_TOKEN
        );

        return {
            statusCode: Constants.STATUS_CODE.SUCCESS,
            response: {
                status: Constants.STATUS.SUCCESS,
                message: "Password reset link has been sent to email"
            }
        }
    }

    async confirmResetPassword(req: NextApiRequest) {
        if (req.method !== 'POST')
            return {
                statusCode: Constants.STATUS_CODE.BAD_REQUEST,
                response: {
                    status: Constants.STATUS.FAILED,
                    message: "Invalid request method"
                }
            }


        const requestData = confirmResetPasswordSchema.safeParse(req.body || {});

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

        const {success, data} = await this.userRepo.verifyTokenOTP(
            requestData.data.token,
            Constants.TOKEN_TYPE.PASSWORD_RESET_TOKEN
        );

        if (!success) {
            return {
                statusCode: Constants.STATUS_CODE.UNAUTHORIZED,
                response: {
                    status: Constants.STATUS.FAILED,
                    message: "Invalid token"
                }
            }
        }

        if (data.confirmed) {
            return {
                statusCode: Constants.STATUS_CODE.BAD_REQUEST,
                response: {
                    status: Constants.STATUS.FAILED,
                    message: "Email already confirmed"
                }
            }
        }

        await this.userRepo.changePassword(data.id, requestData.data.password);

        return {
            statusCode: Constants.STATUS_CODE.SUCCESS,
            response: {
                status: Constants.STATUS.SUCCESS,
                message: "Password changed successfully"
            }
        }
    }

    async confirmEmail(req: NextApiRequest) {
        if (req.method !== 'POST')
            return {
                statusCode: Constants.STATUS_CODE.BAD_REQUEST,
                response: {
                    status: Constants.STATUS.FAILED,
                    message: "Invalid request method"
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

        const {success, data} = await this.userRepo.verifyTokenOTP(
            requestData.data.token,
            Constants.TOKEN_TYPE.EMAIL_CONFIRMATION_TOKEN
        );

        if (!success) {
            return {
                statusCode: Constants.STATUS_CODE.UNAUTHORIZED,
                response: {
                    status: Constants.STATUS.FAILED,
                    message: "Invalid token"
                }
            }
        }

        if (data.confirmed) {
            return {
                statusCode: Constants.STATUS_CODE.BAD_REQUEST,
                response: {
                    status: Constants.STATUS.FAILED,
                    message: "Email already confirmed"
                }
            }
        }

        await this.userRepo.updateUser(data.id, {confirmed: true});

        return {
            statusCode: Constants.STATUS_CODE.SUCCESS,
            response: {
                status: Constants.STATUS.SUCCESS,
                message: "Email confirmed successfully"
            }
        }
    }

    async resendEmailConfirmation(req: NextApiRequest) {
        if (req.method !== 'POST')
            return {
                statusCode: Constants.STATUS_CODE.BAD_REQUEST,
                response: {
                    status: Constants.STATUS.FAILED,
                    message: "Invalid request method"
                }
            }

        const requestData = resendEmailSchema.safeParse(req.body || {});

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

        let user = await this.userRepo.getUserByEmail(requestData.data.email);

        if (!user) {
            user = await this.userRepo.getUserByUsername(requestData.data.email);

            if (!user) return {
                statusCode: Constants.STATUS_CODE.BAD_REQUEST,
                response: {
                    status: Constants.STATUS.FAILED,
                    message: "User does not exist"
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

        const token = requestData.data.type === "token" ? generateRandomToken() : generateOTP();

        const emailConfirmationToken = await this.userRepo.generateTokenOTP(
            user.id,
            token,
            requestData.data.type === "token" ? Constants.TOKEN_TYPE.EMAIL_CONFIRMATION_TOKEN : Constants.TOKEN_TYPE.EMAIL_CONFIRMATION_OTP
        );

        // TODO: Send email

        return {
            statusCode: Constants.STATUS_CODE.SUCCESS,
            response: {
                status: Constants.STATUS.SUCCESS,
                message: "Email confirmation sent successfully"
            }
        }
    }

    async refreshToken(req: NextApiRequest) {
        if (req.method !== 'POST')
            return {
                statusCode: Constants.STATUS_CODE.BAD_REQUEST,
                response: {
                    status: Constants.STATUS.FAILED,
                    message: "Invalid request method"
                }
            }

        const requestData = refreshTokenSchema.safeParse(req.body || {});

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

        let session: UserSession;
        try {
            session = await verifyRefreshToken(requestData.data.token);
        } catch (err) {
            return {
                statusCode: Constants.STATUS_CODE.UNAUTHORIZED,
                response: {
                    status: Constants.STATUS.FAILED,
                    message: "Invalid token"
                }
            }
        }

        // TODO: make the response in snake case
        return {
            statusCode: Constants.STATUS_CODE.SUCCESS,
            response: {
                status: Constants.STATUS.SUCCESS,
                message: "Token refreshed successfully",
                data: {
                    accessToken: generateAccessToken(session)
                }
            }
        }
    }
}