import PaymentRepository from "@repository/payment.repo";
import prisma from "@lib/prisma";

jest.mock("@lib/prisma", require("@mocks/lib/prisma.mock"));

describe("PaymentRepository", () => {
    let repo: PaymentRepository;
    beforeEach(() => {
        jest.clearAllMocks();
        repo = new PaymentRepository();
    });

    it.todo("Test getAll");
    it.todo("Test getById");
    it.todo("Test getByOrderId");
    it.todo("Test getByStatus");
    it.todo("Test create");
    it.todo("Test update");
    it.todo("Test delete");
    it.todo("Test success");
    it.todo("Test fail");
    it.todo("Test process")
    it.todo("Test linkOrder");
});
