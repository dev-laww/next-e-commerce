import { NextRequest } from "next/server";
import RolesController from "@controller/roles.controller";
import { generateAccessToken } from "@utils/token";
import { UserSession } from "@lib/types";
import PermissionController from "@controller/permission.controller";
import Response from "@lib/http";
import Repository from "@src/repository";
import { STATUS_CODE } from "@lib/constants";
import { Permission, Role, User } from "@prisma/client";

const isAllowed = jest.spyOn(PermissionController, "isAllowed")

describe("RolesController", () => {
    let req: NextRequest;
    let controller: RolesController;
    const token = generateAccessToken({ id: 1, username: "test" } as UserSession);

    beforeEach(() => {
        controller = new RolesController();
    });

    describe("Test getRoles", () => {
        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/api/roles", {
                headers: { Authorization: `Bearer ${token}` }
            });
        });

        it("returns 200 and roles list", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.role.getAll as jest.Mock).mockImplementation(() => Promise.resolve([{ id: 1 }]));

            const res = await controller.getRoles(req);

            expect(res.statusCode).toBe(STATUS_CODE.OK);
            expect(res.response).toBeDefined();
        });

        it("returns 401 if user not authenticated", async () => {
            isAllowed.mockResolvedValueOnce(Response.unauthorized());

            const res = await controller.getRoles(req);

            expect(res.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(res.response).toBeDefined();
        });

        it("returns 403 if user not authorized", async () => {
            isAllowed.mockResolvedValueOnce(Response.forbidden);

            const res = await controller.getRoles(req);

            expect(res.statusCode).toBe(STATUS_CODE.FORBIDDEN);
            expect(res.response).toBeDefined();
        });

        it("returns 404 if roles not found", async () => {
            isAllowed.mockResolvedValueOnce(Response.notFound());
            (Repository.role.getAll as jest.Mock).mockImplementation(() => Promise.resolve([]));

            const res = await controller.getRoles(req);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        });
    });

    describe("Test createRole", () => {
        const role = {
            name: "test",
            code: "role:test"
        } as Role;

        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/api/roles", {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
                body: JSON.stringify(role)
            });
        });

        it("returns 201 and role created", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.role.create as jest.Mock).mockResolvedValueOnce(role)

            const res = await controller.createRole(req);

            expect(res.statusCode).toBe(STATUS_CODE.CREATED);
            expect(res.response).toBeDefined();
        });

        it("returns 400 if invalid body", async () => {
            req = new NextRequest("http://localhost:3000/api/roles", {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
            });
            isAllowed.mockResolvedValueOnce(Response.ok());

            const res = await controller.createRole(req);

            expect(res.statusCode).toBe(STATUS_CODE.BAD_REQUEST);
            expect(res.response).toBeDefined();
        });

        it("returns 401 if user not authenticated", async () => {
            isAllowed.mockResolvedValueOnce(Response.unauthorized());

            const res = await controller.createRole(req);

            expect(res.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(res.response).toBeDefined();
        });

        it("returns 403 if user not authorized", async () => {
            isAllowed.mockResolvedValueOnce(Response.forbidden);

            const res = await controller.createRole(req);

            expect(res.statusCode).toBe(STATUS_CODE.FORBIDDEN);
            expect(res.response).toBeDefined();
        });

        it("returns 422 if wrong body", async () => {
            req = new NextRequest("http://localhost:3000/api/roles", {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
                body: "{}"
            });
            isAllowed.mockResolvedValueOnce(Response.ok());

            const res = await controller.createRole(req);

            expect(res.statusCode).toBe(STATUS_CODE.UNPROCESSABLE_ENTITY);
            expect(res.response).toBeDefined();
        });
    });

    describe("Test getRole", () => {
        const role = {
            id: 1,
            name: "test",
            code: "role:test"
        } as Role;
        const params = { id: "1" };

        beforeEach(() => {
            req = new NextRequest(`http://localhost:3000/api/roles/${role.id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
        });

        it("returns 200 and role", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.role.getById as jest.Mock).mockResolvedValueOnce(role)

            const res = await controller.getRole(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.OK);
            expect(res.response).toBeDefined();
        });

        it("returns 401 if user not authenticated", async () => {
            isAllowed.mockResolvedValueOnce(Response.unauthorized());

            const res = await controller.getRole(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(res.response).toBeDefined();
        });

        it("returns 403 if user not authorized", async () => {
            isAllowed.mockResolvedValueOnce(Response.forbidden);

            const res = await controller.getRole(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.FORBIDDEN);
            expect(res.response).toBeDefined();
        });

        it("returns 404 if role not found", async () => {
            isAllowed.mockResolvedValueOnce(Response.notFound());
            (Repository.role.getById as jest.Mock).mockResolvedValueOnce(null)

            const res = await controller.getRole(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        });
    });

    describe("Test updateRole", () => {
        const role = {
            name: "updated",
            code: "role:updated"
        } as Role;
        const params = { id: "1" };

        beforeEach(() => {
            req = new NextRequest(`http://localhost:3000/api/roles/${role.id}`, {
                method: "PUT",
                headers: { Authorization: `Bearer ${token}` },
                body: JSON.stringify(role)
            });
        });

        it("returns 200 and role updated", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.role.getById as jest.Mock).mockResolvedValueOnce(role);
            (Repository.role.update as jest.Mock).mockResolvedValueOnce(role);

            const res = await controller.updateRole(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.OK);
            expect(res.response).toBeDefined();
        });

        it("returns 400 if invalid body", async () => {
            req = new NextRequest(`http://localhost:3000/api/roles/${role.id}`, {
                method: "PUT",
                headers: { Authorization: `Bearer ${token}` },
            });
            isAllowed.mockResolvedValueOnce(Response.ok());

            const res = await controller.updateRole(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.BAD_REQUEST);
            expect(res.response).toBeDefined();
        });

        it("returns 401 if user not authenticated", async () => {
            isAllowed.mockResolvedValueOnce(Response.unauthorized());

            const res = await controller.updateRole(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(res.response).toBeDefined();
        });

        it("returns 403 if user not authorized", async () => {
            isAllowed.mockResolvedValueOnce(Response.forbidden);

            const res = await controller.updateRole(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.FORBIDDEN);
            expect(res.response).toBeDefined();
        });

        it("returns 404 if role not found", async () => {
            isAllowed.mockResolvedValueOnce(Response.notFound());
            (Repository.role.getById as jest.Mock).mockResolvedValueOnce(null)

            const res = await controller.updateRole(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        });
    });

    describe("Test deleteRole", () => {
        const role = {
            id: 1,
            name: "test",
            code: "role:test"
        } as Role;
        const params = { id: "1" };

        beforeEach(() => {
            req = new NextRequest(`http://localhost:3000/api/roles/${role.id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` }
            });
        });

        it("returns 200 and role deleted", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.role.getById as jest.Mock).mockResolvedValueOnce(role);
            (Repository.role.delete as jest.Mock).mockResolvedValueOnce(role);

            const res = await controller.deleteRole(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.OK);
            expect(res.response).toBeDefined();
        });

        it("returns 401 if user not authenticated", async () => {
            isAllowed.mockResolvedValueOnce(Response.unauthorized());

            const res = await controller.deleteRole(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(res.response).toBeDefined();
        });

        it("returns 403 if user not authorized", async () => {
            isAllowed.mockResolvedValueOnce(Response.forbidden);

            const res = await controller.deleteRole(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.FORBIDDEN);
            expect(res.response).toBeDefined();
        });

        it("returns 404 if role not found", async () => {
            isAllowed.mockResolvedValueOnce(Response.notFound());
            (Repository.role.getById as jest.Mock).mockResolvedValueOnce(null)

            const res = await controller.deleteRole(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        });
    });

    describe("Test getRolePermissions", () => {
        const role = {
            id: 1,
            name: "test",
            code: "role:test"
        } as Role;
        const permission = {
            id: 1,
            name: "test",
            action: "GET",
            resource: "/api/test"
        } as Permission;
        const params = { id: "1" };

        beforeEach(() => {
            req = new NextRequest(`http://localhost:3000/api/roles/${role.id}/permissions`, {
                headers: { Authorization: `Bearer ${token}` }
            });
        });

        it("returns 200 and role permissions", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.role.getById as jest.Mock).mockResolvedValueOnce(role);
            (Repository.role.getPermissions as jest.Mock).mockResolvedValueOnce([permission]);

            const res = await controller.getRolePermissions(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.OK);
            expect(res.response).toBeDefined();
        });

        it("returns 401 if user not authenticated", async () => {
            isAllowed.mockResolvedValueOnce(Response.unauthorized());

            const res = await controller.getRolePermissions(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(res.response).toBeDefined();
        });

        it("returns 403 if user not authorized", async () => {
            isAllowed.mockResolvedValueOnce(Response.forbidden);

            const res = await controller.getRolePermissions(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.FORBIDDEN);
            expect(res.response).toBeDefined();
        });

        it("returns 404 if role not found", async () => {
            isAllowed.mockResolvedValueOnce(Response.notFound());
            (Repository.role.getById as jest.Mock).mockResolvedValueOnce(null)

            const res = await controller.getRolePermissions(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        });

        it("returns 404 if role permissions not found", async () => {
            isAllowed.mockResolvedValueOnce(Response.notFound());
            (Repository.role.getById as jest.Mock).mockResolvedValueOnce(role);
            (Repository.role.getPermissions as jest.Mock).mockResolvedValueOnce([])

            const res = await controller.getRolePermissions(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        });
    });

    describe("Test addRolePermission", () => {
        const role = {
            id: 1,
            name: "test",
            code: "role:test"
        } as Role;
        const permission = {
            id: 1,
            name: "test",
            action: "GET",
            resource: "/api/test"
        } as Permission;
        const params = { id: "1", permissionId: "1" };

        beforeEach(() => {
            req = new NextRequest(`http://localhost:3000/api/roles/${role.id}/permissions/${permission.id}`, {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` }
            });
        });

        it("returns 201 and role permission created", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.role.getById as jest.Mock).mockResolvedValueOnce(role);
            (Repository.permission.getById as jest.Mock).mockResolvedValueOnce(permission);
            (Repository.role.addPermission as jest.Mock).mockResolvedValueOnce(permission);

            const res = await controller.addRolePermission(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.OK);
            expect(res.response).toBeDefined();
        });

        it("returns 401 if user not authenticated", async () => {
            isAllowed.mockResolvedValueOnce(Response.unauthorized());

            const res = await controller.addRolePermission(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(res.response).toBeDefined();
        });

        it("returns 403 if user not authorized", async () => {
            isAllowed.mockResolvedValueOnce(Response.forbidden);

            const res = await controller.addRolePermission(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.FORBIDDEN);
            expect(res.response).toBeDefined();
        });

        it("returns 404 if role not found", async () => {
            isAllowed.mockResolvedValueOnce(Response.notFound());
            (Repository.role.getById as jest.Mock).mockResolvedValueOnce(null)

            const res = await controller.addRolePermission(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        });

        it("returns 404 if permission not found", async () => {
            isAllowed.mockResolvedValueOnce(Response.notFound());
            (Repository.role.getById as jest.Mock).mockResolvedValueOnce(role);
            (Repository.permission.getById as jest.Mock).mockResolvedValueOnce(null)

            const res = await controller.addRolePermission(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        });
    });

    describe("Test deleteRolePermission", () => {
        const role = {
            id: 1,
            name: "test",
            code: "role:test"
        } as Role;
        const permission = {
            id: 1,
            name: "test",
            action: "GET",
            resource: "/api/test"
        } as Permission;
        const params = { id: "1", permissionId: "1" };

        beforeEach(() => {
            req = new NextRequest(`http://localhost:3000/api/roles/${role.id}/permissions/${permission.id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` }
            });
        });

        it("returns 200 and role permission deleted", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.role.getById as jest.Mock).mockResolvedValueOnce(role);
            (Repository.permission.getById as jest.Mock).mockResolvedValueOnce(permission);
            (Repository.role.removePermission as jest.Mock).mockResolvedValueOnce(permission);

            const res = await controller.removeRolePermission(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.OK);
            expect(res.response).toBeDefined();
        });

        it("returns 401 if user not authenticated", async () => {
            isAllowed.mockResolvedValueOnce(Response.unauthorized());

            const res = await controller.removeRolePermission(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(res.response).toBeDefined();
        });

        it("returns 403 if user not authorized", async () => {
            isAllowed.mockResolvedValueOnce(Response.forbidden);

            const res = await controller.removeRolePermission(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.FORBIDDEN);
            expect(res.response).toBeDefined();
        });

        it("returns 404 if role not found", async () => {
            isAllowed.mockResolvedValueOnce(Response.notFound());
            (Repository.role.getById as jest.Mock).mockResolvedValueOnce(null)

            const res = await controller.removeRolePermission(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        });

        it("returns 404 if role permission not found", async () => {
            isAllowed.mockResolvedValueOnce(Response.notFound());
            (Repository.role.getById as jest.Mock).mockResolvedValueOnce(role);
            (Repository.permission.getById as jest.Mock).mockResolvedValueOnce(null)

            const res = await controller.removeRolePermission(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        });
    });

    describe("Test getRoleUsers", () => {
        const role = {
            id: 1,
            name: "test",
            code: "role:test"
        } as Role;
        const user = {
            id: 1,
            username: "test",
            email: "test@mail.com"
        } as User;
        const params = { id: "1" };

        beforeEach(() => {
            req = new NextRequest(`http://localhost:3000/api/roles/${role.id}/users`, {
                headers: { Authorization: `Bearer ${token}` }
            });
        });

        it("returns 200 and role users", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.role.getById as jest.Mock).mockResolvedValueOnce(role);
            (Repository.role.getUsers as jest.Mock).mockResolvedValueOnce([user]);

            const res = await controller.getRoleUsers(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.OK);
            expect(res.response).toBeDefined();
        });

        it("returns 401 if user not authenticated", async () => {
            isAllowed.mockResolvedValueOnce(Response.unauthorized());

            const res = await controller.getRoleUsers(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(res.response).toBeDefined();
        });

        it("returns 403 if user not authorized", async () => {
            isAllowed.mockResolvedValueOnce(Response.forbidden);

            const res = await controller.getRoleUsers(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.FORBIDDEN);
            expect(res.response).toBeDefined();
        });

        it("returns 404 if role not found", async () => {
            isAllowed.mockResolvedValueOnce(Response.notFound());
            (Repository.role.getById as jest.Mock).mockResolvedValueOnce(null)

            const res = await controller.getRoleUsers(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        });

        it("returns 404 if role users not found", async () => {
            isAllowed.mockResolvedValueOnce(Response.notFound());
            (Repository.role.getById as jest.Mock).mockResolvedValueOnce(role);
            (Repository.role.getUsers as jest.Mock).mockResolvedValueOnce([])

            const res = await controller.getRoleUsers(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        });
    });
});

