import CategoryRepository from "@repository/category.repo";
import prisma from "@lib/prisma";
import { Prisma } from "@prisma/client";

jest.mock("@lib/prisma", require("@mocks/lib/prisma.mock"));

describe("CategoryRepository", () => {
    let repo: CategoryRepository;
    beforeEach(() => {
        jest.clearAllMocks();
        repo = new CategoryRepository();
    });

    it("Test getAll", async () => {
        (prisma.category.findMany as jest.Mock).mockResolvedValue([]);

        let result = await repo.getAll();

        expect(result).toMatchObject([]);

        result = await repo.getAll(undefined, 50, {id: 1});

        expect(result).toMatchObject([]);
    })

    it("Test getById", async () => {
        (prisma.category.findUnique as jest.Mock).mockResolvedValueOnce(null);

        const result = await repo.getById(1);

        expect(result).toEqual(null);
    });

    it("Test create", async () => {
        (prisma.category.create as jest.Mock).mockResolvedValueOnce({});

        const result = await repo.create({} as Prisma.CategoryCreateInput);

        expect(result).toEqual({});
    });

    it("Test update", async () => {
        (prisma.category.update as jest.Mock).mockResolvedValueOnce({});

        const result = await repo.update(1, {} as Prisma.CategoryUpdateInput);

        expect(result).toEqual({});
    });

    it("Test delete", async () => {
        (prisma.category.delete as jest.Mock).mockResolvedValueOnce({});

        const result = await repo.delete(1);

        expect(result).toEqual({});
    });

    it("Test getProducts", async () => {
        (prisma.category.findUnique as jest.Mock).mockResolvedValueOnce(null);

        let result = await repo.getProducts(1);

        expect(result).toEqual([]);

        (prisma.category.findUnique as jest.Mock).mockResolvedValueOnce({
            products: [{
                id: 1
            }]
        });

        result = await repo.getProducts(1);

        expect(result).toEqual([{
            id: 1
        }]);
    });
});
