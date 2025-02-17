import { NextRequest } from "next/server";
import { User } from "@prisma/client";
import humps from "humps";

import * as Constants from "@lib/constants";
import { UserSession } from "@lib/types";
import {
    generateAccessToken,
    generateOTP,
    generateRandomToken,
    generateRefreshToken,
    verifyRefreshToken
} from "@utils/token";
import Validators from "@lib/validator/auth.validator";
import Response from "@lib/http"
import Repository from "@src/repository";
import Email from "@utils/email";
import { compare, hash } from "@utils/hashing";
import { getDatabaseLogger } from "@utils/logging";
import { AllowMethod, AllowPermitted, CheckBody, CheckError } from "@utils/decorator";

@CheckError
@AllowPermitted
export default class AuthController {
    userRepo = Repository.user;
    private logger = getDatabaseLogger({ name: "controller:auth", class: "AuthController" });

    @AllowMethod("POST")
    @CheckBody
    public async signup(req: NextRequest) {
        const body = await req.json()
        const requestData = Validators.registerSchema.safeParse(body);

        if (!requestData.success) return Response.validationError(requestData.error.errors);

        if (body.password !== body.confirmPassword) return Response.badRequest("Passwords do not match");

        delete body.confirmPassword;

        const userExistsByEmail = await this.userRepo.getByEmail(body.email);
        const userExistsByUsername = await this.userRepo.getByUsername(body.username);

        if (userExistsByEmail || userExistsByUsername) return Response.badRequest("User already exists");

        body.password = await hash(body.password);

        const user = await this.userRepo.create(humps.decamelizeKeys(body) as User)
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

        if (!confirmationToken) {
            await this.logger.error("Failed to generate confirmation token");
            await this.userRepo.delete(user.id);
            return Response.internalServerError("Failed to generate confirmation token");
        }

        try {
            await Email.sendToken(user.email, token)
        } catch (error) {
            await this.logger.error(error);
            await this.userRepo.delete(user.id);
            return Response.internalServerError("Failed to send confirmation email");
        }

        await this.logger.info(`${ user.email } created an account`, undefined, true);

        return Response.created("Signup successful", {
            ...userSession,
            accessToken: generateAccessToken(userSession),
            refreshToken: generateRefreshToken(userSession),
        });
    }

    @AllowMethod("POST")
    @CheckBody
    public async login(req: NextRequest) {
        const body = await req.json()
        const requestData = Validators.loginSchema.safeParse(body);

        if (!requestData.success) return Response.validationError(requestData.error.errors);

        let user = await this.userRepo.getByEmail(body.email);

        if (!user) {
            user = await this.userRepo.getByUsername(body.email);

            if (!user) return Response.invalidCredentials("Email or username is invalid");
        }

        const isPasswordValid = await compare(body.password, user.password);

        if (!isPasswordValid) return Response.invalidCredentials("Incorrect password");

        const userSession: UserSession = {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            username: user.username,
            image_url: user.image_url
        }

        await this.logger.debug(userSession, `User ${ user.email } logged in`)
        await this.logger.info(`${ user.email } logged in`, undefined, true);

        return Response.ok("Login successful", {
            ...userSession,
            accessToken: generateAccessToken(userSession),
            refreshToken: generateRefreshToken(userSession),
        });
    }

    @AllowMethod("POST")
    @CheckBody
    public async resetPassword(req: NextRequest) {
        const body = await req.json()
        const requestData = Validators.resetPasswordSchema.safeParse(body);

        if (!requestData.success) return Response.validationError(requestData.error.errors);

        let user = await this.userRepo.getByEmail(requestData.data.email);

        if (!user) {
            user = await this.userRepo.getByUsername(requestData.data.email);

            if (!user) return Response.notFound("Email or username is invalid");
        }

        const token = requestData.data.type === "otp" ? generateOTP() : generateRandomToken();
        const resetPasswordToken = await this.userRepo.generateTokenOTP(
            user.id,
            token,
            requestData.data.type === "otp" ?
                Constants.TOKEN_TYPE.PASSWORD_RESET_OTP :
                Constants.TOKEN_TYPE.PASSWORD_RESET_TOKEN
        );

        if (!resetPasswordToken) return Response.internalServerError("Failed to generate reset password token");

        try {
            requestData.data.type === "token" ?
                await Email.sendToken(user.email, token) :
                await Email.sendOTP(user.email, token);
        } catch (error) {
            await this.logger.error(error);
            return Response.internalServerError("Failed to send confirmation email");
        }

        await this.logger.debug(user, `User [${ user.email }] requested password reset`)
        await this.logger.info(`${ user.email } requested password reset`, undefined, true);
        return Response.ok("Password reset sent successfully");
    }

    @AllowMethod("PUT")
    @CheckBody
    public async confirmResetPassword(req: NextRequest) {
        const body = await req.json()
        const requestData = Validators.confirmResetPasswordSchema.safeParse(body);

        if (!requestData.success) return Response.validationError(requestData.error.errors);

        const { success, data } = await this.userRepo.verifyTokenOTP(
            requestData.data.token,
            requestData.data.type === "otp" ?
                Constants.TOKEN_TYPE.PASSWORD_RESET_OTP :
                Constants.TOKEN_TYPE.PASSWORD_RESET_TOKEN
        );

        if (!success) return Response.unauthorized("Invalid token");

        await this.userRepo.changePassword(data.id, requestData.data.password);
        await this.logger.debug(data, `User ${ data.email } changed password`)
        await this.logger.info(`${ data.email } changed password`, undefined, true);

        return Response.ok("Password change successful");
    }

    @AllowMethod("POST")
    @CheckBody
    public async confirmEmail(req: NextRequest) {
        const body = await req.json()
        const requestData = Validators.confirmEmailSchema.safeParse(body);

        if (!requestData.success) return Response.validationError(requestData.error.errors);

        const { success, data } = await this.userRepo.verifyTokenOTP(
            requestData.data.token,
            requestData.data.type === "otp" ?
                Constants.TOKEN_TYPE.EMAIL_CONFIRMATION_OTP :
                Constants.TOKEN_TYPE.EMAIL_CONFIRMATION_TOKEN
        );

        if (!success) return Response.unauthorized("Invalid token");

        if (data.confirmed) return Response.badRequest("Email already confirmed");

        await this.userRepo.update(data.id, { confirmed: true });
        await this.logger.debug(data, `User ${ data.email } confirmed email`)
        await this.logger.info(`${ data.email } confirmed`, undefined, true);

        return Response.ok("Email confirm successful");
    }

    @AllowMethod("POST")
    @CheckBody
    public async resendEmailConfirmation(req: NextRequest) {
        const body = await req.json()
        const requestData = Validators.resendEmailSchema.safeParse(body);

        if (!requestData.success) return Response.validationError(requestData.error.errors);

        let user = await this.userRepo.getByEmail(requestData.data.email);

        if (!user) {
            user = await this.userRepo.getByUsername(requestData.data.email);

            if (!user) return Response.badRequest("User does not exist");
        }

        if (user.confirmed) return Response.badRequest("Email already confirmed");

        const token = requestData.data.type === "token" ? generateRandomToken() : generateOTP();
        const emailConfirmationToken = await this.userRepo.generateTokenOTP(
            user.id,
            token,
            requestData.data.type === "token" ? Constants.TOKEN_TYPE.EMAIL_CONFIRMATION_TOKEN : Constants.TOKEN_TYPE.EMAIL_CONFIRMATION_OTP
        );

        if (!emailConfirmationToken) return Response.internalServerError("Failed to generate confirmation token");

        try {
            requestData.data.type === "token" ?
                await Email.sendToken(user.email, token) :
                await Email.sendOTP(user.email, token);
        } catch (error) {
            await this.logger.error(error, `User ${ user.email } failed to send confirmation email`, true);
            return Response.internalServerError("Failed to send confirmation email");
        }

        await this.logger.debug(user, `User ${ user.email } requested email confirmation`)
        await this.logger.info(`${ user.email } requested email confirmation`, undefined, true);
        return Response.ok("Email confirmation sent");
    }

    @AllowMethod("POST")
    @CheckBody
    public async refreshToken(req: NextRequest) {
        const body = await req.json()
        const requestData = Validators.refreshTokenSchema.safeParse(body);

        if (!requestData.success) return Response.validationError(requestData.error.errors);

        const session = await verifyRefreshToken(requestData.data.token);

        if (!session) return Response.unauthorized("Invalid refresh token");

        await this.logger.debug(session, `User ${ session.email } refreshed token`)
        await this.logger.info(`${ session.email } refreshed token`, undefined, true);
        return Response.ok(
            "Token refresh successful",
            { accessToken: generateAccessToken(session) }
        );
    }
}