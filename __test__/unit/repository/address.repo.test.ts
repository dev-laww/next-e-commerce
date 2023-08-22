import AddressRepository from "@repository/address.repo";

jest.mock("@lib/prisma", require("@mocks/lib/prisma.mock"));

describe("AddressRepository", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it.todo("Test getAll");
    it.todo("Test getById");
    it.todo("Test create");
    it.todo("Test update");
    it.todo("Test delete");
    it.todo("Test getAllUserAddresses");
    it.todo("Test deleteUserAddresses");
});
