import { NextApiRequest } from "next";

import AuthController from "@controller/auth.controller";
import { TokenOTP, User } from "@prisma/client";
import * as Constants from "@lib/constants";
import Email from "@utils/email";
import { generateRefreshToken } from "@utils/token";
import { UserSession } from "@lib/types";

jest.mock("@repository/user.repo", () => require("@mocks/repository/user.repo.mock"));
jest.mock("@utils/email", () => require("@mocks/lib/utils/email.mock"));

describe("Auth Controller", () => {
    let controller: AuthController;
    let req: NextApiRequest;
    const data = {
        id: 1,
        username: "username",
        password: "$2a$10$FyDL9cB8vaD9U/XF4Q81A.m2W26BHjT/fXkjw1xQtgKQ4z6dH7/Zu",
        email: "email",
        first_name: "name",
        last_name: "name"
    } as User;

    beforeEach(() => {
        req = {
            method: "POST",
        } as NextApiRequest;

        controller = new AuthController();

        jest.clearAllMocks();
    });

    describe("Test login", () => {
        beforeEach(() => {
            jest.clearAllMocks();
        })

        it("returns 200 if login success", async () => {
            req.body = {
                email: "username",
                password: "password"
            };

            // Mock getUserByEmail to return data
            (controller.userRepo.getUserByEmail as jest.Mock).mockResolvedValue(data);

            // call login
            const {statusCode, response} = await controller.login(req);

            // expect
            expect(statusCode).toBe(Constants.STATUS_CODE.SUCCESS);
            expect(response.data).toBeDefined();
            expect(response.data.accessToken).toBeDefined();
        })

        it("returns 401 if login fail", async () => {
            req.body = {
                email: "username",
                password: "wrong_password"
            };

            // Mock getUserByEmail to return data
            (controller.userRepo.getUserByEmail as jest.Mock).mockResolvedValue(data);

            // call login
            const {statusCode, response} = await controller.login(req);

            // expect
            expect(statusCode).toBe(Constants.STATUS_CODE.UNAUTHORIZED);
            expect(response.data).toBeUndefined();
        })

        it("returns 422 if wrong body", async () => {
            // call login
            const {statusCode, response} = await controller.login(req);

            // expect
            expect(statusCode).toBe(Constants.STATUS_CODE.UNPROCESSABLE_ENTITY);
            expect(response.data).toBeUndefined();
        });

        it("returns 400 if invalid request method", async () => {
            req.method = "GET";

            // call login
            const {statusCode, response} = await controller.login(req);

            // expect
            expect(statusCode).toBe(Constants.STATUS_CODE.BAD_REQUEST);
            expect(response.data).toBeUndefined();
        })
    })

    describe("Test signup", () => {
        beforeEach(() => {
            req.body = {
                username: "username",
                password: "password",
                confirmPassword: "password",
                email: "email@mail.com",
                firstName: "name",
                lastName: "name",
                imageUrl: "https://image.com/image.jpg"
            };

            jest.clearAllMocks();
        });

        it("returns 201 if register success", async () => {
            (controller.userRepo.getUserByEmail as jest.Mock).mockResolvedValue(null);
            (controller.userRepo.getUserById as jest.Mock).mockResolvedValue(null);
            (controller.userRepo.generateTokenOTP as jest.Mock).mockResolvedValue({
                id: 1,
                user_id: 1,
                token: "x",
                type: Constants.TOKEN_TYPE.EMAIL_CONFIRMATION_OTP,
            } as TokenOTP);
            (controller.userRepo.createUser as jest.Mock).mockResolvedValue(data);

            const {statusCode, response} = await controller.signup(req);

            expect(statusCode).toBe(Constants.STATUS_CODE.CREATED);
            expect(response.data).toBeDefined();
        });

        it("returns 422 if wrong body", async () => {
            req.body = {};

            const {statusCode, response} = await controller.signup(req);

            expect(statusCode).toBe(Constants.STATUS_CODE.UNPROCESSABLE_ENTITY);
            expect(response.data).toBeUndefined();
        });

        it("returns 400 if user already exist", async () => {
            (controller.userRepo.getUserByEmail as jest.Mock).mockResolvedValue(data);
            (controller.userRepo.getUserById as jest.Mock).mockResolvedValue(data);

            const {statusCode, response} = await controller.signup(req);

            expect(statusCode).toBe(Constants.STATUS_CODE.BAD_REQUEST);
            expect(response.data).toBeUndefined();
        });

        it("returns 500 if generation token fail", async () => {
            (controller.userRepo.getUserByEmail as jest.Mock).mockResolvedValue(null);
            (controller.userRepo.getUserById as jest.Mock).mockResolvedValue(null);
            (controller.userRepo.generateTokenOTP as jest.Mock).mockResolvedValue(null);
            (controller.userRepo.createUser as jest.Mock).mockResolvedValue(data);

            const {statusCode, response} = await controller.signup(req);

            expect(statusCode).toBe(Constants.STATUS_CODE.INTERNAL_SERVER_ERROR);
            expect(response.data).toBeUndefined();
        });

        it("returns 500 if token sending fail", async () => {
            (controller.userRepo.getUserByEmail as jest.Mock).mockResolvedValue(null);
            (controller.userRepo.getUserById as jest.Mock).mockResolvedValue(null);
            (controller.userRepo.generateTokenOTP as jest.Mock).mockResolvedValue({
                id: 1,
                user_id: 1,
                token: "x",
                type: Constants.TOKEN_TYPE.EMAIL_CONFIRMATION_OTP,
            } as TokenOTP);
            (controller.userRepo.createUser as jest.Mock).mockResolvedValue(data);
            (Email.sendToken as jest.Mock).mockRejectedValue(Error("error"));

            const {statusCode, response} = await controller.signup(req);

            expect(statusCode).toBe(Constants.STATUS_CODE.INTERNAL_SERVER_ERROR);
            expect(response.data).toBeUndefined();
        })
    })

    describe("Test reset password", () => {
        beforeEach(() => {
            req.body = {
                email: "test@mail.com",
                type: "token"
            };
            jest.clearAllMocks();
        });

        it("returns 200 if reset password success", async () => {
            const token = {
                id: 1,
                user_id: 1,
                token: "x",
                type: Constants.TOKEN_TYPE.PASSWORD_RESET_TOKEN,
            };

            (controller.userRepo.getUserByEmail as jest.Mock).mockResolvedValue(data);
            (controller.userRepo.generateTokenOTP as jest.Mock).mockResolvedValue(token);
            (Email.sendToken as jest.Mock).mockResolvedValue(null);

            let {statusCode, response} = await controller.resetPassword(req);

            expect(statusCode).toBe(Constants.STATUS_CODE.SUCCESS);
            expect(response.data).toBeUndefined();

            // OTP
            req.body.type = "otp";
            token.type = Constants.TOKEN_TYPE.PASSWORD_RESET_OTP;
            (controller.userRepo.generateTokenOTP as jest.Mock).mockResolvedValue(token);
            (Email.sendOTP as jest.Mock).mockResolvedValue(null);

            ({statusCode, response} = await controller.resetPassword(req));

            expect(statusCode).toBe(Constants.STATUS_CODE.SUCCESS);
            expect(response.data).toBeUndefined();
        });

        it("returns 422 if wrong body", async () => {
            req.body = {};

            const {statusCode, response} = await controller.resetPassword(req);

            expect(statusCode).toBe(Constants.STATUS_CODE.UNPROCESSABLE_ENTITY);
            expect(response.data).toBeUndefined();
        });

        it("returns 404 if user not found", async () => {
            (controller.userRepo.getUserByUsername as jest.Mock).mockResolvedValue(null);
            (controller.userRepo.getUserByEmail as jest.Mock).mockResolvedValue(null);

            const {statusCode, response} = await controller.resetPassword(req);

            expect(statusCode).toBe(Constants.STATUS_CODE.NOT_FOUND);
            expect(response.data).toBeUndefined();
        });

        it("returns 500 if failed to send email", async () => {
            const token = {
                id: 1,
                user_id: 1,
                token: "x",
                type: Constants.TOKEN_TYPE.PASSWORD_RESET_TOKEN,
            };

            (controller.userRepo.getUserByEmail as jest.Mock).mockResolvedValue(data);
            (controller.userRepo.generateTokenOTP as jest.Mock).mockResolvedValue(token);
            (Email.sendToken as jest.Mock).mockRejectedValue(Error("error"));

            let {statusCode, response} = await controller.resetPassword(req);

            expect(statusCode).toBe(Constants.STATUS_CODE.INTERNAL_SERVER_ERROR);
            expect(response.data).toBeUndefined();

            // OTP
            req.body.type = "otp";
            token.type = Constants.TOKEN_TYPE.PASSWORD_RESET_OTP;
            (controller.userRepo.generateTokenOTP as jest.Mock).mockResolvedValue(token);
            (Email.sendOTP as jest.Mock).mockRejectedValue(Error("error"));

            expect(statusCode).toBe(Constants.STATUS_CODE.INTERNAL_SERVER_ERROR);
            expect(response.data).toBeUndefined();
        });
    })

    describe("Test confirm reset password", () => {
        beforeEach(() => {
            req.method = "PUT";
            req.body = {
                token: "x",
                password: "password",
                type: "token"
            };
            jest.clearAllMocks();
        })

        it("returns 200 if change password success", async () => {
            (controller.userRepo.verifyTokenOTP as jest.Mock).mockResolvedValue({success: true, data: data});
            (controller.userRepo.changePassword as jest.Mock).mockResolvedValue(null);

            let {statusCode, response} = await controller.confirmResetPassword(req);

            expect(statusCode).toBe(Constants.STATUS_CODE.SUCCESS);
            expect(response.data).toBeUndefined();

            // OTP
            req.body.type = "otp";
            ({statusCode, response} = await controller.confirmResetPassword(req));

            expect(statusCode).toBe(Constants.STATUS_CODE.SUCCESS);
            expect(response.data).toBeUndefined();
        });

        it("returns 422 if wrong body", async () => {
            req.body = {};

            const {statusCode, response} = await controller.confirmResetPassword(req);

            expect(statusCode).toBe(Constants.STATUS_CODE.UNPROCESSABLE_ENTITY);
            expect(response.data).toBeUndefined();
        });

        it("returns 401 if invalid token", async () => {
            (controller.userRepo.verifyTokenOTP as jest.Mock).mockResolvedValue({success: false, data: null});

            let {statusCode, response} = await controller.confirmResetPassword(req);

            expect(statusCode).toBe(Constants.STATUS_CODE.UNAUTHORIZED);
            expect(response.data).toBeUndefined();

            req.body.type = "otp";

            ({statusCode, response} = await controller.confirmResetPassword(req));

            expect(statusCode).toBe(Constants.STATUS_CODE.UNAUTHORIZED);
            expect(response.data).toBeUndefined();
        });
    })

    describe("Test confirm email", () => {
        beforeEach(() => {
            req.body = {
                token: "x",
                type: "token"
            }
            jest.clearAllMocks();
        })

        it("returns 200 if confirm email success", async () => {
            (controller.userRepo.verifyTokenOTP as jest.Mock).mockResolvedValue({success: true, data: data});
            (controller.userRepo.updateUser as jest.Mock).mockResolvedValue(null);

            let {statusCode, response} = await controller.confirmEmail(req);

            expect(statusCode).toBe(Constants.STATUS_CODE.SUCCESS);
            expect(response.data).toBeUndefined();

            // OTP
            req.body.type = "otp";
            ({statusCode, response} = await controller.confirmEmail(req));

            expect(statusCode).toBe(Constants.STATUS_CODE.SUCCESS);
            expect(response.data).toBeUndefined();
        });

        it("returns 422 if wrong body", async () => {
            req.body = {};

            const {statusCode, response} = await controller.confirmEmail(req);

            expect(statusCode).toBe(Constants.STATUS_CODE.UNPROCESSABLE_ENTITY);
            expect(response.data).toBeUndefined();
        });

        it("returns 400 if user already confirmed", async () => {
            (controller.userRepo.verifyTokenOTP as jest.Mock).mockResolvedValue({
                success: true,
                data: {...data, confirmed: true}
            });
            (controller.userRepo.updateUser as jest.Mock).mockResolvedValue(null);

            let {statusCode, response} = await controller.confirmEmail(req);

            expect(statusCode).toBe(Constants.STATUS_CODE.BAD_REQUEST);
            expect(response.data).toBeUndefined();

            // OTP
            req.body.type = "otp";
            ({statusCode, response} = await controller.confirmEmail(req));

            expect(statusCode).toBe(Constants.STATUS_CODE.BAD_REQUEST);
            expect(response.data).toBeUndefined();
        });

        it("returns 401 if invalid token", async () => {
            (controller.userRepo.verifyTokenOTP as jest.Mock).mockResolvedValue({success: false, data: null});

            let {statusCode, response} = await controller.confirmEmail(req);

            expect(statusCode).toBe(Constants.STATUS_CODE.UNAUTHORIZED);
            expect(response.data).toBeUndefined();

            // OTP
            req.body.type = "otp";
            ({statusCode, response} = await controller.confirmEmail(req));

            expect(statusCode).toBe(Constants.STATUS_CODE.UNAUTHORIZED);
            expect(response.data).toBeUndefined();
        });
    })

    describe("Test resend confirmation email", () => {
        let token: TokenOTP;

        beforeEach(() => {
            req.body = {
                email: "test@mail.com",
                type: "token"
            };
            token = {
                id: 1,
                user_id: 1,
                token: "x",
                type: Constants.TOKEN_TYPE.EMAIL_CONFIRMATION_TOKEN,
            } as TokenOTP;
            jest.clearAllMocks();
        })

        it("returns 200 if resend confirmation email success", async () => {
            (controller.userRepo.getUserByEmail as jest.Mock).mockResolvedValue(null);
            (controller.userRepo.getUserByUsername as jest.Mock).mockResolvedValue(data);
            (controller.userRepo.generateTokenOTP as jest.Mock).mockResolvedValue(token);
            (Email.sendToken as jest.Mock).mockResolvedValue(null);

            let {statusCode, response} = await controller.resendEmailConfirmation(req);

            expect(statusCode).toBe(Constants.STATUS_CODE.SUCCESS);
            expect(response.data).toBeUndefined();

            // OTP
            req.body.type = "otp";
            token.type = Constants.TOKEN_TYPE.EMAIL_CONFIRMATION_OTP;
            (controller.userRepo.generateTokenOTP as jest.Mock).mockResolvedValue(token);
            (Email.sendOTP as jest.Mock).mockResolvedValue(null);

            ({statusCode, response} = await controller.resendEmailConfirmation(req));

            expect(statusCode).toBe(Constants.STATUS_CODE.SUCCESS);
            expect(response.data).toBeUndefined();
        });

        it("returns 422 if wrong body", async () => {
            req.body = {};

            const {statusCode, response} = await controller.resendEmailConfirmation(req);

            expect(statusCode).toBe(Constants.STATUS_CODE.UNPROCESSABLE_ENTITY);
            expect(response.data).toBeUndefined();
        });

        it("returns 400 if user not found", async () => {
            (controller.userRepo.getUserByEmail as jest.Mock).mockResolvedValue(null);
            (controller.userRepo.getUserByUsername as jest.Mock).mockResolvedValue(null);

            const {statusCode, response} = await controller.resendEmailConfirmation(req);

            expect(statusCode).toBe(Constants.STATUS_CODE.BAD_REQUEST);
            expect(response.data).toBeUndefined();
        });

        it("returns 500 if failed to send email", async () => {
            (controller.userRepo.getUserByEmail as jest.Mock).mockResolvedValue(null);
            (controller.userRepo.getUserByUsername as jest.Mock).mockResolvedValue(data);
            (controller.userRepo.generateTokenOTP as jest.Mock).mockResolvedValue(token);
            (Email.sendToken as jest.Mock).mockRejectedValue(Error("error"));

            let {statusCode, response} = await controller.resendEmailConfirmation(req);

            expect(statusCode).toBe(Constants.STATUS_CODE.INTERNAL_SERVER_ERROR);
            expect(response.data).toBeUndefined();

            // OTP
            req.body.type = "otp";
            token.type = Constants.TOKEN_TYPE.EMAIL_CONFIRMATION_OTP;
            (controller.userRepo.generateTokenOTP as jest.Mock).mockResolvedValue(token);
            (Email.sendOTP as jest.Mock).mockRejectedValue(Error("error"));

            ({statusCode, response} = await controller.resendEmailConfirmation(req));

            expect(statusCode).toBe(Constants.STATUS_CODE.INTERNAL_SERVER_ERROR);
            expect(response.data).toBeUndefined();
        });
    })

    describe("Test refresh token", () => {
        let refreshToken: string;
        const userSession: UserSession = {
            id: 1,
            username: "username",
            email: "email",
            first_name: "name",
            last_name: "name",
            image_url: "https://image.com/image.jpg"
        };

        beforeEach(() => {
            refreshToken = generateRefreshToken(userSession);

            req.body = {
                token: refreshToken
            }

            jest.clearAllMocks();
        });

        it("returns 200 if refresh token success", async () => {
            const {statusCode, response} = await controller.refreshToken(req);

            expect(statusCode).toBe(Constants.STATUS_CODE.SUCCESS);
            expect(response.data).toBeDefined();
        });

        it("returns 422 if wrong body", async () => {
            req.body = {};

            const {statusCode, response} = await controller.refreshToken(req);

            expect(statusCode).toBe(Constants.STATUS_CODE.UNPROCESSABLE_ENTITY);
            expect(response.data).toBeUndefined();
        });

        it("returns 401 if invalid token", async () => {
            req.body.token = "invalid_token";

            const {statusCode, response} = await controller.refreshToken(req);

            expect(statusCode).toBe(Constants.STATUS_CODE.UNAUTHORIZED);
            expect(response.data).toBeUndefined();
        });
    })
})