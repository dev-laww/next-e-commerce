import CouponRepository from "@repository/coupon.repo";
import prisma from "@lib/prisma";
import { Prisma } from "@prisma/client";

describe("CouponRepository", () => {
    let repo: CouponRepository;
    beforeEach(() => {
        jest.clearAllMocks();
        repo = new CouponRepository();
    });

    it("Test getAll", async () => {
        (prisma.coupon.findMany as jest.Mock).mockResolvedValue([]);

        let result = await repo.getAll();

        expect(result).toMatchObject([]);

        result = await repo.getAll(undefined, 50, { id: 1 });

        expect(result).toMatchObject([]);
    });

    it("Test getById", async () => {
        (prisma.coupon.findUnique as jest.Mock).mockResolvedValueOnce(null);

        const result = await repo.getById(1);

        expect(result).toEqual(null);
    });

    it("Test getByCode", async () => {
        (prisma.coupon.findUnique as jest.Mock).mockResolvedValueOnce(null);

        const result = await repo.getByCode("COUPON1");

        expect(result).toEqual(null);
    });

    it("Test create", async () => {
        (prisma.coupon.create as jest.Mock).mockResolvedValueOnce({});

        const result = await repo.create({} as Prisma.CouponCreateInput);

        expect(result).toEqual({});
    });

    it("Test update", async () => {
        (prisma.coupon.update as jest.Mock).mockResolvedValueOnce({});

        const result = await repo.update(1, {} as Prisma.CouponUpdateInput);

        expect(result).toEqual({});
    });

    it("Test delete", async () => {
        (prisma.coupon.delete as jest.Mock).mockResolvedValueOnce({});

        const result = await repo.delete(1);

        expect(result).toEqual({});
    });
});
