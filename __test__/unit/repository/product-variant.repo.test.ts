import ProductVariantRepository from "@repository/product-variant.repo";
import prisma from "@lib/prisma";
import { Prisma } from "@prisma/client";

describe("ProductVariantRepository", () => {
    let repo: ProductVariantRepository;
    beforeEach(() => {
        jest.clearAllMocks();
        repo = new ProductVariantRepository();
    });

    it("Test getAll", async () => {
        (prisma.productVariant.findMany as jest.Mock).mockResolvedValue([]);

        let result = await repo.getAll();

        expect(result).toMatchObject([]);

        result = await repo.getAll(undefined, 50, { id: 1 });

        expect(result).toMatchObject([]);
    })

    it("Test getById", async () => {
        (prisma.productVariant.findUnique as jest.Mock).mockResolvedValueOnce(null);

        let result = await repo.getById(1);

        expect(result).toEqual(null);
    });

    it("Test create", async () => {
        (prisma.productVariant.create as jest.Mock).mockResolvedValueOnce({});

        let result = await repo.create({} as Prisma.ProductVariantCreateInput);

        expect(result).toEqual({});
    });

    it("Test update", async () => {
        (prisma.productVariant.update as jest.Mock).mockResolvedValueOnce({});

        let result = await repo.update(1, {} as Prisma.ProductVariantUpdateInput);

        expect(result).toEqual({});
    });

    it("Test delete", async () => {
        (prisma.productVariant.delete as jest.Mock).mockResolvedValueOnce({});

        let result = await repo.delete(1);

        expect(result).toEqual({});
    });
});
