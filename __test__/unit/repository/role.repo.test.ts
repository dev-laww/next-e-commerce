import RoleRepository from "@repository/role.repo";

jest.mock("@lib/prisma", require("@mocks/lib/prisma.mock"));

describe("RoleRepository", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    })

    it.todo("Test getAll");
    it.todo("Test getById");
    it.todo("Test create");
    it.todo("Test update");
    it.todo("Test delete");
    it.todo("Test getRolePermissions")
    it.todo("Test addRolePermissions")
    it.todo("Test updateRolePermissions");
    it.todo("Test deleteRolePermissions");
    it.todo("Test getUserRoles");
    it.todo("Test updateUserRoles");
    it.todo("Test removeUserRoles");
    it.todo("Test removeUserRole");
});
