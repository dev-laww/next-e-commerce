import PaymentMethodRepository from "@repository/payment-method.repo";
import prisma from "@lib/prisma";
import { PaymentMethod } from "@prisma/client";

jest.mock("@lib/prisma", require("@mocks/lib/prisma.mock"));

describe("PaymentMethodRepository", () => {
    let paymentMethods: PaymentMethod[];

    beforeEach(() => {
        paymentMethods = [
            {
                "id": 1000,
                "user_id": 1000,
                "name": "Credit Card",
                "card_number": "**** **** **** 1234",
                "expiration_date": "12/25",
                "cvv": "123"
            } as PaymentMethod,
            {
                "id": 1001,
                "user_id": 1001,
                "name": "PayPal",
                "email": "user1@example.com"
            } as PaymentMethod
        ];

        jest.clearAllMocks();
    })

    it("Test getAll", async () => {
        (prisma.paymentMethod.findMany as jest.Mock).mockResolvedValue(paymentMethods)

        const repo = new PaymentMethodRepository();

        const result = await repo.getAll();

        expect(result).toMatchObject(paymentMethods);
    });

    it("Test getById", async () => {
        (prisma.paymentMethod.findUnique as jest.Mock).mockResolvedValue(paymentMethods[0])

        const repo = new PaymentMethodRepository();

        const result = await repo.getById(1000);

        expect(result).toMatchObject(paymentMethods[0]);
    });

    it("Test getUserPaymentMethods", async () => {
        (prisma.paymentMethod.findMany as jest.Mock).mockResolvedValue(paymentMethods)

        const repo = new PaymentMethodRepository();

        const result = await repo.getUserPaymentMethods(1000);

        expect(result).toMatchObject(paymentMethods);
    });

    it("Test create", async () => {
        (prisma.paymentMethod.create as jest.Mock).mockResolvedValue(paymentMethods[0])

        const repo = new PaymentMethodRepository();

        const result = await repo.create(paymentMethods[0]);

        expect(result).toMatchObject(paymentMethods[0]);
    });

    it("Test update", async () => {
        (prisma.paymentMethod.update as jest.Mock).mockResolvedValue(paymentMethods[0])

        const repo = new PaymentMethodRepository();

        const result = await repo.update(1000, paymentMethods[0]);

        expect(result).toMatchObject(paymentMethods[0]);
    });

    it("Test delete", async () => {
        (prisma.paymentMethod.delete as jest.Mock).mockResolvedValue(paymentMethods[0])

        const repo = new PaymentMethodRepository();

        const result = await repo.delete(1000);

        expect(result).toMatchObject(paymentMethods[0]);
    });

    it("Test deleteByUserId", async () => {
        (prisma.paymentMethod.deleteMany as jest.Mock).mockResolvedValue({count: 1})

        const repo = new PaymentMethodRepository();

        const result = await repo.deleteByUserId(1000);

        expect(result).toMatchObject({count: 1});
    });
});
