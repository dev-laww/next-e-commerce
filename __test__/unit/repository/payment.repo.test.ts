import PaymentRepository from "@repository/payment.repo";
import prisma from "@lib/prisma";
import { Payment } from "@prisma/client";

jest.mock("@lib/prisma", require("@mocks/lib/prisma.mock"));

describe("PaymentRepository", () => {
    let repo: PaymentRepository;
    beforeEach(() => {
        jest.clearAllMocks();
        repo = new PaymentRepository();
    });

    it("Test getAll", async () => {
        (prisma.payment.findMany as jest.Mock).mockResolvedValue([]);

        let result = await repo.getAll();

        expect(result).toMatchObject([]);

        result = await repo.getAll(undefined, 50, { id: 1 });

        expect(result).toMatchObject([]);
    });

    it("Test getById", async () => {
        (prisma.payment.findUnique as jest.Mock).mockResolvedValueOnce({
            id: 1,
            status: "success",
        });

        const result = await repo.getById(1);

        expect(result).toEqual({
            id: 1,
            status: "success",
        });
    });

    it("Test getByOrderId", async () => {
        (prisma.payment.findMany as jest.Mock).mockResolvedValueOnce([]);

        const result = await repo.getByOrderId(1);

        expect(result).toEqual([]);
    });

    it("Test getByStatus", async () => {
        (prisma.payment.findMany as jest.Mock).mockResolvedValueOnce([]);

        const result = await repo.getByStatus("success");

        expect(result).toEqual([]);
    });

    it("Test create", async () => {
        (prisma.payment.create as jest.Mock).mockResolvedValueOnce({
            id: 1,
            status: "success",
        });

        const result = await repo.create({
            id: 1,
            status: "success",
        } as Payment);

        expect(result).toEqual({
            id: 1,
            status: "success",
        });
    });

    it("Test update", async () => {
        (prisma.payment.update as jest.Mock).mockResolvedValueOnce({
            id: 1,
            status: "success",
        });

        const result = await repo.update(1, {
            id: 1,
            status: "success",
        } as Payment);

        expect(result).toEqual({
            id: 1,
            status: "success",
        });
    });

    it("Test delete", async () => {
        (prisma.payment.delete as jest.Mock).mockResolvedValueOnce({
            id: 1,
            status: "success",
        });

        const result = await repo.delete(1);

        expect(result).toEqual({
            id: 1,
            status: "success",
        });
    });

    it("Test success", async () => {
        (prisma.payment.update as jest.Mock).mockResolvedValueOnce({
            id: 1,
            status: "success",
        });

        const result = await repo.success(1);

        expect(result).toEqual({
            id: 1,
            status: "success",
        });
    });

    it("Test fail", async () => {
        (prisma.payment.update as jest.Mock).mockResolvedValueOnce({
            id: 1,
            status: "failed",
        });

        const result = await repo.fail(1);

        expect(result).toEqual({
            id: 1,
            status: "failed",
        });
    });
});
