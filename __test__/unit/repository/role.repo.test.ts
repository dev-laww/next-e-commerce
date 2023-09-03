import RoleRepository from "@repository/role.repo";
import { Permission, Role } from "@prisma/client";
import prisma from "@lib/prisma";

jest.mock("@lib/prisma", require("@mocks/lib/prisma.mock"));

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

        result = await repo.getAll(undefined, 50, {id: 1});

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
        (prisma.rolePermission.findMany as jest.Mock).mockResolvedValue([{
            permission: permission
        }]);

        const result = await repo.getPermissions(1);

        expect(result).toMatchObject([permission]);
    });

    it("Test updateRolePermissions", async () => {
        (prisma.rolePermission.findMany as jest.Mock).mockResolvedValue([{
            permission: permission
        }]);
        (prisma.role.update as jest.Mock).mockResolvedValue(role);

        const result = await repo.updatePermissions(1, [2]);

        expect(result).toMatchObject([permission]);
    });
});
