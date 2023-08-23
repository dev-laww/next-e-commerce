import OrderRepository from "@repository/order.repo";
import prisma from "@lib/prisma";
import { ORDER_STATUS } from "@lib/constants";
import { Order } from "@prisma/client";

jest.mock("@lib/prisma", require("@mocks/lib/prisma.mock"));

describe("OrderRepository", () => {
    let repo: OrderRepository;
    beforeEach(() => {
        repo = new OrderRepository();
        jest.clearAllMocks();
    });

    it("Test getAll", async () => {
        (prisma.order.findMany as jest.Mock).mockResolvedValueOnce([]);

        const result = await repo.getAll();
        expect(result).toEqual([]);
    });

    it("Test getById", async () => {
        (prisma.order.findUnique as jest.Mock).mockResolvedValueOnce({
            id: 1,
            status: ORDER_STATUS.COMPLETED,
        });

        const result = await repo.getById(1);
        expect(result).toEqual({
            id: 1,
            status: ORDER_STATUS.COMPLETED,
        });
    });

    it("Test getUserOrders", async () => {
        (prisma.order.findMany as jest.Mock).mockResolvedValueOnce([]);

        const result = await repo.getUserOrders(1);
        expect(result).toEqual([]);
    });

    it("Test getByStatus", async () => {
        (prisma.order.findMany as jest.Mock).mockResolvedValueOnce([]);

        const result = await repo.getByStatus(ORDER_STATUS.COMPLETED);
        expect(result).toEqual([]);
    });

    it("Test getByAddressId", async () => {
        (prisma.order.findMany as jest.Mock).mockResolvedValueOnce([]);

        const result = await repo.getByAddressId(1);
        expect(result).toEqual([]);
    });

    it("Test getByShippingId", async () => {
        (prisma.order.findMany as jest.Mock).mockResolvedValueOnce([]);

        const result = await repo.getByShippingId(1);
        expect(result).toEqual([]);
    });

    it("Test getItems", async () => {
        (prisma.order.findUnique as jest.Mock).mockResolvedValueOnce(null);

        let result = await repo.getItems(1);
        expect(result).toEqual([]);

        (prisma.order.findUnique as jest.Mock).mockResolvedValueOnce({
            order_items: [{
                id: 1,
                order_id: 1,
                product_id: 1,
                quantity: 1,
                price: 1,
            }]
        });

        result = await repo.getItems(1);
        expect(result).toEqual([{
            id: 1,
            order_id: 1,
            product_id: 1,
            quantity: 1,
            price: 1,
        }]);
    });

    it("Test create", async () => {
        (prisma.order.create as jest.Mock).mockResolvedValueOnce(null);

        const result = await repo.create({} as Order);
        expect(result).toEqual(null);
    });

    it("Test update", async () => {
        (prisma.order.update as jest.Mock).mockResolvedValueOnce(null);

        const result = await repo.update(1, {
            status: ORDER_STATUS.PROCESSING,
        });
        expect(result).toEqual(null);
    });

    it("Test delete", async () => {
        (prisma.order.delete as jest.Mock).mockResolvedValueOnce(null);

        const result = await repo.delete(1);
        expect(result).toEqual(null);
    });
});
