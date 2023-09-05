import WishlistRepository from "@repository/wishlist.repo";
import prisma from "@lib/prisma";
import { Prisma } from "@prisma/client";

describe("WishlistRepository", () => {
    let repo: WishlistRepository;
    beforeEach(() => {
        repo = new WishlistRepository();
        jest.clearAllMocks();
    });

    it("Test getAll", async () => {
        (prisma.wishlistItem.findMany as jest.Mock).mockResolvedValue([]);

        let result = await repo.getAll();

        expect(result).toMatchObject([]);

        result = await repo.getAll(undefined, 50, { id: 1 });

        expect(result).toMatchObject([]);
    });

    it("Test getById", async () => {
        (prisma.wishlistItem.findUnique as jest.Mock).mockResolvedValueOnce(null);

        let result = await repo.getById(1);

        expect(result).toEqual(null);
    });

    it("Test getUserWishlist", async () => {
        (prisma.wishlistItem.findMany as jest.Mock).mockResolvedValueOnce([]);

        let result = await repo.getUserWishlist(1);

        expect(result).toMatchObject([]);
    });
    it("Test getByProductId", async () => {
        (prisma.wishlistItem.findMany as jest.Mock).mockResolvedValueOnce([]);

        let result = await repo.getByProductId(1);

        expect(result).toMatchObject([]);
    });

    it("Test create", async () => {
        (prisma.wishlistItem.create as jest.Mock).mockResolvedValueOnce({});

        let result = await repo.create({} as Prisma.WishlistItemCreateInput);

        expect(result).toEqual({});
    });

    it("Test update", async () => {
        (prisma.wishlistItem.update as jest.Mock).mockResolvedValueOnce({});

        let result = await repo.update(1, {} as Prisma.WishlistItemUpdateInput);

        expect(result).toEqual({});
    });

    it("Test delete", async () => {
        (prisma.wishlistItem.delete as jest.Mock).mockResolvedValueOnce({});

        let result = await repo.delete(1);

        expect(result).toEqual({});
    });

    it("Test deleteUserWishlist", async () => {
        (prisma.wishlistItem.deleteMany as jest.Mock).mockResolvedValueOnce({});

        let result = await repo.deleteUserWishlist(1);

        expect(result).toEqual({});
    });

    it("Test deleteByProductId", async () => {
        (prisma.wishlistItem.deleteMany as jest.Mock).mockResolvedValueOnce({});

        let result = await repo.deleteByProductId(1);

        expect(result).toEqual({});
    });
});
