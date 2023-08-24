import ProductRepository from "@src/repository/product.repo";
import prisma from "@lib/prisma";
import { Prisma } from "@prisma/client";

jest.mock("@lib/prisma", require("@mocks/lib/prisma.mock"));

describe("ProductRepository", () => {
    let repo: ProductRepository;
    beforeEach(() => {
        jest.clearAllMocks();
        repo = new ProductRepository();
    });

    it("Test getAll", async () => {
        (prisma.product.findMany as jest.Mock).mockResolvedValueOnce([]);

        let result = await repo.getAll();

        expect(result).toMatchObject([]);
    })

    it("Test getById", async () => {
        (prisma.product.findUnique as jest.Mock).mockResolvedValueOnce(null);

        let result = await repo.getById(1);

        expect(result).toEqual(null);
    });

    it("Test create", async () => {
        (prisma.product.create as jest.Mock).mockResolvedValueOnce({});

        let result = await repo.create({} as Prisma.ProductCreateInput);

        expect(result).toEqual({});
    });

    it("Test update", async () => {
        (prisma.product.update as jest.Mock).mockResolvedValueOnce({});

        let result = await repo.update(1, {} as Prisma.ProductCreateInput);

        expect(result).toEqual({});
    });

    it("Test delete", async () => {
        (prisma.product.delete as jest.Mock).mockResolvedValueOnce({});

        let result = await repo.delete(1);

        expect(result).toEqual({});
    });

    it("Test getVariants", async () => {
        (prisma.productVariant.findMany as jest.Mock).mockResolvedValueOnce([]);

        let result = await repo.getVariants(1);

        expect(result).toEqual([])
    })

    it("Test getCategories", async () => {
        (prisma.productCategory.findMany as jest.Mock).mockResolvedValueOnce([]);

        let result = await repo.getCategories(1);

        expect(result).toEqual([])
    })

    it("Test deleteVariant", async () => {
        (prisma.productVariant.delete as jest.Mock).mockResolvedValueOnce({})

        let result = await repo.deleteVariant(1, 1);

        expect(result).toEqual({})
    })

    it("Test deleteCategory", async () => {
        (prisma.productCategory.delete as jest.Mock).mockResolvedValueOnce({})

        let result = await repo.deleteCategory(1, 1);

        expect(result).toEqual({})
    })
})