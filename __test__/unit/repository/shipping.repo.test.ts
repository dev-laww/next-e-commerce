import ShippingRepository from "@repository/shipping.repo";
import prisma from "@lib/prisma";
import { Prisma } from "@prisma/client";

describe("ShippingRepository", () => {
    let repo: ShippingRepository;
    beforeEach(() => {
        jest.clearAllMocks();
        repo = new ShippingRepository();
    });

    it("Test getAll", async () => {
        (prisma.shippingMethod.findMany as jest.Mock).mockResolvedValue([]);

        let result = await repo.getAll();

        expect(result).toMatchObject([]);

        result = await repo.getAll(undefined, 50, { id: 1 });

        expect(result).toMatchObject([]);
    });

    it("Test getById", async () => {
        (prisma.shippingMethod.findUnique as jest.Mock).mockResolvedValueOnce(null);

        const result = await repo.getById(1);

        expect(result).toEqual(null);
    });

    it("Test update", async () => {
        (prisma.shippingMethod.update as jest.Mock).mockResolvedValueOnce({});

        const result = await repo.update(1, {} as Prisma.ReviewUpdateInput);

        expect(result).toEqual({});
    });

    it("Test delete", async () => {
        (prisma.shippingMethod.delete as jest.Mock).mockResolvedValueOnce({});

        const result = await repo.delete(1);

        expect(result).toEqual({});
    });

    it("Test getShippingOrders", async () => {
        (prisma.order.findMany as jest.Mock).mockResolvedValue([]);

        const result = await repo.getShippingOrders(1);

        expect(result).toMatchObject([]);
    });
});
