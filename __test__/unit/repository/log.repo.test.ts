import LogRepository from "@repository/log.repo";
import prisma from "@lib/prisma";

describe("LogRepository", () => {
    let repo: LogRepository;
    beforeEach(() => {
        repo = new LogRepository();
        jest.clearAllMocks();
    });

    it("Test getAll", async () => {
        (prisma.log.findMany as jest.Mock).mockResolvedValue([]);

        let result = await repo.getAll();

        expect(result).toMatchObject([]);

        result = await repo.getAll(undefined, 50, { id: 1 });

        expect(result).toMatchObject([]);
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
