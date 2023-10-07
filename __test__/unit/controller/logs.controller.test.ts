import { NextRequest } from "next/server";
import LogsController from "@controller/logs.controller";
import { generateAccessToken } from "@utils/token";
import { UserSession } from "@lib/types";
import PermissionController from "@controller/permission.controller";
import Response from "@lib/http";
import Repository from "@src/repository";
import { STATUS_CODE } from "@lib/constants";

const isAllowed = jest.spyOn(PermissionController, "isAllowed");

describe("LogsController", () => {
    let controller: LogsController;
    let req: NextRequest;
    const token = generateAccessToken({ id: 1, username: "test" } as UserSession);

    beforeEach(() => {
        controller = new LogsController();
    });

    describe("Test getLogs", () => {
        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/api/logs", {
                headers: { Authorization: `Bearer ${ token }` }
            })
        });

        it("returns 200 with logs", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.log.getAll as jest.Mock).mockImplementation(() => Promise.resolve([{ id: 1 }]));

            const res = await controller.getLogs(req);

            expect(res.statusCode).toBe(STATUS_CODE.OK);
            expect(res.response).toBeDefined();
        });

        it("returns 401 if unauthorized", async () => {
            isAllowed.mockResolvedValueOnce(Response.unauthorized());

            const res = await controller.getLogs(req);

            expect(res.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(res.response).toBeDefined();
        });

        it("returns 403 if forbidden", async () => {
            isAllowed.mockResolvedValueOnce(Response.forbidden);

            const res = await controller.getLogs(req);

            expect(res.statusCode).toBe(STATUS_CODE.FORBIDDEN);
            expect(res.response).toBeDefined();
        });

        it("returns 404 if no logs found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.log.getAll as jest.Mock).mockImplementation(() => Promise.resolve([]));

            const res = await controller.getLogs(req);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        });
    });
});

