import { NextApiRequest } from "next";
import { User } from "@prisma/client";

import * as Constants from "@lib/constants";
import { compare, hash } from "@utils/hashing";
import { UserSession } from "@lib/types";
import UserRepository from "@repository/user_repo";
import {
    generateAccessToken,
    generateOTP,
    generateRandomToken,
    generateRefreshToken,
    verifyRefreshToken
} from "@utils/token";
import { objectToSnake } from "@utils/string_case";
import Validators from "@lib/validator/auth";
import Response from "@lib/http"


export default class AuthController {
    userRepo = new UserRepository();

    async signUp(req: NextApiRequest) {
        if (req.method !== 'POST') return Response.badRequest("Invalid request method");

        const requestData = Validators.registerSchema.safeParse(req.body || {});

        if (!requestData.success) return Response.validationError("Validation error", requestData.error.errors);

        delete req.body.confirmPassword;

        const userExistsByEmail = await this.userRepo.getUserByEmail(req.body.email);
        const userExistsByUsername = await this.userRepo.getUserByUsername(req.body.username);

        if (userExistsByEmail || userExistsByUsername) Response.badRequest("User already exists");

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

        return Response.success("User created successfully", {
            ...userSession,
            accessToken: generateAccessToken(userSession),
            refreshToken: generateRefreshToken(userSession),
        });
    }

    async login(req: NextApiRequest) {
        if (req.method !== 'POST') return Response.badRequest("Invalid request method");

        const requestData = Validators.loginSchema.safeParse(req.body || {});

        if (!requestData.success) return Response.validationError("Validation error", requestData.error.errors);

        let user = await this.userRepo.getUserByEmail(req.body.email);

        if (!user) {
            user = await this.userRepo.getUserByUsername(req.body.email);

            if (!user) return Response.invalidCredentials("Email or username is invalid");
        }

        const isPasswordValid = await compare(req.body.password, user.password);

        if (!isPasswordValid) return Response.invalidCredentials("Incorrect password");

        const userSession: UserSession = {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            username: user.username,
            image_url: user.image_url
        }

        return Response.success("Login successful", {
            ...userSession,
            accessToken: generateAccessToken(userSession),
            refreshToken: generateRefreshToken(userSession),
        });
    }

    // TODO: make this accept otp
    async resetPassword(req: NextApiRequest) {
        if (req.method !== 'POST') return Response.badRequest("Invalid request method");

        const requestData = Validators.resetPasswordSchema.safeParse(req.body || {});

        if (!requestData.success) return Response.validationError("Validation error", requestData.error.errors);

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
        if (req.method !== 'POST') return Response.badRequest("Invalid request method");

        const requestData = Validators.confirmResetPasswordSchema.safeParse(req.body || {});

        if (!requestData.success) return Response.validationError("Validation error", requestData.error.errors);

        const {success, data} = await this.userRepo.verifyTokenOTP(
            requestData.data.token,
            Constants.TOKEN_TYPE.PASSWORD_RESET_TOKEN
        );

        if (!success) return Response.unauthorized("Invalid token");

        await this.userRepo.changePassword(data.id, requestData.data.password);

        return Response.success("Password changed successfully");
    }

    async confirmEmail(req: NextApiRequest) {
        if (req.method !== 'POST') return Response.badRequest("Invalid request method");


        const requestData = Validators.confirmEmailSchema.safeParse(req.body || {});

        if (!requestData.success) return Response.validationError("Validation error", requestData.error.errors);

        const {success, data} = await this.userRepo.verifyTokenOTP(
            requestData.data.token,
            Constants.TOKEN_TYPE.EMAIL_CONFIRMATION_TOKEN
        );

        if (!success) return Response.unauthorized("Invalid token");

        if (data.confirmed) return Response.badRequest("Email already confirmed");

        await this.userRepo.updateUser(data.id, {confirmed: true});

        return Response.success("Email confirmed successfully");
    }

    async resendEmailConfirmation(req: NextApiRequest) {
        if (req.method !== 'POST') return Response.badRequest("Invalid request method");

        const requestData = Validators.resendEmailSchema.safeParse(req.body || {});

        if (!requestData.success) return Response.validationError("Validation error", requestData.error.errors);

        let user = await this.userRepo.getUserByEmail(requestData.data.email);

        if (!user) {
            user = await this.userRepo.getUserByUsername(requestData.data.email);

            if (!user) return Response.badRequest("User does not exist");
        }

        if (user.confirmed) return Response.badRequest("Email already confirmed");

        const token = requestData.data.type === "token" ? generateRandomToken() : generateOTP();

        const emailConfirmationToken = await this.userRepo.generateTokenOTP(
            user.id,
            token,
            requestData.data.type === "token" ? Constants.TOKEN_TYPE.EMAIL_CONFIRMATION_TOKEN : Constants.TOKEN_TYPE.EMAIL_CONFIRMATION_OTP
        );

        // TODO: Send email

        return Response.success("Email confirmation sent successfully");
    }

    async refreshToken(req: NextApiRequest) {
        if (req.method !== 'POST') return Response.badRequest("Invalid request method");

        const requestData = Validators.refreshTokenSchema.safeParse(req.body || {});

        if (!requestData.success) return Response.validationError("Validation error", requestData.error.errors);

        let session: UserSession;
        try {
            session = await verifyRefreshToken(requestData.data.token);
        } catch (err) {
            return Response.unauthorized("Invalid token");
        }

        // TODO: make the response in snake case
        return Response.success(
            "Token refreshed successfully",
            {accessToken: generateAccessToken(session)}
        );
    }
}