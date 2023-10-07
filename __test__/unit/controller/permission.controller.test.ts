import PermissionController from "@controller/permission.controller";
import { generateAccessToken } from "@utils/token";
import { NextRequest } from "next/server";
import Response from "@lib/http";
import { Permission } from "@prisma/client";

describe("PermissionController", () => {
    const mockGetAvailableResources = jest.spyOn(PermissionController["permissionRepo"], "getAvailableResources");
    const mockGetPermissions = jest.spyOn(PermissionController["repo"], "getPermissions");
    const USER_SESSION = {
        id: 1,
        username: "username",
        email: "email",
        first_name: "name",
        last_name: "name",
        image_url: "https://image.com/image.jpg"
    };

    let token: string;
    let req: NextRequest;

    beforeEach(() => {
        jest.clearAllMocks();

        token = generateAccessToken(USER_SESSION);
    });

    it("Allows access on auth resources", async () => {
        req = new NextRequest("http://localhost:3000/api/auth/login");

        const response = await PermissionController.isAllowed(req);

        expect(response).toMatchObject(Response.ok());
    });

    it("Allow access to common resources", async () => {
        req = new NextRequest("http://localhost:3000/api/products");

        const response = await PermissionController.isAllowed(req);

        expect(response).toMatchObject(Response.ok());
    });

    it("Allows if user has permission to access the resource", async () => {
        req = new NextRequest("http://localhost:3000/api/accounts", {
            headers: {
                Authorization: `Bearer ${ token }`
            }
        });

        mockGetAvailableResources.mockResolvedValueOnce(["GET/api/accounts"]);
        mockGetPermissions.mockResolvedValueOnce([{ resource: "GET/api/accounts" } as Permission]);

        const response = await PermissionController.isAllowed(req);

        expect(response).toMatchObject(Response.ok());
    });

    it("Allows access to profile resources", async () => {
        req = new NextRequest("http://localhost:3000/api/profile", {
            headers: {
                Authorization: `Bearer ${ token }`
            }
        });

        const response = await PermissionController.isAllowed(req);

        expect(response).toMatchObject(Response.ok());
    });

    it("Denies access if no token is provided", async () => {
        req = new NextRequest("http://localhost:3000/api/accounts");

        const response = await PermissionController.isAllowed(req);

        expect(response).toMatchObject(Response.unauthorized("Please login first"));
    });

    it("Denies access if token is invalid", async () => {
        req = new NextRequest("http://localhost:3000/api/accounts", {
            headers: {
                Authorization: "Bearer invalid_token"
            }
        });

        const response = await PermissionController.isAllowed(req);

        expect(response).toMatchObject(Response.unauthorized("Invalid access token"));
    });

    it("Denies access if resource is not available", async () => {
        req = new NextRequest("http://localhost:3000/api/accounts", {
            headers: {
                Authorization: `Bearer ${ token }`
            }
        });

        mockGetAvailableResources.mockResolvedValueOnce([]);

        const response = await PermissionController.isAllowed(req);

        expect(response).toMatchObject(Response.notFound("Requested resource not found"));
    });

    it("Denies access if user has no permission", async () => {
        req = new NextRequest("http://localhost:3000/api/accounts", {
            headers: {
                Authorization: `Bearer ${ token }`
            }
        });

        mockGetAvailableResources.mockResolvedValueOnce(["GET/api/accounts"]);
        mockGetPermissions.mockResolvedValueOnce([]);

        let response = await PermissionController.isAllowed(req);

        expect(response).toMatchObject(Response.forbidden);

        mockGetAvailableResources.mockResolvedValueOnce(["GET/api/accounts"]);
        mockGetPermissions.mockResolvedValueOnce(null);

        response = await PermissionController.isAllowed(req);

        expect(response).toMatchObject(Response.forbidden);
    });

    it("Denies if user has no permission to access the resource", async () => {
        req = new NextRequest("http://localhost:3000/api/accounts", {
            headers: {
                Authorization: `Bearer ${ token }`
            }
        });

        mockGetAvailableResources.mockResolvedValueOnce(["GET/api/accounts"]);
        mockGetPermissions.mockResolvedValueOnce([{ resource: "GET/api/profile" } as Permission]);

        const response = await PermissionController.isAllowed(req);

        expect(response).toMatchObject(Response.forbidden);
    });
});

