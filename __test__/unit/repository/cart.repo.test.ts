import CartRepository from "@repository/cart.repo";

jest.mock("@lib/prisma", require("@mocks/lib/prisma.mock"));

describe("CartRepository", () => {
    let repo: CartRepository;
    beforeEach(() => {
        jest.clearAllMocks();
        repo = new CartRepository();
    });

    it.todo("Test getAll");
    it.todo("Test getByUserId");
    it.todo("Test getByProductId");
    it.todo("Test getByVariantId");
    it.todo("Test getById");
    it.todo("Test create");
    it.todo("Test update");
    it.todo("Test delete");
    it.todo("Test deleteByUserId");
    it.todo("Test deleteByProductId");
    it.todo("Test deleteByVariantId");
});
