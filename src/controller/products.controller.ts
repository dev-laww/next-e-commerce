import { NextRequest } from "next/server";
import { Product } from "@prisma/client";
import humps from 'humps';

import Validators from "@lib/validator/products.validator";
import Response from "@lib/http";
import Repository from "@src/repository";
import { getDatabaseLogger } from "@src/lib/utils/logging";
import { PageToken } from "@src/lib/types";
import { generatePageToken, parsePageToken } from "@src/lib/utils/token";
import { CheckError, CheckBody, AllowMethod, AllowPermitted } from "@utils/decorator";

@AllowPermitted
@CheckError
export default class ProductsController {
    private logger = getDatabaseLogger({ name: "controller:products", class: "ProductsController" })
    repo = Repository.product;
    categoryRepo = Repository.category;

    @AllowMethod("GET")
    public async getProducts(req: NextRequest) {
        const searchParams = Object.fromEntries(req.nextUrl.searchParams);

        const filters = Validators.search.parse(searchParams);

        let { pageToken, limit, ...filter } = filters;
        limit = limit || 50;

        let cFilter: any = filter

        if (cFilter.categories) {
            cFilter.categories = cFilter.categories
                .split(",")
                .map((categoryId: string) => parseInt(categoryId, 10) || 0)
        }

        let type: "next" | "previous" | undefined;
        const token = parsePageToken(pageToken || "");

        if (pageToken) {
            if (!token) return Response.badRequest("Invalid page token");

            const { type: tokenType, ...cursorData } = token;

            type = tokenType;
        }

        // If type is previous, make limit negative
        const previous = type === "previous";
        let result = await this.repo.getAll(cFilter, previous ? -limit : limit, token?.cursor as Product);

        if (!result.length) return Response.notFound("No products found");

        // Parsing page tokens
        const last = result[result.length - 1];
        const first = result[0];
        const nextPageToken: PageToken<Product> = {
            cursor: {
                id: last.id
            },
            type: "next"
        };
        const hasNextPage = await this.repo.getAll(cFilter, limit || 50, result[result.length - 1]).then(res => res.length > 0);

        const nextSearchParams = new URLSearchParams({
            ...searchParams,
            pageToken: generatePageToken(nextPageToken)
        });

        const hasPreviousPage = await this.repo.getAll(cFilter, limit ? -limit : -50, result[0]).then(res => res.length > 0);
        const previousPageToken: PageToken<Product> = {
            cursor: {
                id: first.id
            },
            type: "previous"
        };

        const previousSearchParams = new URLSearchParams({
            ...searchParams,
            pageToken: generatePageToken(previousPageToken)
        });

        // Generate urls
        const nextUrl = `${req.nextUrl.origin}/${req.nextUrl.pathname}?${nextSearchParams.toString()}`;
        const previousUrl = `${req.nextUrl.origin}/${req.nextUrl.pathname}?${previousSearchParams.toString()}`;

        await this.logger.info("Products found");
        return Response.ok("Products found", {
            result,
            meta: {
                hasNextPage,
                hasPreviousPage,
                previousPageUrl: hasPreviousPage ? previousUrl : undefined,
                nextPageUrl: hasNextPage ? nextUrl : undefined,
            },
        });
    }

    @AllowMethod("GET")
    public async getProduct(_req: NextRequest, params: { id: string }) {
        const { id } = params;

        const product = await this.repo.getById(parseInt(id, 10) || 0);

        if (!product) return Response.notFound("Product not found");

        return Response.ok("Product found", product);
    };

    @AllowMethod("POST")
    @CheckBody
    async createProduct(req: NextRequest) {
        const body = await req.json();

        const requestData = Validators.create.safeParse(body);

        if (!requestData.success) return Response.validationError(requestData.error.errors);

        const product = this.repo.create(humps.decamelizeKeys(body) as Product);

        return Response.created("Product created successfully", product)
    }

    @AllowMethod("PUT")
    @CheckBody
    async updateProduct(req: NextRequest, params: { id: string }) {
        const { id } = params;

        const productInfo = await this.repo.getById(parseInt(id, 10) || 0);

        if (!productInfo) return Response.notFound("Product not found");

        const body = await req.json();

        const product = Validators.update.safeParse(body);

        if (!product.success) return Response.badRequest(product.error.message);

        const updatedProduct = this.repo.update(productInfo.id, humps.decamelizeKeys(body) as Product)

        await this.logger.info(updatedProduct, `Product [${id}] has been updated`, true);
        return Response.ok("Product update successful", updatedProduct);
    }

    @AllowMethod("DELETE")
    public async deleteProduct(_req: NextRequest, params: { id: string }) {
        const { id } = params;

        const product = await this.repo.getById(parseInt(id, 10) || 0);

        if (!product) return Response.notFound("Product not found");

        const deletedProduct = await this.repo.delete(product.id);

        await this.logger.info(deletedProduct, `Product [${id}] deleted`, true);
        return Response.ok("Product delete successful", deletedProduct);
    }

    @AllowMethod("GET")
    public async getVariants(_req: NextRequest, params: { id: string }) {
        const { id } = params;

        const product = await this.repo.getById(parseInt(id, 10) || 0);

        if (!product) return Response.notFound("Product not found");

        const variants = await this.repo.getVariants(product.id);

        if (!variants.length) return Response.notFound("Product variants not found");

        return Response.ok("Product variants found", variants);  // idk if we need to check the length, we should just return the result as is, empty or not
    }

    @AllowMethod("DELETE")
    public async deleteVariant(_req: NextRequest, params: { id: string, variantId: string }) {
        const { id, variantId } = params;

        const product = await this.repo.getById(parseInt(id, 10) || 0);

        if (!product) return Response.notFound("Product not found");

        const deletedVariant = await this.repo.deleteVariant(product.id, parseInt(variantId, 10) || 0);

        if (!deletedVariant) return Response.notFound("Product variant not found")

        await this.logger.info(deletedVariant, `Product variant [${id}] deleted`, true)
        return Response.ok("Product variant delete successfull", deletedVariant)
    }

    @AllowMethod("GET")
    public async getCategories(_req: NextRequest, params: { id: string }) {
        const { id } = params;

        const product = await this.repo.getById(parseInt(id, 10) || 0);

        if (!product) return Response.notFound("Product not found");

        const categories = await this.repo.getCategories(product.id);

        return Response.ok("Product categories found", categories);
    }

    @AllowMethod("POST")
    public async addCategory(_req: NextRequest, params: { id: string, categoryId: string }) {
        const { id, categoryId } = params;

        const product = await this.repo.getById(parseInt(id, 10) || 0);

        if (!product) return Response.notFound("Product not found")

        const category = await this.categoryRepo.getById(parseInt(categoryId, 10) || 0);

        if (!category) return Response.notFound("Category not found")

        const productCategory = await this.repo.addCategory(product.id, category.id);

        return Response.ok("Category added to product", productCategory);
    }

    @AllowMethod("DELETE")
    public async deleteCategory(_req: NextRequest, params: { id: string, categoryId: string }) {
        const { id, categoryId } = params;

        const product = await this.repo.getById(parseInt(id, 10) || 0);

        if (!product) return Response.notFound("Product not found");

        const deletedCategory = await this.repo.deleteCategory(product.id, parseInt(categoryId, 10) || 0);

        if (!deletedCategory) return Response.notFound("Product category not found")

        await this.logger.info(deletedCategory, `Product category [${id}] deleted`, true)
        return Response.ok("Product category delete successfull", deletedCategory)
    }
}