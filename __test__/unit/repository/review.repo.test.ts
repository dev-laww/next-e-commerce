import ReviewRepository from "@repository/review.repo";

jest.mock("@lib/prisma", require("@mocks/lib/prisma.mock"));

describe("ReviewRepository", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it.todo("Test getAll");
    it.todo("Test getById");
    it.todo("Test getProductReviews");
    it.todo("Test getUserReviews");
    it.todo("Test create");
    it.todo("Test update");
    it.todo("Test delete");
});
