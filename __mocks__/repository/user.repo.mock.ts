import UserRepository from "@repository/user.repo";
import { DeepMockProxy, mockDeep } from "jest-mock-extended";

const repositoryMock = mockDeep<UserRepository>;

module.exports = {
    __esModule: true,
    default: repositoryMock as unknown as DeepMockProxy<UserRepository>
}

