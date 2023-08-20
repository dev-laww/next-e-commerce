import prisma from "@lib/prisma";
import PermissionRepository from "@repository/permission.repo";
import { Permission } from "@prisma/client";

jest.mock("@lib/prisma", require("@mocks/lib/prisma.mock"));

describe("PermissionRepository", () => {
    let repo: PermissionRepository;

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

        (prisma.permission.findUnique as jest.Mock).mockResolvedValue({id: 1, name: "test"});

        result = await repo.getById(1);

        expect(result).toMatchObject({id: 1, name: "test"});
    });

    it("Test create", async () => {
        (prisma.permission.create as jest.Mock).mockResolvedValue({id: 1, name: "test"});

        let result = await repo.create({name: "test"} as Permission);

        expect(result).toMatchObject({id: 1, name: "test"});
    });

    it("Test update", async () => {
        (prisma.permission.update as jest.Mock).mockResolvedValue({id: 1, name: "test"});

        let result = await repo.update(1, {name: "test"} as Permission);

        expect(result).toMatchObject({id: 1, name: "test"});
    });

    it("Test delete", async () => {
        (prisma.permission.delete as jest.Mock).mockResolvedValue({id: 1, name: "test"});

        let result = await repo.delete(1);

        expect(result).toMatchObject({id: 1, name: "test"});
    });

    it("Test getRoles", async () => {
        (prisma.rolePermission.findMany as jest.Mock).mockResolvedValue([]);

        let result = await repo.getRoles(1);

        expect(result).toMatchObject([]);
    });

    it("Test updateRoles", async () => {
        (prisma.rolePermission.findMany as jest.Mock).mockResolvedValue([]);
        (prisma.permission.update as jest.Mock).mockResolvedValue({id: 1, name: "test"});

        let result = await repo.updateRoles(1, [1, 2, 3]);

        expect(result).toMatchObject([]);
    });
});
