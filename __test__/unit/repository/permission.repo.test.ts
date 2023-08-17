import PermissionRepository from "@repository/permission.repo";

jest.mock("@lib/prisma", require("@mocks/lib/prisma.mock"));

describe("PermissionRepository", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it.todo("write tests");
});
