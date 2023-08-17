import PermissionRepository from "@repository/permission.repo";

jest.mock("@lib/prisma", require("@mocks/lib/prisma.mock"));

describe("PermissionRepository", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it.todo("Test getAll");
    it.todo("Test getById");
    it.todo("Test create");
    it.todo("Test update");
    it.todo("Test delete");
    it.todo("Test getRole")
    it.todo("Test removeRole")
});
