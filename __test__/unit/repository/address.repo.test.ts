import AddressRepository from "@repository/address.repo";
import prisma from "@lib/prisma";
import { Prisma } from "@prisma/client";

jest.mock("@lib/prisma", require("@mocks/lib/prisma.mock"));

describe("AddressRepository", () => {
    let repo: AddressRepository;
    beforeEach(() => {
        jest.clearAllMocks();
        repo = new AddressRepository();
    });

    it("Test getAll", async () => {
        (prisma.address.findMany as jest.Mock).mockResolvedValue([]);

        let result = await repo.getAll();

        expect(result).toMatchObject([]);

        result = await repo.getAll(undefined, 50, {id: 1});

        expect(result).toMatchObject([]);
    });

    it("Test getById", async () => {
        (prisma.address.findUnique as jest.Mock).mockResolvedValueOnce(null);

        let result = await repo.getById(1);

        expect(result).toEqual(null);
    });

    it("Test create", async () => {
        (prisma.address.create as jest.Mock).mockResolvedValueOnce({});

        let result = await repo.create({} as Prisma.AddressCreateInput);

        expect(result).toEqual({});
    });

    it("Test update", async () => {
        (prisma.address.update as jest.Mock).mockResolvedValueOnce({});

        let result = await repo.update(1, {} as Prisma.AddressUpdateInput);

        expect(result).toEqual({});
    });

    it("Test delete", async () => {
        (prisma.address.delete as jest.Mock).mockResolvedValueOnce({});

        let result = await repo.delete(1);

        expect(result).toEqual({});
    });

    it("Test getAllUserAddresses", async () => {
        (prisma.address.findMany as jest.Mock).mockResolvedValueOnce([]);

        let result = await repo.getAllUserAddresses(1);

        expect(result).toEqual([]);
    });

    it("Test deleteUserAddresses", async () => {
        (prisma.address.deleteMany as jest.Mock).mockResolvedValueOnce({});

        let result = await repo.deleteUserAddresses(1);

        expect(result).toEqual({});
    });
});
