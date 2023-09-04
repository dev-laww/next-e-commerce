import CartRepository from "@repository/cart.repo";
import prisma from "@lib/prisma";
import { Prisma } from "@prisma/client";

jest.mock("@lib/prisma", require("@mocks/lib/prisma.mock"));

describe("CartRepository", () => {
    let repo: CartRepository;
    beforeEach(() => {
        jest.clearAllMocks();
        repo = new CartRepository();
    });

    it("Test getAll", async () => {
        (prisma.cartItem.findMany as jest.Mock).mockResolvedValue([]);

        let result = await repo.getAll();

        expect(result).toMatchObject([]);

        result = await repo.getAll(undefined, 50, { id: 1 });

        expect(result).toMatchObject([]);
    });

    it("Test getByUserId", async () => {
        (prisma.cartItem.findMany as jest.Mock).mockResolvedValueOnce([]);

        const result = await repo.getByUserId(1);

        expect(result).toMatchObject([]);
    });

    it("Test getByProductId", async () => {
        (prisma.cartItem.findMany as jest.Mock).mockResolvedValueOnce([]);

        const result = await repo.getByProductId(1);

        expect(result).toMatchObject([]);
    });

    it("Test getByVariantId", async () => {
        (prisma.cartItem.findMany as jest.Mock).mockResolvedValueOnce([]);

        const result = await repo.getByVariantId(1);

        expect(result).toMatchObject([]);
    });

    it("Test getById", async () => {
        (prisma.cartItem.findUnique as jest.Mock).mockResolvedValueOnce(null);

        const result = await repo.getById(1);

        expect(result).toEqual(null);
    });

    it("Test create", async () => {
        (prisma.cartItem.create as jest.Mock).mockResolvedValueOnce({});

        const result = await repo.create({} as Prisma.CartItemCreateInput);

        expect(result).toEqual({});
    });

    it("Test update", async () => {
        (prisma.cartItem.update as jest.Mock).mockResolvedValueOnce({});

        const result = await repo.update(1, {} as Prisma.CartItemUpdateInput);

        expect(result).toEqual({});
    });

    it("Test delete", async () => {
        (prisma.cartItem.delete as jest.Mock).mockResolvedValueOnce({});

        const result = await repo.delete(1);

        expect(result).toEqual({});
    });

    it("Test deleteUserCart", async () => {
        (prisma.cartItem.deleteMany as jest.Mock).mockResolvedValueOnce({});

        const result = await repo.deleteUserCart(1);

        expect(result).toEqual({});
    });

    it("Test deleteByProductId", async () => {
        (prisma.cartItem.deleteMany as jest.Mock).mockResolvedValueOnce({});

        const result = await repo.deleteByProductId(1);

        expect(result).toEqual({});
    });

    it("Test deleteByVariantId", async () => {
        (prisma.cartItem.deleteMany as jest.Mock).mockResolvedValueOnce({});

        const result = await repo.deleteByVariantId(1);

        expect(result).toEqual({});
    });
});
