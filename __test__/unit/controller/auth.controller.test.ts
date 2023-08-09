import { NextApiRequest } from "next";

import AuthController from "@controller/auth.controller";
import { TokenOTP, User } from "@prisma/client";
import * as Constants from "@lib/constants";
import Email from "@utils/email";

jest.mock("@repository/user.repo", () => require("@mocks/repository/user.repo.mock"));
jest.mock("@utils/email", () => require("@mocks/lib/utils/email.mock"));

describe("Auth Controller", () => {
    let controller: AuthController;
    const data = {
        id: 1,
        username: "username",
        password: "$2a$10$FyDL9cB8vaD9U/XF4Q81A.m2W26BHjT/fXkjw1xQtgKQ4z6dH7/Zu",
        email: "email",
        first_name: "name",
        last_name: "name"
    } as User;

    beforeEach(() => {
        controller = new AuthController();

        jest.clearAllMocks();
    });

    describe("Test login", () => {
        let req: NextApiRequest;

        beforeEach(() => {
            req = {
                method: "POST",
            } as NextApiRequest;

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
        let req: NextApiRequest;

        beforeEach(() => {
            req = {
                method: "POST",
                body: {
                    username: "username",
                    password: "password",
                    confirmPassword: "password",
                    email: "email@mail.com",
                    firstName: "name",
                    lastName: "name",
                    imageUrl: "https://image.com/image.jpg"
                }
            } as NextApiRequest;

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
        it.todo("returns 200 if reset password success");
        it.todo("returns 422 if wrong body");
        it.todo("returns 404 if user not found");
        it.todo("returns 500 if failed to send email");
    })

    describe("Test confirm reset password", () => {
        it.todo("returns 200 if change password success");
        it.todo("returns 422 if wrong body");
        it.todo("returns 404 if user not found");
        it.todo("returns 401 if invalid token");
    })

    describe("Test confirm email", () => {
        it.todo("returns 200 if confirm email success");
        it.todo("returns 422 if wrong body");
        it.todo("returns 400 if user already confirmed");
        it.todo("returns 404 if user not found");
        it.todo("returns 401 if invalid token");
    })

    describe("Test resend confirmation email", () => {
        it.todo("returns 200 if resend confirmation email success");
        it.todo("returns 422 if wrong body");
        it.todo("returns 404 if user not found");
        it.todo("returns 500 if failed to send email");
    })

    describe("Test refresh token", () => {
        it.todo("returns 200 if refresh token success");
        it.todo("returns 422 if wrong body");
        it.todo("returns 404 if user not found");
        it.todo("returns 401 if invalid token");
    })
})