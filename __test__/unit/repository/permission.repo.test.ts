import prisma from "@lib/prisma";
import PermissionRepository from "@repository/permission.repo";
import { Permission, Role } from "@prisma/client";

jest.mock("@lib/prisma", require("@mocks/lib/prisma.mock"));

describe("PermissionRepository", () => {
    let repo: PermissionRepository;
    const role = {
        id: 1,
        name: "test"
    } as Role;
    const permission = {
        id: 1,
        name: "test"
    } as Permission;

    beforeEach(() => {
        repo = new PermissionRepository();
        jest.clearAllMocks();
    });

    it("Test getAll", async () => {
        (prisma.permission.findMany as jest.Mock).mockResolvedValue([]);

        let result = await repo.getAll();

        expect(result).toMatchObject([]);

        result = await repo.getAll({name: "test"});

        expect(result).toMatchObject([]);
    });

    it("Test getById", async () => {
        (prisma.permission.findUnique as jest.Mock).mockResolvedValue(null);

        let result = await repo.getById(1);

        expect(result).toBeNull();

        (prisma.permission.findUnique as jest.Mock).mockResolvedValue(permission);

        result = await repo.getById(1);

        expect(result).toMatchObject(permission);
    });

    it("Test create", async () => {
        (prisma.permission.create as jest.Mock).mockResolvedValue(permission);

        let result = await repo.create({name: "test"} as Permission);

        expect(result).toMatchObject(permission);
    });

    it("Test update", async () => {
        (prisma.permission.update as jest.Mock).mockResolvedValue(permission);

        let result = await repo.update(1, {name: "test"} as Permission);

        expect(result).toMatchObject(permission);
    });

    it("Test delete", async () => {
        (prisma.permission.delete as jest.Mock).mockResolvedValue(permission);

        let result = await repo.delete(1);

        expect(result).toMatchObject(permission);
    });

    it("Test getRoles", async () => {
        (prisma.rolePermission.findMany as jest.Mock).mockResolvedValue([{
            role: role
        }]);

        let result = await repo.getRoles(1);

        expect(result).toMatchObject([role]);
    });

    it("Test updateRoles", async () => {
        (prisma.rolePermission.findMany as jest.Mock).mockResolvedValue([{
            role: role
        }]);
        (prisma.permission.update as jest.Mock).mockResolvedValue(permission);

        let result = await repo.updateRoles(1, [2]);

        expect(result).toMatchObject([role]);
    });
});
