import { NextRequest } from "next/server";

import ProductsController from "@src/controller/products.controller";
import PermissionController from "@controller/permission.controller";
import Response from "@lib/http";
import { Category, Product, ProductVariant, Review } from "@prisma/client";
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
                headers: { Authorization: `Bearer ${ token }` }
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
                headers: { Authorization: `Bearer ${ token }` }
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
                headers: { Authorization: `Bearer ${ token }` },
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
                headers: { Authorization: `Bearer ${ token }` },
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
                headers: { Authorization: `Bearer ${ token }` },
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
                headers: { Authorization: `Bearer ${ token }` },
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

    describe("Test getVariants", () => {
        const variant = {
            id: 1,
            name: "test",
            raw_price: 100,
            stock: 10
        } as ProductVariant
        const product = {
            id: 1,
            name: "test",
        } as Product;
        const params = { id: "1" };

        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/api/products/1/variants");
        });

        it("returns 200 with data", async () => {
            (isAllowed as jest.Mock).mockResolvedValueOnce(Response.ok());
            (Repository.product.getById as jest.Mock).mockResolvedValueOnce(product);
            (Repository.product.getVariants as jest.Mock).mockResolvedValueOnce([variant]);

            const res = await controller.getVariants(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.OK);
            expect(res.response).toBeDefined();
        });

        it("returns 404 if product not found", async () => {
            (isAllowed as jest.Mock).mockResolvedValueOnce(Response.ok());
            (Repository.product.getById as jest.Mock).mockResolvedValueOnce(null);

            const res = await controller.getVariants(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        });

        it("returns 404 if no variants found", async () => {
            (isAllowed as jest.Mock).mockResolvedValueOnce(Response.ok());
            (Repository.product.getById as jest.Mock).mockResolvedValueOnce(product);
            (Repository.product.getVariants as jest.Mock).mockResolvedValueOnce([]);

            const res = await controller.getVariants(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        });
    })

    describe("Test deleteVariants", () => {
        const variant = {
            id: 1,
            name: "test",
            raw_price: 100,
            stock: 10
        } as ProductVariant
        const product = {
            id: 1,
            name: "test",
        } as Product;
        const params = { id: "1" };

        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/api/products/1/variants", {
                method: "DELETE",
                headers: { Authorization: `Bearer ${ token }` },
            });
        });

        it("returns 200 with data", async () => {
            (isAllowed as jest.Mock).mockResolvedValueOnce(Response.ok());
            (Repository.product.getById as jest.Mock).mockResolvedValueOnce(product);
            (Repository.product.getVariants as jest.Mock).mockResolvedValueOnce([variant]);
            (Repository.productVariant.deleteProductVariants as jest.Mock).mockResolvedValueOnce({ count: 1 });

            const res = await controller.deleteVariants(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.OK);
            expect(res.response).toBeDefined();
        });

        it("returns 401 if unauthorized", async () => {
            (isAllowed as jest.Mock).mockResolvedValueOnce(Response.unauthorized());

            const res = await controller.deleteVariants(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(res.response).toBeDefined();
        });

        it("returns 403 if forbidden", async () => {
            (isAllowed as jest.Mock).mockResolvedValueOnce(Response.forbidden);

            const res = await controller.deleteVariants(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.FORBIDDEN);
            expect(res.response).toBeDefined();
        });

        it("returns 404 if product not found", async () => {
            (isAllowed as jest.Mock).mockResolvedValueOnce(Response.ok());
            (Repository.product.getById as jest.Mock).mockResolvedValueOnce(null);

            const res = await controller.deleteVariants(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        });

        it("returns 404 if no variants found", async () => {
            (isAllowed as jest.Mock).mockResolvedValueOnce(Response.ok());
            (Repository.product.getById as jest.Mock).mockResolvedValueOnce(product);
            (Repository.product.getVariants as jest.Mock).mockResolvedValueOnce([]);

            const res = await controller.deleteVariants(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        });
    })

    describe("Test addVariant", () => {
        const variant = {
            id: 1,
            name: "test",
            raw_price: 100,
            stock: 10
        } as ProductVariant
        const product = {
            id: 1,
            name: "test",
        } as Product;
        const params = { id: "1" };

        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/api/products/1/variants", {
                method: "POST",
                headers: { Authorization: `Bearer ${ token }` },
                body: JSON.stringify({
                    name: "test",
                    imageUrl: "https://via.placeholder.com/150",
                    stock: 10,
                    price: 100,
                    rawPrice: 100
                })
            });
        });

        it("returns 201 with data", async () => {
            (isAllowed as jest.Mock).mockResolvedValueOnce(Response.ok());
            (Repository.product.getById as jest.Mock).mockResolvedValueOnce(product);
            (Repository.product.addVariant as jest.Mock).mockResolvedValueOnce(variant);

            const res = await controller.addVariant(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.CREATED);
            expect(res.response).toBeDefined();
        });

        it("returns 400 if invalid body", async () => {
            (isAllowed as jest.Mock).mockResolvedValueOnce(Response.ok());
            req = new NextRequest("http://localhost:3000/api/products/1/variants", { method: "POST" });

            const res = await controller.addVariant(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.BAD_REQUEST);
            expect(res.response).toBeDefined();
        });

        it("returns 401 if unauthorized", async () => {
            (isAllowed as jest.Mock).mockResolvedValueOnce(Response.unauthorized());

            const res = await controller.addVariant(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(res.response).toBeDefined();
        });

        it("returns 403 if forbidden", async () => {
            (isAllowed as jest.Mock).mockResolvedValueOnce(Response.forbidden);

            const res = await controller.addVariant(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.FORBIDDEN);
            expect(res.response).toBeDefined();
        });

        it("returns 404 if product not found", async () => {
            (isAllowed as jest.Mock).mockResolvedValueOnce(Response.ok());
            (Repository.product.getById as jest.Mock).mockResolvedValueOnce(null);

            const res = await controller.addVariant(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        });

        it("returns 422 if wrong body", async () => {
            (isAllowed as jest.Mock).mockResolvedValueOnce(Response.ok());
            (Repository.product.getById as jest.Mock).mockResolvedValueOnce(product);
            req = new NextRequest("http://localhost:3000/api/products/1/variants", {
                method: "POST",
                headers: { Authorization: `Bearer ${ token }` },
                body: "{}"
            });

            const res = await controller.addVariant(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.UNPROCESSABLE_ENTITY);
            expect(res.response).toBeDefined();
        });
    });

    describe("Test updateVariant", () => {
        const variant = {
            id: 1,
            name: "test",
            raw_price: 100,
            stock: 10
        } as ProductVariant
        const product = {
            id: 1,
            name: "test",
        } as Product;
        const params = { id: "1", variantId: "1" };

        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/api/products/1/variants/1", {
                method: "PUT",
                headers: { Authorization: `Bearer ${ token }` },
                body: JSON.stringify({
                    name: "test",
                    imageUrl: "https://via.placeholder.com/150",
                    stock: 10,
                    price: 100,
                    rawPrice: 100
                })
            });
        });

        it("returns 200 with data", async () => {
            (isAllowed as jest.Mock).mockResolvedValueOnce(Response.ok());
            (Repository.product.getById as jest.Mock).mockResolvedValueOnce(product);
            (Repository.product.getVariants as jest.Mock).mockResolvedValueOnce([variant]);

            const res = await controller.updateVariant(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.OK);
            expect(res.response).toBeDefined();
        });

        it("returns 400 if invalid body", async () => {
            (isAllowed as jest.Mock).mockResolvedValueOnce(Response.ok());
            req = new NextRequest("http://localhost:3000/api/products/1/variants/1", { method: "PUT" });

            const res = await controller.updateVariant(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.BAD_REQUEST);
            expect(res.response).toBeDefined();
        });

        it("returns 401 if unauthorized", async () => {
            (isAllowed as jest.Mock).mockResolvedValueOnce(Response.unauthorized());

            const res = await controller.updateVariant(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(res.response).toBeDefined();
        });

        it("returns 403 if forbidden", async () => {
            (isAllowed as jest.Mock).mockResolvedValueOnce(Response.forbidden);

            const res = await controller.updateVariant(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.FORBIDDEN);
            expect(res.response).toBeDefined();
        });

        it("returns 404 if product not found", async () => {
            (isAllowed as jest.Mock).mockResolvedValueOnce(Response.ok());
            (Repository.product.getById as jest.Mock).mockResolvedValueOnce(null);

            const res = await controller.updateVariant(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        });

        it("returns 404 if variant not found", async () => {
            (isAllowed as jest.Mock).mockResolvedValueOnce(Response.ok());
            (Repository.product.getById as jest.Mock).mockResolvedValueOnce(product);
            (Repository.product.getVariants as jest.Mock).mockResolvedValueOnce([]);

            const res = await controller.updateVariant(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        });
    });

    describe("Test deleteVariant", () => {
        const variant = {
            id: 1,
            name: "test",
            raw_price: 100,
            stock: 10
        } as ProductVariant
        const product = {
            id: 1,
            name: "test",
        } as Product;
        const params = { id: "1", variantId: "1" };

        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/api/products/1/variants/1", {
                method: "DELETE",
                headers: { Authorization: `Bearer ${ token }` },
            });
        });

        it("returns 200 with data", async () => {
            (isAllowed as jest.Mock).mockResolvedValueOnce(Response.ok());
            (Repository.product.getById as jest.Mock).mockResolvedValueOnce(product);
            (Repository.product.getVariants as jest.Mock).mockResolvedValueOnce([variant]);
            (Repository.product.deleteVariant as jest.Mock).mockResolvedValueOnce(variant);

            const res = await controller.deleteVariant(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.OK);
            expect(res.response).toBeDefined();
        });

        it("returns 401 if unauthorized", async () => {
            (isAllowed as jest.Mock).mockResolvedValueOnce(Response.unauthorized());

            const res = await controller.deleteVariant(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(res.response).toBeDefined();
        });

        it("returns 403 if forbidden", async () => {
            (isAllowed as jest.Mock).mockResolvedValueOnce(Response.forbidden);

            const res = await controller.deleteVariant(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.FORBIDDEN);
            expect(res.response).toBeDefined();
        });

        it("returns 404 if product not found", async () => {
            (isAllowed as jest.Mock).mockResolvedValueOnce(Response.ok());
            (Repository.product.getById as jest.Mock).mockResolvedValueOnce(null);

            const res = await controller.deleteVariant(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        });

        it("returns 404 if variant not found", async () => {
            (isAllowed as jest.Mock).mockResolvedValueOnce(Response.ok());
            (Repository.product.getById as jest.Mock).mockResolvedValueOnce(product);
            (Repository.product.getVariants as jest.Mock).mockResolvedValueOnce([]);

            const res = await controller.deleteVariant(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        });
    });

    describe("Test getCategories", () => {
        const product = {
            id: 1,
            name: "test",
            description: "test description"
        } as Product;
        const category = {
            id: 1,
            name: "test",
        } as Category;
        const params = { id: "1" };

        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/api/products/1/categories");
        });

        it("returns 200 with data", async () => {
            (isAllowed as jest.Mock).mockResolvedValueOnce(Response.ok());
            (Repository.product.getById as jest.Mock).mockResolvedValueOnce(product);
            (Repository.product.getCategories as jest.Mock).mockResolvedValueOnce([category]);

            const res = await controller.getCategories(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.OK);
            expect(res.response).toBeDefined();
        });

        it("returns 404 if product not found", async () => {
            (isAllowed as jest.Mock).mockResolvedValueOnce(Response.ok());
            (Repository.product.getById as jest.Mock).mockResolvedValueOnce(null);

            const res = await controller.getCategories(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        });

        it("returns 404 if no categories found", async () => {
            (isAllowed as jest.Mock).mockResolvedValueOnce(Response.ok());
            (Repository.product.getById as jest.Mock).mockResolvedValueOnce(product);
            (Repository.product.getCategories as jest.Mock).mockResolvedValueOnce([]);

            const res = await controller.getCategories(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        });
    });

    describe("Test addCategory", () => {
        const product = {
            id: 1,
            name: "test",
            description: "test description"
        } as Product;
        const category = {
            id: 1,
            name: "test",
        } as Category;
        const params = { id: "1", categoryId: "1" };

        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/api/products/1/categories/1", {
                method: "POST",
                headers: { Authorization: `Bearer ${ token }` },
            });
        });

        it("returns 200 with data", async () => {
            (isAllowed as jest.Mock).mockResolvedValueOnce(Response.ok());
            (Repository.product.getById as jest.Mock).mockResolvedValueOnce(product);
            (Repository.product.getCategories as jest.Mock).mockResolvedValueOnce([]);
            (Repository.category.getById as jest.Mock).mockResolvedValueOnce(category);
            (Repository.product.addCategory as jest.Mock).mockResolvedValueOnce(category);

            const res = await controller.addCategory(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.OK);
            expect(res.response).toBeDefined();
        });

        it("returns 400 if product category already exists", async () => {
            (isAllowed as jest.Mock).mockResolvedValueOnce(Response.ok());
            (Repository.product.getById as jest.Mock).mockResolvedValueOnce(product);
            (Repository.product.getCategories as jest.Mock).mockResolvedValueOnce([category]);
            (Repository.category.getById as jest.Mock).mockResolvedValueOnce(category);

            const res = await controller.addCategory(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.BAD_REQUEST);
            expect(res.response).toBeDefined();
        });

        it("returns 401 if unauthorized", async () => {
            (isAllowed as jest.Mock).mockResolvedValueOnce(Response.unauthorized());

            const res = await controller.addCategory(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(res.response).toBeDefined();
        });

        it("returns 403 if forbidden", async () => {
            (isAllowed as jest.Mock).mockResolvedValueOnce(Response.forbidden);

            const res = await controller.addCategory(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.FORBIDDEN);
            expect(res.response).toBeDefined();
        });

        it("returns 404 if product not found", async () => {
            (isAllowed as jest.Mock).mockResolvedValueOnce(Response.ok());
            (Repository.product.getById as jest.Mock).mockResolvedValueOnce(null);

            const res = await controller.addCategory(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        });

        it("returns 404 if category not found", async () => {
            (isAllowed as jest.Mock).mockResolvedValueOnce(Response.ok());
            (Repository.product.getById as jest.Mock).mockResolvedValueOnce(product);
            (Repository.category.getById as jest.Mock).mockResolvedValueOnce(null);

            const res = await controller.addCategory(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        });
    });

    describe("Test deleteCategory", () => {
        const product = {
            id: 1,
            name: "test",
            description: "test description"
        } as Product;
        const category = {
            id: 1,
            name: "test",
        } as Category;
        const params = { id: "1", categoryId: "1" };

        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/api/products/1/categories/1", {
                method: "DELETE",
                headers: { Authorization: `Bearer ${ token }` },
            });
        });

        it("returns 200 with data", async () => {
            (isAllowed as jest.Mock).mockResolvedValueOnce(Response.ok());
            (Repository.product.getById as jest.Mock).mockResolvedValueOnce(product);
            (Repository.product.getCategories as jest.Mock).mockResolvedValueOnce([category]);
            (Repository.product.deleteCategory as jest.Mock).mockResolvedValueOnce(category);

            const res = await controller.deleteCategory(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.OK);
            expect(res.response).toBeDefined();
        });

        it("returns 401 if unauthorized", async () => {
            (isAllowed as jest.Mock).mockResolvedValueOnce(Response.unauthorized());

            const res = await controller.deleteCategory(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(res.response).toBeDefined();
        });

        it("returns 403 if forbidden", async () => {
            (isAllowed as jest.Mock).mockResolvedValueOnce(Response.forbidden);

            const res = await controller.deleteCategory(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.FORBIDDEN);
            expect(res.response).toBeDefined();
        });

        it("returns 404 if product not found", async () => {
            (isAllowed as jest.Mock).mockResolvedValueOnce(Response.ok());
            (Repository.product.getById as jest.Mock).mockResolvedValueOnce(null);

            const res = await controller.deleteCategory(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        });

        it("returns 404 if category not found", async () => {
            (isAllowed as jest.Mock).mockResolvedValueOnce(Response.ok());
            (Repository.product.getById as jest.Mock).mockResolvedValueOnce(product);
            (Repository.product.getCategories as jest.Mock).mockResolvedValueOnce([]);

            const res = await controller.deleteCategory(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        });

    });

    describe("Test getReviews", () => {
        const product = {
            id: 1,
            name: "test",
            description: "test description"
        } as Product;
        const review = {
            id: 1,
            rating: 5,
            user_id: 1,
            comment: "test comment"
        } as Review;
        const params = { id: "1" };

        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/api/products/1/reviews");
        });

        it("returns 200 with data", async () => {
            (isAllowed as jest.Mock).mockResolvedValueOnce(Response.ok());
            (Repository.product.getById as jest.Mock).mockResolvedValueOnce(product);
            (Repository.review.getProductReviews as jest.Mock).mockResolvedValueOnce([review]);

            const res = await controller.getReviews(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.OK);
            expect(res.response).toBeDefined();
        });

        it("returns 404 if product not found", async () => {
            (isAllowed as jest.Mock).mockResolvedValueOnce(Response.ok());
            (Repository.product.getById as jest.Mock).mockResolvedValueOnce(null);

            const res = await controller.getReviews(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        });

        it("returns 404 if no reviews found", async () => {
            (isAllowed as jest.Mock).mockResolvedValueOnce(Response.ok());
            (Repository.product.getById as jest.Mock).mockResolvedValueOnce(product);
            (Repository.review.getProductReviews as jest.Mock).mockResolvedValueOnce([]);

            const res = await controller.getReviews(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        });
    });

    describe("Test deleteReviews", () => {
        const product = {
            id: 1,
            name: "test",
            description: "test description"
        } as Product;
        const review = {
            id: 1,
            rating: 5,
            user_id: 1,
            comment: "test comment"
        } as Review;
        const params = { id: "1" };

        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/api/products/1/reviews", {
                method: "DELETE",
                headers: { Authorization: `Bearer ${ token }` },
            });
        });

        it("returns 200 with data", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.product.getById as jest.Mock).mockResolvedValueOnce(product);
            (Repository.review.getProductReviews as jest.Mock).mockResolvedValueOnce([review]);
            (Repository.review.deleteProductReviews as jest.Mock).mockResolvedValueOnce({ count: 1 });

            const res = await controller.deleteReviews(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.OK);
            expect(res.response).toBeDefined();
        });

        it("returns 401 if unauthorized", async () => {
            isAllowed.mockResolvedValueOnce(Response.unauthorized());

            const res = await controller.deleteReviews(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(res.response).toBeDefined();
        });

        it("returns 403 if forbidden", async () => {
            isAllowed.mockResolvedValueOnce(Response.forbidden);

            const res = await controller.deleteReviews(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.FORBIDDEN);
            expect(res.response).toBeDefined();
        });

        it("returns 404 if product not found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.product.getById as jest.Mock).mockResolvedValueOnce(null);

            const res = await controller.deleteReviews(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        });

        it("returns 404 if no reviews found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.product.getById as jest.Mock).mockResolvedValueOnce(product);
            (Repository.review.getProductReviews as jest.Mock).mockResolvedValueOnce([]);

            const res = await controller.deleteReviews(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        });
    });

    describe("Test addReview", () => {
        const product = {
            id: 1,
            name: "test",
            description: "test description"
        } as Product;
        const review = {
            id: 1,
            rating: 5,
            user_id: 1,
            comment: "test comment"
        } as Review;
        const params = { id: "1" };

        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/api/products/1/reviews", {
                method: "POST",
                headers: { Authorization: `Bearer ${ token }` },
                body: JSON.stringify({
                    rating: 5,
                    comment: "test comment",
                    variantId: 1
                })
            });
        });

        it("returns 201 with data", async () => {
            (isAllowed as jest.Mock).mockResolvedValueOnce(Response.ok());
            (Repository.product.getById as jest.Mock).mockResolvedValueOnce(product);
            (Repository.review.create as jest.Mock).mockResolvedValueOnce(review);

            const res = await controller.addReview(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.CREATED);
            expect(res.response).toBeDefined();
        });

        it("returns 400 if invalid body", async () => {
            (isAllowed as jest.Mock).mockResolvedValueOnce(Response.ok());
            req = new NextRequest("http://localhost:3000/api/products/1/reviews", { method: "POST" });

            const res = await controller.addReview(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.BAD_REQUEST);
            expect(res.response).toBeDefined();
        });

        it("returns 401 if unauthorized", async () => {
            (isAllowed as jest.Mock).mockResolvedValueOnce(Response.unauthorized());

            const res = await controller.addReview(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(res.response).toBeDefined();
        });

        it("returns 403 if forbidden", async () => {
            (isAllowed as jest.Mock).mockResolvedValueOnce(Response.forbidden);

            const res = await controller.addReview(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.FORBIDDEN);
            expect(res.response).toBeDefined();
        });

        it("returns 404 if product not found", async () => {
            (isAllowed as jest.Mock).mockResolvedValueOnce(Response.ok());
            (Repository.product.getById as jest.Mock).mockResolvedValueOnce(null);

            const res = await controller.addReview(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        });

        it("returns 422 if wrong body", async () => {
            (isAllowed as jest.Mock).mockResolvedValueOnce(Response.ok());
            (Repository.product.getById as jest.Mock).mockResolvedValueOnce(product);
            req = new NextRequest("http://localhost:3000/api/products/1/reviews", {
                method: "POST",
                headers: { Authorization: `Bearer ${ token }` },
                body: "{}"
            });

            const res = await controller.addReview(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.UNPROCESSABLE_ENTITY);
            expect(res.response).toBeDefined();
        });

    });

    describe("Test updateReview", () => {
        const product = {
            id: 1,
            name: "test",
            description: "test description"
        } as Product;
        const review = {
            id: 1,
            rating: 5,
            user_id: 1,
            comment: "test comment"
        } as Review;
        const params = { id: "1", reviewId: "1" };

        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/api/products/1/reviews", {
                method: "PUT",
                headers: { Authorization: `Bearer ${ token }` },
                body: JSON.stringify({
                    rating: 5,
                    comment: "test comment"
                })
            });
        });

        it("returns 200 with data", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.product.getById as jest.Mock).mockResolvedValueOnce(product);
            (Repository.review.getById as jest.Mock).mockResolvedValueOnce(review);
            (Repository.review.update as jest.Mock).mockResolvedValueOnce(review);

            const res = await controller.updateReview(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.OK);
            expect(res.response).toBeDefined();
        });

        it("returns 400 if invalid body", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            req = new NextRequest("http://localhost:3000/api/products/1/reviews", { method: "PUT" });

            const res = await controller.updateReview(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.BAD_REQUEST);
            expect(res.response).toBeDefined();
        });

        it("returns 401 if unauthorized", async () => {
            isAllowed.mockResolvedValueOnce(Response.unauthorized());

            const res = await controller.updateReview(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(res.response).toBeDefined();
        });

        it("returns 403 if forbidden", async () => {
            isAllowed.mockResolvedValueOnce(Response.forbidden);

            const res = await controller.updateReview(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.FORBIDDEN);
            expect(res.response).toBeDefined();
        });

        it("returns 404 if product not found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.product.getById as jest.Mock).mockResolvedValueOnce(null);

            const res = await controller.updateReview(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        });

        it("returns 404 if review not found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.product.getById as jest.Mock).mockResolvedValueOnce(product);
            (Repository.review.getById as jest.Mock).mockResolvedValueOnce(null);

            const res = await controller.updateReview(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        });

    });

    describe("Test deleteReview", () => {
        const product = {
            id: 1,
            name: "test",
            description: "test description"
        } as Product;
        const review = {
            id: 1,
            rating: 5,
            user_id: 1,
            comment: "test comment"
        } as Review;
        const params = { id: "1", reviewId: "1" };

        beforeEach(() => {
            req = new NextRequest("http://localhost:3000/api/products/1/reviews", {
                method: "DELETE",
                headers: { Authorization: `Bearer ${ token }` }
            });
        });

        it("returns 200 with data", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.product.getById as jest.Mock).mockResolvedValueOnce(product);
            (Repository.review.getById as jest.Mock).mockResolvedValueOnce(review);
            (Repository.review.delete as jest.Mock).mockResolvedValueOnce(review);

            const res = await controller.deleteReview(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.OK);
            expect(res.response).toBeDefined();
        });

        it("returns 401 if unauthorized", async () => {
            isAllowed.mockResolvedValueOnce(Response.unauthorized());

            const res = await controller.deleteReview(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.UNAUTHORIZED);
            expect(res.response).toBeDefined();
        });

        it("returns 403 if forbidden", async () => {
            isAllowed.mockResolvedValueOnce(Response.forbidden);

            const res = await controller.deleteReview(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.FORBIDDEN);
            expect(res.response).toBeDefined();
        });

        it("returns 404 if product not found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.product.getById as jest.Mock).mockResolvedValueOnce(null);

            const res = await controller.deleteReview(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        });

        it("returns 404 if review not found", async () => {
            isAllowed.mockResolvedValueOnce(Response.ok());
            (Repository.product.getById as jest.Mock).mockResolvedValueOnce(product);
            (Repository.review.getById as jest.Mock).mockResolvedValueOnce(null);

            const res = await controller.deleteReview(req, params);

            expect(res.statusCode).toBe(STATUS_CODE.NOT_FOUND);
            expect(res.response).toBeDefined();
        });

    });
});

