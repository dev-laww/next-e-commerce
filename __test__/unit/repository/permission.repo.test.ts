import prisma from "@lib/prisma";
import PermissionRepository from "@repository/permission.repo";
import { Permission, Role } from "@prisma/client";

describe("PermissionRepository", () => {
    let repo: PermissionRepository;
    const role = {
        id: 1,
        name: "test"
    } as Role;
    const permission = {
        id: 1,
        name: "test",
        action: "GET",
        resource: "GET/test"
    } as Permission;

    beforeEach(() => {
        repo = new PermissionRepository();
        jest.clearAllMocks();
    });

    it("Test getAll", async () => {
        (prisma.permission.findMany as jest.Mock).mockResolvedValue([]);

        let result = await repo.getAll();

        expect(result).toMatchObject([]);

        result = await repo.getAll(undefined, 50, { id: 1 });

        expect(result).toMatchObject([]);
    });

    it("Test getAvailableResources", async () => {
        (prisma.permission.findMany as jest.Mock).mockResolvedValue([permission]);

        const result = await repo.getAvailableResources();

        expect(result).toMatchObject([permission.resource]);
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

        const result = await repo.create({ name: "test" } as Permission);

        expect(result).toMatchObject(permission);
    });

    it("Test update", async () => {
        (prisma.permission.update as jest.Mock).mockResolvedValue(permission);

        const result = await repo.update(1, { name: "test" } as Permission);

        expect(result).toMatchObject(permission);
    });

    it("Test delete", async () => {
        (prisma.permission.delete as jest.Mock).mockResolvedValue(permission);

        const result = await repo.delete(1);

        expect(result).toMatchObject(permission);
    });

    it("Test getRoles", async () => {
        (prisma.rolePermission.findMany as jest.Mock).mockResolvedValue([{
            role: role
        }]);

        const result = await repo.getRoles(1);

        expect(result).toMatchObject([role]);
    });

    it("Test updateRoles", async () => {
        (prisma.rolePermission.findMany as jest.Mock).mockResolvedValue([{
            role: role
        }]);
        (prisma.permission.update as jest.Mock).mockResolvedValue(permission);

        const result = await repo.updateRoles(1, [2]);

        expect(result).toMatchObject([role]);
    });
});
