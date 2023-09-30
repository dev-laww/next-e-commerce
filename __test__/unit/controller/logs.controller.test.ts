import { NextRequest } from "next/server";
import LogsController from "@controller/logs.controller";


describe("LogsController", () => {
    let controller: LogsController;
    let req: NextRequest;

    beforeEach(() => {
        controller = new LogsController();
    });

    describe("Test getLogs", () => {
        it.todo("returns 200 with logs");
        it.todo("returns 401 if unauthorized");
        it.todo("returns 403 if forbidden");
        it.todo("returns 404 if no logs found");
    });
});

