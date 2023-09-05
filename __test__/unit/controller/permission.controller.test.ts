import { NextRequest } from "next/server";
import PermissionController from "@controller/permission.controller";
import { generateAccessToken } from "@utils/token";
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

    beforeEach(() => {
        jest.clearAllMocks();

        token = generateAccessToken(USER_SESSION);
    });

    it("Allows access on /api/auth", async () => {
        const req = new NextRequest("http://localhost:3000/api/auth/login", {
            method: "POST",
            body: JSON.stringify({
                username: "test",
                password: "test"
            })
        });

        const result = await PermissionController.isAllowed(req);

        expect(result).toBe(true);
    });

    it("Allows access on common resources", async () => {
        const req = new NextRequest("http://localhost:3000/api/products/1", {
            method: "GET"
        });

        const result = await PermissionController.isAllowed(req);

        expect(result).toBe(true);
    });

    it("Denies access on non-common resources", async () => {
        let req = new NextRequest("http://localhost:3000/api/accounts", {
            method: "GET"
        });

        mockGetAvailableResources.mockResolvedValueOnce(["GET/api/accounts"]);

        let result = await PermissionController.isAllowed(req);

        expect(result).toBe(false);

        req = new NextRequest("http://localhost:3000/api/accounts", {
            method: "GET",
            headers: {
                "Authorization": "Bearer x"
            }
        });

        mockGetAvailableResources.mockResolvedValueOnce([]);

        result = await PermissionController.isAllowed(req);

        expect(result).toBe(false);
    });

    it("Denies access on non-common resources with invalid token", async () => {
        const req = new NextRequest("http://localhost:3000/api/accounts", {
            method: "GET",
            headers: {
                "Authorization": "Bearer x"
            }
        });

        mockGetAvailableResources.mockResolvedValueOnce(["GET/api/accounts"]);

        const result = await PermissionController.isAllowed(req);

        expect(result).toBe(false);
    });

    it("Denies access on non-common resources with valid token but no permission", async () => {
        const req = new NextRequest("http://localhost:3000/api/accounts", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        mockGetAvailableResources.mockResolvedValue(["GET/api/accounts"]);
        mockGetPermissions.mockResolvedValueOnce([]);

        let result = await PermissionController.isAllowed(req);

        expect(result).toBe(false);

        mockGetPermissions.mockResolvedValueOnce(null);

        result = await PermissionController.isAllowed(req);

        expect(result).toBe(false);
    });

    it("Allows access on non-common resources with valid token and permission", async () => {
        const req = new NextRequest("http://localhost:3000/api/accounts", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        mockGetAvailableResources.mockResolvedValueOnce(["GET/api/accounts"]);
        mockGetPermissions.mockResolvedValueOnce([{
            id: 1,
            code: "permission:code",
            name: "Permission Name",
            action: "GET",
            resource: "GET/api/accounts",
        }] as Permission[]);

        const result = await PermissionController.isAllowed(req);

        expect(result).toBe(true);
    });
});

