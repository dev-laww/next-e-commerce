import { PrismaClient } from "@prisma/client"
import { mockDeep, mockReset, DeepMockProxy } from "jest-mock-extended";

import prisma from "@lib/prisma";

jest.mock("@lib/prisma", () => ({
    __esModule: true,
    default: mockDeep<PrismaClient>()
}));

beforeEach(() => {
    mockReset(prisma);
})

module.exports = {
    __esModule: true,
    default: prisma as unknown as DeepMockProxy<PrismaClient>
}