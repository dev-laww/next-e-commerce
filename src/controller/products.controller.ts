import { NextRequest } from "next/server";
import { Product, ProductVariant, Review } from "@prisma/client";
import humps from 'humps';

import Validators from "@lib/validator/products.validator";
import Response, { getSession } from "@lib/http";
import Repository from "@src/repository";
import { getDatabaseLogger } from "@src/lib/utils/logging";
import { PageToken } from "@src/lib/types";
import { generatePageToken, parsePageToken } from "@src/lib/utils/token";
import { AllowPermitted, CheckBody, CheckError } from "@utils/decorator";

@AllowPermitted
@CheckError
export default class ProductsController {
    private logger = getDatabaseLogger({ name: "controller:products", class: "ProductsController" })
    private repo = Repository.product;
    private categoryRepo = Repository.category;

    public async getProducts(req: NextRequest) {
        const searchParams = Object.fromEntries(req.nextUrl.searchParams);

        const filters = Validators.search.parse(searchParams);

        let { pageToken, limit, ...filter } = filters;
        limit = limit || 50;

        let cFilter: any = filter

        if (cFilter.categories) {
            const filters = cFilter.categories
                .split(",")
                .map((categoryId: string) => Number(categoryId) || 0)

            cFilter.categories = {
                some: {
                    category: {
                        id: { in: filters }
                    }
                }
            }
        }

        let type: "next" | "previous" | undefined;
        const token = parsePageToken(pageToken || "");

        if (pageToken) {
            if (!token) return Response.badRequest("Invalid page token");

            const { type: tokenType } = token;

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

    public async getProduct(_req: NextRequest, params: { id: string }) {
        const { id } = params;

        const product = await this.repo.getById(Number(id) || 0);

        if (!product) return Response.notFound("Product not found");

        await this.logger.info(`Product found [${product.id}]`);
        return Response.ok("Product found", product);
    };

    @CheckBody
    async createProduct(req: NextRequest) {
        const session = await getSession(req);
        const body = await req.json();
        const requestData = Validators.create.safeParse(body);

        if (!requestData.success) return Response.validationError(requestData.error.errors, "Invalid data");

        const product = await this.repo.create(humps.decamelizeKeys(body) as Product);

        await this.logger.info(product, `User [${session.id}] created product [${product.id}]`, true);
        return Response.created("Product created successfully", product)
    }

    @CheckBody
    async updateProduct(req: NextRequest, params: { id: string }) {
        const session = await getSession(req);
        const { id } = params;
        const productInfo = await this.repo.getById(Number(id) || 0);

        if (!productInfo) return Response.notFound("Product not found");

        const body = await req.json();
        const product = Validators.update.safeParse(body);

        if (!product.success) return Response.badRequest(product.error.message);

        const updatedProduct = await this.repo.update(productInfo.id, humps.decamelizeKeys(product.data) as Product)

        await this.logger.info(updatedProduct, `User [${session.id}] updated product [${id}]`, true);
        return Response.ok("Product update successful", updatedProduct);
    }

    public async deleteProduct(req: NextRequest, params: { id: string }) {
        const session = await getSession(req);
        const { id } = params;
        const product = await this.repo.getById(Number(id) || 0);

        if (!product) return Response.notFound("Product not found");

        const deletedProduct = await this.repo.delete(product.id);

        await this.logger.info(deletedProduct, `User [${session.id}] deleted product [${id}]`, true);
        return Response.ok("Product delete successful", deletedProduct);
    }

    public async getVariants(_req: NextRequest, params: { id: string }) {
        const { id } = params;
        const product = await this.repo.getById(Number(id) || 0);

        if (!product) return Response.notFound("Product not found");

        const variants = await this.repo.getVariants(product.id);

        if (!variants.length) return Response.notFound("Product variants not found");

        await this.logger.info(`Product variants found for product [${product.id}]`);
        return Response.ok("Product variants found", variants);  // idk if we need to check the length, we should just return the result as is, empty or not
    }

    @CheckBody
    public async addVariant(req: NextRequest, params: { id: string }) {
        const session = await getSession(req);
        const { id } = params;
        const product = await this.repo.getById(Number(id) || 0);

        if (!product) return Response.notFound("Product not found");

        const body = await req.json();

        const variant = Validators.variant.safeParse(body);

        if (!variant.success) return Response.validationError(variant.error.errors, "Invalid data");

        const productVariant = await this.repo.addVariant(product.id, humps.decamelizeKeys(variant.data) as ProductVariant);

        await this.logger.info(productVariant, `User [${session.id}] added product variant [${productVariant.id}] for product [${product.id}]`, true);
        return Response.created("Product variant added", productVariant);
    }

    @CheckBody
    public async updateVariant(req: NextRequest, params: { id: string, variantId: string }) {
        const { id, variantId } = params;
        const session = await getSession(req);
        const product = await this.repo.getById(Number(id) || 0);

        if (!product) return Response.notFound("Product not found");

        const variantInfo = await this.repo.getVariants(product.id).then(res => res.find(variant => variant.id === Number(variantId) || 0));

        if (!variantInfo) return Response.notFound("Product variant not found");

        const body = await req.json();
        const variant = Validators.variantUpdate.safeParse(body);

        if (!variant.success) return Response.validationError(variant.error.errors, "Invalid data");

        const updatedVariant = await Repository.productVariant.update(variantInfo.id, humps.decamelizeKeys(variant.data) as ProductVariant);

        await this.logger.info(updatedVariant, `User [${session.id}] updated product variant [${variantInfo.id}] for product [${product.id}]`, true);
        return Response.ok("Product variant update successful", updatedVariant);
    }

    public async deleteVariant(req: NextRequest, params: { id: string, variantId: string }) {
        const session = await getSession(req);
        const { id, variantId } = params;
        const product = await this.repo.getById(Number(id) || 0);

        if (!product) return Response.notFound("Product not found");

        const deletedVariant = await this.repo.deleteVariant(product.id, Number(variantId) || 0);

        if (!deletedVariant) return Response.notFound("Product variant not found")

        await this.logger.info(deletedVariant, `User [${session.id}]product variant [${id}] for product [${product.id}]`, true)
        return Response.ok("Product variant delete successful", deletedVariant)
    }

    public async deleteVariants(req: NextRequest, params: { id: string }) {
        const session = await getSession(req);
        const { id } = params;
        const product = await this.repo.getById(Number(id) || 0);

        if (!product) return Response.notFound("Product not found");

        const variants = await this.repo.getVariants(product.id);

        if (!variants.length) return Response.notFound("No variants found");

        const result = await Repository.productVariant.deleteProductVariants(product.id);

        await this.logger.info(undefined, `User [${session.id}] deleted product variants [${id}] for product [${product.id}]`, true)
        return Response.ok(`${result.count} product variant${result.count > 1 ? "s" : ""} deleted successfully`)
    }

    public async getCategories(_req: NextRequest, params: { id: string }) {
        const { id } = params;

        const product = await this.repo.getById(Number(id) || 0);

        if (!product) return Response.notFound("Product not found");

        const categories = await this.repo.getCategories(product.id);

        if (!categories.length) return Response.notFound("Product categories not found");

        return Response.ok("Product categories found", categories);
    }

    public async addCategory(req: NextRequest, params: { id: string, categoryId: string }) {
        const session = await getSession(req);
        const { id, categoryId } = params;
        const product = await this.repo.getById(Number(id) || 0);

        if (!product) return Response.notFound("Product not found")

        const category = await this.categoryRepo.getById(Number(categoryId) || 0);

        if (!category) return Response.notFound("Category not found")

        let productCategory = await this.repo.getCategories(product.id).then(res => res.find(category => category.id === Number(categoryId) || 0));

        if (productCategory) return Response.badRequest(`Category already in product [${product.id}] exists`);

        productCategory = await this.repo.addCategory(product.id, category.id);

        await this.logger.info(productCategory, `User [${session.id}] added category [${category.id}] to product [${product.id}]`, true);
        return Response.ok("Category added to product");
    }

    public async deleteCategory(req: NextRequest, params: { id: string, categoryId: string }) {
        const session = await getSession(req);
        const { id, categoryId } = params;
        const product = await this.repo.getById(Number(id) || 0);

        if (!product) return Response.notFound("Product not found");

        const category = await this.repo.getCategories(product.id).then(res => res.find(category => category.id === Number(categoryId) || 0));

        if (!category) return Response.notFound("Product category not found")

        const deletedCategory = await this.repo.deleteCategory(product.id, Number(categoryId) || 0);

        await this.logger.info(deletedCategory, `User [${session.id}] removed category [${categoryId}] from product [${product.id}]`, true);
        return Response.ok("Product category removed")
    }

    public async getReviews(_req: NextRequest, params: { id: string }) {
        const { id } = params;
        const product = await this.repo.getById(Number(id) || 0);

        if (!product) return Response.notFound("Product not found");

        const reviews = await Repository.review.getProductReviews(product.id)

        if (!reviews.length) return Response.notFound("Product reviews not found");

        await this.logger.info(`Product reviews found for product [${product.id}]`);
        return Response.ok("Product reviews found", reviews);
    }

    public async deleteReviews(req: NextRequest, params: { id: string }) {
        const session = await getSession(req);
        const { id } = params;
        const product = await this.repo.getById(Number(id) || 0);

        if (!product) return Response.notFound("Product not found");

        const reviews = await Repository.review.getProductReviews(product.id);

        if (!reviews.length) return Response.notFound("No reviews found");

        const result = await Repository.review.deleteProductReviews(product.id);

        await this.logger.info(`User [${session.id}] deleted reviews for product [${product.id}]`, undefined, true);
        return Response.ok(`${result.count} review${result.count > 1 ? "s" : ""} deleted successfully`);
    }

    @CheckBody
    public async addReview(req: NextRequest, params: { id: string }) {
        const session = await getSession(req);
        const { id } = params;
        const product = await this.repo.getById(Number(id) || 0);

        if (!product) return Response.notFound("Product not found");

        const body = await req.json();

        const review = Validators.review.safeParse(body);

        if (!review.success) return Response.validationError(review.error.errors, "Invalid data");

        const productReview = await Repository.review.create(humps.decamelizeKeys({
            ...review.data,
            productId: product.id,
            userId: session.id,
        }) as Review);

        await this.logger.info(productReview, `User [${session.id}] added review [${productReview.id}] for product [${product.id}]`, true);
        return Response.created("Product review added", productReview);
    }

    @CheckBody
    public async updateReview(req: NextRequest, params: { id: string, reviewId: string }) {
        const { id, reviewId } = params;
        const session = await getSession(req);
        const product = await this.repo.getById(Number(id) || 0);

        if (!product) return Response.notFound("Product not found");

        const reviewInfo = await Repository.review.getById(Number(reviewId) || 0);

        if (!reviewInfo) return Response.notFound("Product review not found");

        const body = await req.json();
        const review = Validators.reviewUpdate.safeParse(body);

        if (!review.success) return Response.validationError(review.error.errors, "Invalid data");

        const updatedReview = await Repository.review.update(reviewInfo.id, humps.decamelizeKeys(review.data) as Review);

        await this.logger.info(updatedReview, `User [${session.id}] updated review [${reviewId}] for product [${product.id}]`, true);
        return Response.ok("Product review update successful", updatedReview);
    }

    public async deleteReview(req: NextRequest, params: { id: string, reviewId: string }) {
        const session = await getSession(req);
        const { id, reviewId } = params;
        const product = await this.repo.getById(Number(id) || 0);

        if (!product) return Response.notFound("Product not found");

        const review = await Repository.review.getById(Number(reviewId) || 0);

        if (!review) return Response.notFound("Product review not found");

        const deletedReview = await Repository.review.delete(review.id);

        await this.logger.info(deletedReview, `User [${session.id}] removed review [${reviewId}] from product [${product.id}]`, true);
        return Response.ok("Product review removed", deletedReview)
    }
}