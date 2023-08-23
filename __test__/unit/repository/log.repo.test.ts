import LogRepository from "@repository/log.repo";
import prisma from "@lib/prisma";

jest.mock("@lib/prisma", require("@mocks/lib/prisma.mock"));

describe("LogRepository", () => {
    let repo: LogRepository;
    beforeEach(() => {
        repo = new LogRepository();
        jest.clearAllMocks();
    });

    it("Test getAll", async () => {
        (prisma.log.findMany as jest.Mock).mockResolvedValueOnce([]);

        const result = await repo.getAll();
        expect(result).toEqual([]);
    });

    it("Test getById", async () => {
        (prisma.log.findUnique as jest.Mock).mockResolvedValueOnce(null);

        const result = await repo.getById(1);
        expect(result).toEqual(null);
    });

    it("Test create", async () => {
        (prisma.log.create as jest.Mock).mockResolvedValueOnce(null);

        const result = await repo.create({
            level: "info",
            message: "test"
        });
        expect(result).toEqual(null);
    });
});
