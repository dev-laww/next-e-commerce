import { NextRequest } from "next/server";

import ProductsController from "@src/controller/products.controller";
import PermissionController from "@controller/permission.controller";
import Response from "@lib/http";
import { Product, ProductVariant, ProductCategory } from "@prisma/client";
import Repository from "@src/repository";
import { STATUS_CODE } from "@lib/constants";
import { generateAccessToken } from "@utils/token";
import { UserSession } from "@lib/types";

const isAllowed = jest.spyOn(PermissionController, "isAllowed");

describe("ProductsController", () => {
    let controller: ProductsController;
    let req: NextRequest;
    const token = generateAccessToken({ id: 1, username: "test" } as UserSession);

    beforeEach(() => {
        controller = new ProductsController();
    });

    describe("Test getProducts", () => {
        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/products", {
                headers: { Authorization: `Bearer ${token}` }
            });
        });

        it("returns 200 with data", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.product.getAll as jest.Mock).mockImplementation(() => Promise.resolve([{ id: 1 }]));

            const res = await controller.getProducts(req);

            expect(res.statusCode).toBe(STATUS_CODE.OK);
            expect(res.response).toBeDefined();
        })

        it("returns 404 if no products found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.product.getAll as jest.Mock).mockResolvedValueOnce([]);

            const res = await controller.getProducts(req);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        });
    })

    describe("Test getProduct", () => {
        const product = {
            id: 1,
            name: "test",
            description: "test description"
        } as Product;

        beforeEach(() => {
            req = new NextRequest("http://localhost/products/1", {
                headers: { Authorization: `Bearer ${token}` }
            });
        });

        it("returns 200 with data", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.product.getById as jest.Mock).mockResolvedValueOnce(product);

            const params = { id: "1" };
            const res = await controller.getProduct(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.OK);
            expect(res.response).toBeDefined();
        });

        it("returns 400 if product is not found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.product.getById as jest.Mock).mockResolvedValueOnce(null);
            const params = { id: "1" };

            const res = await controller.getProduct(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        });
    });

    describe("Test createProduct", () => {
        const product = {
            id: 1,
            name: "testing",
            description: "Testing product description"
        } as Product;

        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/api/products", {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
                body: JSON.stringify({
                    name: "testing",
                    description: "Testing product description"
                })
            });
        });

        it("returns 201 with data", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.product.create as jest.Mock).mockResolvedValueOnce(product);

            const res = await controller.createProduct(req);

            expect(res.statusCode).toBe(STATUS_CODE.CREATED);
            expect(res.response).toBeDefined();
        });

        it("returns 400 if invalid body", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            req = new NextRequest("http://localhost:3000/api/products", { method: "POST" });

            const res = await controller.createProduct(req);

            expect(res.statusCode).toBe(STATUS_CODE.BAD_REQUEST);
            expect(res.response).toBeDefined();
        });

        it("returns 401 if unauthorized", async () => {
            isAllowed.mockResolvedValueOnce(Response.unauthorized());

            const res = await controller.createProduct(req);

            expect(res.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(res.response).toBeDefined();
        });

        it("returns 403 if forbidden", async () => {
            isAllowed.mockResolvedValueOnce(Response.forbidden);

            const res = await controller.createProduct(req);

            expect(res.statusCode).toBe(STATUS_CODE.FORBIDDEN);
            expect(res.response).toBeDefined();
        });

        it("returns 422 if wrong body", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            req = new NextRequest("http://localhost:3000/api/products", {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
                body: "{}"
            });

            const res = await controller.createProduct(req);

            expect(res.statusCode).toBe(STATUS_CODE.UNPROCESSABLE_ENTITY);
            expect(res.response).toBeDefined();
        });
    });

    describe("Test updateProduct", () => {
        const product = {
            id: 1,
            name: "test",
            description: "test description"
        } as Product;
        const params = { id: "1" };

        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/api/products/1", {
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
            (Repository.product.getById as jest.Mock).mockResolvedValueOnce(product);
            (Repository.product.update as jest.Mock).mockResolvedValueOnce(product);

            const res = await controller.updateProduct(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.OK);
            expect(res.response).toBeDefined();
        });

        it("returns 400 if invalid body", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            req = new NextRequest("http://localhost:3000/api/products/1", { method: "PUT" });

            const res = await controller.updateProduct(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.BAD_REQUEST);
            expect(res.response).toBeDefined();
        });

        it("returns 401 if unauthorized", async () => {
            isAllowed.mockResolvedValueOnce(Response.unauthorized());

            const res = await controller.updateProduct(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(res.response).toBeDefined();
        });

        it("returns 403 if forbidden", async () => {
            isAllowed.mockResolvedValueOnce(Response.forbidden);

            const res = await controller.updateProduct(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.FORBIDDEN);
            expect(res.response).toBeDefined();
        });

        it("returns 404 if product not found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.product.getById as jest.Mock).mockResolvedValueOnce(null);

            const res = await controller.updateProduct(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        });
    });

    describe("Test deleteProduct", () => {
        const product = {
            id: 1,
            name: "test",
            description: "test description"
        } as Product;
        const params = { id: "1" };

        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/api/product/1", {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
        });

        it("returns 200 with data", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.product.getById as jest.Mock).mockResolvedValueOnce(product);
            (Repository.product.delete as jest.Mock).mockResolvedValueOnce(product);

            const res = await controller.deleteProduct(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.OK);
            expect(res.response).toBeDefined();
        });

        it("returns 401 if unauthorized", async () => {
            isAllowed.mockResolvedValueOnce(Response.unauthorized());

            const res = await controller.deleteProduct(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(res.response).toBeDefined();
        });

        it("returns 403 if forbidden", async () => {
            isAllowed.mockResolvedValueOnce(Response.forbidden);

            const res = await controller.deleteProduct(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.FORBIDDEN);
            expect(res.response).toBeDefined();
        });

        it("returns 404 if product not found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.product.getById as jest.Mock).mockResolvedValueOnce(null);

            const res = await controller.deleteProduct(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        });
    });

    it.todo("Create test for variants and categories")
});

