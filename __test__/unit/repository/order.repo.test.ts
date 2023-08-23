import OrderRepository from "@repository/order.repo";

jest.mock("@lib/prisma", require("@mocks/lib/prisma.mock"));

describe("OrderRepository", () => {
    let repo: OrderRepository;
    beforeEach(() => {
        repo = new OrderRepository();
        jest.clearAllMocks();
    });

    it.todo("Test getAll");
    it.todo("Test getById");
    it.todo("Test getUserOrders");
    it.todo("Test getByStatusId");
    it.todo("Test getByAddressId");
    it.todo("Test getByShippingId");
    it.todo("Test getItems");
    it.todo("Test create");
    it.todo("Test update");
    it.todo("Test delete");
});
