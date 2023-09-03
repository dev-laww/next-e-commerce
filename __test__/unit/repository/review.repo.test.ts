import ReviewRepository from "@repository/review.repo";
import prisma from "@lib/prisma";
import { Prisma } from "@prisma/client";

jest.mock("@lib/prisma", require("@mocks/lib/prisma.mock"));

describe("ReviewRepository", () => {
    let repo: ReviewRepository;
    beforeEach(() => {
        jest.clearAllMocks();
        repo = new ReviewRepository();
    });

    it("Test getAll", async () => {
        (prisma.review.findMany as jest.Mock).mockResolvedValue([]);

        let result = await repo.getAll();

        expect(result).toMatchObject([]);

        result = await repo.getAll(undefined, 50, {id: 1});

        expect(result).toMatchObject([]);
    });

    it("Test getById", async () => {
        (prisma.review.findUnique as jest.Mock).mockResolvedValueOnce(null);

        const result = await repo.getById(1);

        expect(result).toEqual(null);
    });

    it("Test getProductReviews", async () => {
        (prisma.review.findMany as jest.Mock).mockResolvedValueOnce([]);

        const result = await repo.getProductReviews(1);

        expect(result).toMatchObject([]);
    });

    it("Test getUserReviews", async () => {
        (prisma.review.findMany as jest.Mock).mockResolvedValueOnce([]);

        const result = await repo.getUserReviews(1);

        expect(result).toMatchObject([]);
    });

    it("Test create", async () => {
        (prisma.review.create as jest.Mock).mockResolvedValueOnce({});

        const result = await repo.create({} as Prisma.ReviewCreateInput);

        expect(result).toEqual({});
    });

    it("Test update", async () => {
        (prisma.review.update as jest.Mock).mockResolvedValueOnce({});

        const result = await repo.update(1, {} as Prisma.ReviewUpdateInput);

        expect(result).toEqual({});
    });

    it("Test delete", async () => {
        (prisma.review.delete as jest.Mock).mockResolvedValueOnce({});

        const result = await repo.delete(1);

        expect(result).toEqual({});
    });
});
