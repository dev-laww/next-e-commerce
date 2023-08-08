import AuthController from "@controller/auth.controller";
import { NextApiRequest } from "next";
import { User } from "@prisma/client";

jest.mock("@repository/user.repo", () => require("@mocks/repository/user.repo.mock"));

describe("Auth Controller", () => {
    let controller: AuthController;
    const data = {
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
            expect(statusCode).toBe(200);
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
            expect(statusCode).toBe(401);
            expect(response.data).toBeUndefined();
        })

        it("returns 422 if wrong body", async () => {
            // call login
            const {statusCode, response} = await controller.login(req);

            // expect
            expect(statusCode).toBe(422);
            expect(response.data).toBeUndefined();
        });
    })

    describe("Test signup", () => {
        it.todo("returns 200 if register success");
        it.todo("returns 422 if wrong body");
        it.todo("returns 409 if user already exist");
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