import { NextRequest } from "next/server";

import CategoryController from "@src/controller/category.controller";
import PermissionController from "@controller/permission.controller";
import Response from "@lib/http";
import { Product, Category } from "@prisma/client";
import Repository from "@src/repository";
import { STATUS_CODE } from "@lib/constants";
import { generateAccessToken } from "@utils/token";
import { UserSession } from "@lib/types";

const isAllowed = jest.spyOn(PermissionController, "isAllowed");

describe("CategoryController", () => {
    let controller: CategoryController;
    let req: NextRequest;
    const token = generateAccessToken({ id: 1, username: "test" } as UserSession);

    beforeEach(() => {
        controller = new CategoryController();
    });

    describe("Test getCategories", () => {
        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/categories", {
                headers: { Authorization: `Bearer ${token}` }
            });
        });

        it("returns 200 with data", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.category.getAll as jest.Mock).mockImplementation(() => Promise.resolve([{ id: 1 }]));

            const res = await controller.getCategories(req);

            expect(res.statusCode).toBe(STATUS_CODE.OK);
            expect(res.response).toBeDefined();
        })

        it("returns 404 if no categories found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.category.getAll as jest.Mock).mockResolvedValueOnce([]);

            const res = await controller.getCategories(req);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        });
    })

    describe("Test getCategory", () => {
        const category = {
            id: 1,
            name: "test"
        } as Category;

        beforeEach(() => {
            req = new NextRequest("http://localhost/categories/1", {
                headers: { Authorization: `Bearer ${token}` }
            });
        });

        it("returns 200 with data", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.category.getById as jest.Mock).mockResolvedValueOnce(category);

            const params = { id: "1" };
            const res = await controller.getCategory(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.OK);
            expect(res.response).toBeDefined();
        });

        it("returns 400 if category is not found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.category.getById as jest.Mock).mockResolvedValueOnce(null);
            const params = { id: "1" };

            const res = await controller.getCategory(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        });
    });

    describe("Test createCategory", () => {
        const category = {
            id: 1,
            name: "testing"
        } as Category;
        
        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/api/categories", {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
                body: JSON.stringify({
                    name: "testing",
                })
            });
        });

        it("returns 201 with data", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.category.create as jest.Mock).mockResolvedValueOnce(category);

            const res = await controller.createCategory(req);

            expect(res.statusCode).toBe(STATUS_CODE.CREATED);
            expect(res.response).toBeDefined();
        });

        it("returns 400 if invalid body", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            req = new NextRequest("http://localhost:3000/api/categories", { method: "POST" });

            const res = await controller.createCategory(req);

            expect(res.statusCode).toBe(STATUS_CODE.BAD_REQUEST);
            expect(res.response).toBeDefined();
        });

        it("returns 401 if unauthorized", async () => {
            isAllowed.mockResolvedValueOnce(Response.unauthorized());

            const res = await controller.createCategory(req);

            expect(res.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(res.response).toBeDefined();
        });

        it("returns 403 if forbidden", async () => {
            isAllowed.mockResolvedValueOnce(Response.forbidden);

            const res = await controller.createCategory(req);

            expect(res.statusCode).toBe(STATUS_CODE.FORBIDDEN);
            expect(res.response).toBeDefined();
        });

        it("returns 422 if wrong body", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            req = new NextRequest("http://localhost:3000/api/categories", {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
                body: "{}"
            });

            const res = await controller.createCategory(req);

            expect(res.statusCode).toBe(STATUS_CODE.UNPROCESSABLE_ENTITY);
            expect(res.response).toBeDefined();
        });
    });

    describe("Test updateCategory", () => {
        const category = {
            id: 1,
            name: "test",
        } as Category;
        const params = { id: "1" };

        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/api/categories/1", {
                method: "PUT",
                headers: { Authorization: `Bearer ${token}` },
                body: JSON.stringify({
                    name: "test",
                    price: 100,
                    stock: 10,
                })
            });
        });

        it("returns 200 with data", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.category.getById as jest.Mock).mockResolvedValueOnce(category);
            (Repository.category.update as jest.Mock).mockResolvedValueOnce(category);

            const res = await controller.updateCategory(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.OK);
            expect(res.response).toBeDefined();
        });

        it("returns 400 if invalid body", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            req = new NextRequest("http://localhost:3000/api/categories/1", { method: "PUT" });

            const res = await controller.updateCategory(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.BAD_REQUEST);
            expect(res.response).toBeDefined();
        });

        it("returns 401 if unauthorized", async () => {
            isAllowed.mockResolvedValueOnce(Response.unauthorized());

            const res = await controller.updateCategory(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(res.response).toBeDefined();
        });

        it("returns 403 if forbidden", async () => {
            isAllowed.mockResolvedValueOnce(Response.forbidden);

            const res = await controller.updateCategory(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.FORBIDDEN);
            expect(res.response).toBeDefined();
        });

        it("returns 404 if category not found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.category.getById as jest.Mock).mockResolvedValueOnce(null);

            const res = await controller.updateCategory(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        });
    });

    describe("Test deleteCategory", () => {
        const category = {
            id: 1,
            name: "test",
        } as Category;
        const params = { id: "1" };

        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/api/category/1", {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
        });

        it("returns 200 with data", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.category.getById as jest.Mock).mockResolvedValueOnce(category);
            (Repository.category.delete as jest.Mock).mockResolvedValueOnce(category);

            const res = await controller.deleteCategory(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.OK);
            expect(res.response).toBeDefined();
        });

        it("returns 401 if unauthorized", async () => {
            isAllowed.mockResolvedValueOnce(Response.unauthorized());

            const res = await controller.deleteCategory(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(res.response).toBeDefined();
        });

        it("returns 403 if forbidden", async () => {
            isAllowed.mockResolvedValueOnce(Response.forbidden);

            const res = await controller.deleteCategory(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.FORBIDDEN);
            expect(res.response).toBeDefined();
        });

        it("returns 404 if category not found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.category.getById as jest.Mock).mockResolvedValueOnce(null);

            const res = await controller.deleteCategory(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        });
    });

    it.todo("Create test for getProducts")
});

