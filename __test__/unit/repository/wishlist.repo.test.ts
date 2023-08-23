import WishlistRepository from "@repository/wishlist.repo";

jest.mock("@lib/prisma", require("@mocks/lib/prisma.mock"));

describe("WishlistRepository", () => {
    let repo: WishlistRepository;
    beforeEach(() => {
        repo = new WishlistRepository();
        jest.clearAllMocks();
    });

    it.todo("Test getAll");
    it.todo("Test getById");
    it.todo("Test getUserWishlist");
    it.todo("Test getByProductId");
    it.todo("Test create");
    it.todo("Test update");
    it.todo("Test delete");
    it.todo("Test deleteUserWishlist");
    it.todo("Test deleteByProductId");
});
