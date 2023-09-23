import RoleRepository from "@repository/role.repo";
import { Permission, Role } from "@prisma/client";
import prisma from "@lib/prisma";

describe("RoleRepository", () => {
    let repo: RoleRepository;
    const role = {
        id: 1,
        name: "test"
    } as Role;
    const permission = {
        id: 1,
        name: "test"
    } as Permission;

    beforeEach(() => {
        repo = new RoleRepository();
        jest.clearAllMocks();
    })

    it("Test getAll", async () => {
        (prisma.role.findMany as jest.Mock).mockResolvedValue([]);

        let result = await repo.getAll();

        expect(result).toMatchObject([]);

        result = await repo.getAll(undefined, 50, { id: 1 });

        expect(result).toMatchObject([]);
    });

    it("Test getById", async () => {
        (prisma.role.findUnique as jest.Mock).mockResolvedValue(role);

        const result = await repo.getById(1);

        expect(result).toMatchObject(role);
    });

    it("Test create", async () => {
        (prisma.role.create as jest.Mock).mockResolvedValue(role);

        const result = await repo.create(role);

        expect(result).toMatchObject(role);
    });

    it("Test update", async () => {
        (prisma.role.update as jest.Mock).mockResolvedValue(role);

        const result = await repo.update(1, role);

        expect(result).toMatchObject(role);
    });

    it("Test delete", async () => {
        (prisma.role.delete as jest.Mock).mockResolvedValue(role);

        const result = await repo.delete(1);

        expect(result).toMatchObject(role);
    });

    it("Test getRolePermissions", async () => {
        (prisma.role.findUnique as jest.Mock).mockResolvedValueOnce({permissions: [{ permission }]});

        let result = await repo.getPermissions(1);

        expect(result).toMatchObject([permission]);

        (prisma.role.findUnique as jest.Mock).mockResolvedValueOnce(null);

        result = await repo.getPermissions(1);

        expect(result).toMatchObject([]);
    });

    it("Test addRolePermission", async () => {
        (prisma.role.update as jest.Mock).mockResolvedValueOnce({permissions: [{ permission }]});

        const result = await repo.addPermission(1, 1);

        expect(result).toMatchObject(permission);
    });

    it("Test removeRolePermission", async () => {
        (prisma.rolePermission.findFirst as jest.Mock).mockResolvedValueOnce({});
        (prisma.rolePermission.delete as jest.Mock).mockResolvedValueOnce({ permission });

        const result = await repo.removePermission(1, 1);

        expect(result).toMatchObject(permission);
    });

    it("Test getRoleUsers", async () => {
        (prisma.user.findMany as jest.Mock).mockResolvedValueOnce([]);

        const result = await repo.getUsers(1);

        expect(result).toMatchObject([]);
    });
});
