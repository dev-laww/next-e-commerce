import { NextRequest } from "next/server";
import { Category, Role } from "@prisma/client";
import humps from 'humps';

import Validators from "@lib/validator/categories.validator";
import Response, { getSession } from "@lib/http";
import { PageToken } from "@src/lib/types";
import { generatePageToken, parsePageToken } from "@src/lib/utils/token";
import { getDatabaseLogger } from "@src/lib/utils/logging";
import { AllowPermitted, CheckBody, CheckError } from "@utils/decorator";
import Repository from "@src/repository";

@AllowPermitted
@CheckError
export default class CategoriesController {
    private logger = getDatabaseLogger({ name: "controller:categories", class: "CategoryController" })
    private repo = Repository.category;

    public async getCategories(req: NextRequest) {
        const searchParams = Object.fromEntries(req.nextUrl.searchParams);
        const filters = Validators.search.parse(searchParams);
        let { pageToken, limit, ...filter } = filters;
        limit = limit || 50;

        // Parse page token
        const parsedPageToken = parsePageToken<Category>(pageToken || "");

        let isPrevious;
        if (pageToken) {
            if (!parsedPageToken) return Response.badRequest("Invalid page token");

            isPrevious = parsedPageToken.type === "previous";
        }

        const pageSize = isPrevious ? -limit : limit;

        // Fetch the addresses
        const result = await this.repo.getAll(filter, pageSize, parsedPageToken?.cursor as Role);

        if (!result.length) return Response.notFound("No role found");

        // Determine if there are more pages
        const hasNextPage = await this.repo.getAll(filter, limit, result[result.length - 1]).then(res => res.length > 0);
        const hasPreviousPage = await this.repo.getAll(filter, -limit, result[0]).then(res => res.length > 0);

        // Generate URLs
        const nextPageToken: PageToken<Category> = {
            cursor: {
                id: result[result.length - 1].id
            },
            type: "next"
        };

        const previousPageToken: PageToken<Category> = {
            cursor: {
                id: result[0].id
            },
            type: "previous"
        };

        const nextSearchParams = new URLSearchParams({
            ...searchParams,
            pageToken: generatePageToken(nextPageToken)
        });

        const previousSearchParams = new URLSearchParams({
            ...searchParams,
            pageToken: generatePageToken(previousPageToken)
        });

        const meta = {
            hasNextPage,
            hasPreviousPage,
            previousPageUrl: hasPreviousPage ? `${ req.nextUrl.origin }/${ req.nextUrl.pathname }?${ previousSearchParams.toString() }` : undefined,
            nextPageUrl: hasNextPage ? `${ req.nextUrl.origin }/${ req.nextUrl.pathname }?${ nextSearchParams.toString() }` : undefined,
        };

        return Response.ok("Categories found", {
            result,
            meta,
        });
    }

    public async getCategory(_req: NextRequest, params: { id: string }) {
        const { id } = params;
        const category = await this.repo.getById(Number(id) || 0);

        if (!category) return Response.notFound("Category not found");

        return Response.ok("Category found", category);
    }

    @CheckBody
    public async createCategory(req: NextRequest) {
        const session = await getSession(req);
        const body = await req.json();
        const requestData = Validators.create.safeParse(body);

        if (!requestData.success) return Response.validationError(requestData.error.errors);

        const category = await this.repo.create(humps.decamelizeKeys(body) as Category);

        await this.logger.info(category, `User [${ session.id }] created category [${ category.id }] `, true);
        return Response.created("Category created successfully", category)
    }

    @CheckBody
    public async updateCategory(req: NextRequest, params: { id: string }) {
        const session = await getSession(req);
        const { id } = params;
        const categoryInfo = await this.repo.getById(Number(id) || 0);

        if (!categoryInfo) return Response.notFound("Category not found");

        const body = await req.json();
        const category = Validators.update.safeParse(body);

        if (!category.success) return Response.badRequest(category.error.message);

        const updatedCategory = await this.repo.update(categoryInfo.id, humps.decamelizeKeys(body) as Category)

        await this.logger.info(updatedCategory, `User [${ session.id }] updated category [${ id }] `, true);
        return Response.ok("Category update successful", updatedCategory);
    }

    public async deleteCategory(req: NextRequest, params: { id: string }) {
        const session = await getSession(req);
        const { id } = params;
        const category = await this.repo.getById(Number(id) || 0);

        if (!category) return Response.notFound("Category not found");

        const deletedCategory = await this.repo.delete(category.id);

        await this.logger.info(deletedCategory, `User [${ session.id }] deleted category [${ id }] `, true);
        return Response.ok("Category delete successful", deletedCategory);
    }

    public async getProducts(_req: NextRequest, params: { id: string }) {
        const { id } = params;
        const category = await this.repo.getById(Number(id) || 0);

        if (!category) return Response.notFound("Category not found");

        const products = await this.repo.getProducts(category.id);

        if (!products.length) return Response.notFound("Category products not found");

        return Response.ok("Category products found", products)
    }
}