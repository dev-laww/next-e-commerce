import { NextRequest } from "next/server";
import { Category } from "@prisma/client";
import humps from 'humps';

import Validators from "@lib/validator/category.validator";
import Response from "@lib/http";
import CategoryRepository from "@src/repository/category.repo";
import { PageToken } from "@src/lib/types";
import { generatePageToken, parsePageToken } from "@src/lib/utils/token";
import { getDatabaseLogger } from "@src/lib/utils/logging";
import { CheckError, AllowPermitted, AllowMethod, CheckBody } from "@utils/decorator";

@AllowPermitted
@CheckError
export default class CategoryController {
    private logger = getDatabaseLogger({ name: "controller:categories", class: "CategoryController" })
    repo = new CategoryRepository()

    @AllowMethod("GET")
    public async getCategories(req: NextRequest) {
        const searchParams = Object.fromEntries(req.nextUrl.searchParams);

        const filters = Validators.search.parse(searchParams);

        let { pageToken, limit, ...filter } = filters;
        limit = limit || 50;

        // Parse page token
        let cursor: Category | undefined;
        let type: "next" | "previous" | undefined;
        const token = parsePageToken(pageToken || "");

        if (pageToken) {
            if (!token) return Response.badRequest("Invalid page token");

            const { type: tokenType, ...cursorData } = token;

            type = tokenType;
        }

        // If type is previous, make limit negative
        const previous = type === "previous";
        let result = await this.repo.getAll(filter, previous ? -limit : limit, token?.cursor as Category);

        if (result.length === 0) return Response.notFound("No categories found");

        // Parsing page tokens
        const last = result[result.length - 1];
        const first = result[0];
        const nextPageToken: PageToken<Category> = {
            cursor: {
                id: last.id,
            },
            type: "next"
        };
        const hasNextPage = await this.repo.getAll(filter, limit || 50, result[result.length - 1]).then(res => res.length > 0);

        const nextSearchParams = new URLSearchParams({
            ...searchParams,
            pageToken: generatePageToken(nextPageToken)
        });

        const hasPreviousPage = await this.repo.getAll(filter, limit ? -limit : -50, result[0]).then(res => res.length > 0);
        const previousPageToken: PageToken<Category> = {
            cursor: {
                id: first.id,
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

        await this.logger.info("Categories found");
        return Response.ok("Categories found", {
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
    public async getCategory(_req: NextRequest, params: { id: string }) {
        const { id } = params;

        const category = await this.repo.getById(parseInt(id, 10) || 0);

        if (!category) return Response.notFound("Category not found");

        return Response.ok("Category found", category);
    }

    @AllowMethod("POST")
    @CheckBody
    public async createCategory(req: NextRequest) {
        const body = await req.json();

        const requestData = Validators.create.safeParse(body);

        if (!requestData.success) return Response.validationError(requestData.error.errors);

        const category = this.repo.create(humps.decamelizeKeys(body) as Category);

        return Response.created("Category created successfully", category)
    }

    @AllowMethod("PUT")
    @CheckBody
    public async updateCategory(req: NextRequest, params: { id: string }) {
        const { id } = params;

        const categoryInfo = await this.repo.getById(parseInt(id, 10) || 0);

        if (!categoryInfo) return Response.notFound("Category not found");

        const body = await req.json();

        const category = Validators.update.safeParse(body);

        if (!category.success) return Response.badRequest(category.error.message);

        const updatedCategory = this.repo.update(categoryInfo.id, humps.decamelizeKeys(body) as Category)

        await this.logger.info(updatedCategory, `Category [${id}] has been updated`, true);
        return Response.ok("Category update successful", updatedCategory);
    }

    @AllowMethod("DELETE")
    public async deleteCategory(_req: NextRequest, params: { id: string }) {
        const { id } = params;

        const category = await this.repo.getById(parseInt(id, 10) || 0);

        if (!category) return Response.notFound("Category not found");

        const deletedCategory = await this.repo.delete(category.id);

        await this.logger.info(deletedCategory, `Category [${id}] deleted`, true);
        return Response.ok("Category delete successful", deletedCategory);
    }

    @AllowMethod("GET")
    public async getProducts(_req: NextRequest, params: { id: string }) {
        const { id } = params;

        const category = await this.repo.getById(parseInt(id, 10) || 0);

        if (!category) return Response.notFound("Category not found");

        const products = await this.repo.getProducts(category.id);

        if (!products.length) return Response.notFound("Category products not found");

        return Response.ok("Category products found", products)
    }
}