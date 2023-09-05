import { NextRequest } from "next/server";
import { User } from "@prisma/client";

import humps from "humps";


import Response from "@lib/http";
import Validators from "@lib/validator/accounts.validator";
import { PageToken } from "@lib/types";
import AddressRepository from "@repository/address.repo";
import CartRepository from "@repository/cart.repo";
import OrderRepository from "@repository/order.repo";
import PaymentMethodRepository from "@repository/payment-method.repo";
import ReviewRepository from "@repository/review.repo";
import UserRepository from "@repository/user.repo";
import WishlistRepository from "@repository/wishlist.repo";
import { AllowPermitted, CheckBody, CheckError } from "@utils/decorator";
import { generatePageToken, parsePageToken } from "@utils/token";

@AllowPermitted
@CheckError
export default class AccountsController {
    repo = new UserRepository();

    public async getAccounts(req: NextRequest) {
        const searchParams = Object.fromEntries(req.nextUrl.searchParams);

        const filters = Validators.search.parse(searchParams);

        let { pageToken, limit, ...filter } = filters;
        limit = limit || 50;

        // Parse page token
        let cursor: User | undefined;
        let type: "next" | "previous" | undefined;
        if (pageToken) {
            const token = parsePageToken(pageToken);

            if (!token) return Response.badRequest("Invalid page token");

            const { type: tokenType, ...cursorData } = token;

            cursor = cursorData as User;
            type = tokenType;
        }

        // If type is previous, make limit negative
        const previous = type === "previous";
        let result = await this.repo.getAll(filter, previous ? -limit : limit, cursor);

        if (result.length === 0) return Response.notFound("No accounts found");

        // Parsing page tokens
        const last = result[result.length - 1];
        const first = result[0];
        const nextPageToken: PageToken = {
            id: last.id,
            type: "next"
        };
        const hasNextPage = await this.repo.getAll(filter, limit || 50, result[result.length - 1]).then(res => res.length > 0);

        const nextSearchParams = new URLSearchParams({
            ...searchParams,
            pageToken: generatePageToken(nextPageToken)
        });

        const hasPreviousPage = await this.repo.getAll(filter, limit ? -limit : -50, result[0]).then(res => res.length > 0);
        const previousPageToken: PageToken = {
            id: first.id,
            type: "previous"
        };

        const previousSearchParams = new URLSearchParams({
            ...searchParams,
            pageToken: generatePageToken(previousPageToken)
        });

        // Generate urls
        const nextUrl = `${req.nextUrl.origin}/${req.nextUrl.pathname}?${nextSearchParams.toString()}`;
        const previousUrl = `${req.nextUrl.origin}/${req.nextUrl.pathname}?${previousSearchParams.toString()}`;

        return Response.ok("Accounts found!", {
            result,
            meta: {
                hasNextPage,
                hasPreviousPage,
                previousPageUrl: hasPreviousPage ? previousUrl : undefined,
                nextPageUrl: hasNextPage ? nextUrl : undefined,
            },
        });
    }

    @CheckBody
    public async createAccount(req: NextRequest) {
        const body = await req.json();

        const user = Validators.create.safeParse(body);

        if (!user.success) return Response.badRequest(user.error.message);

        const account = await this.repo.create(humps.decamelizeKeys(user.data) as User);

        return Response.ok("Account created", account);
    }

    public async getAccount(_req: NextRequest, params: { id: string }) {
        const { id } = params;

        const account = await this.repo.getById(parseInt(id, 10) || 0);

        if (!account) return Response.notFound("Account not found");

        return Response.ok("Account found!", account);
    };

    @CheckBody
    public async updateAccount(req: NextRequest, params: { id: string }) {
        const { id } = params;

        const account = await this.repo.getById(parseInt(id, 10) || 0);

        if (!account) return Response.notFound("Account not found");

        const body = await req.json();

        const user = Validators.update.safeParse(body);

        if (!user.success) return Response.badRequest(user.error.message);

        const data = humps.decamelizeKeys(user.data) as User;

        const { emailUpdated, usernameUpdated } = {
            emailUpdated: account.email !== data.email,
            usernameUpdated: account.username !== data.username
        }

        if (emailUpdated && await this.repo.getByEmail(data.email)) {
            return Response.badRequest("Email already exists");
        }

        if (usernameUpdated && await this.repo.getByUsername(data.username)) {
            return Response.badRequest("Username already exists");
        }

        const updatedAccount = await this.repo.update(account.id, data);

        return Response.ok("Account account update successful", updatedAccount);
    }

    public async deleteAccount(_req: NextRequest, params: { id: string }) {
        const { id } = params;

        const account = await this.repo.getById(parseInt(id, 10) || 0);

        if (!account) return Response.notFound("Account not found");

        const deletedAccount = await this.repo.delete(account.id);

        return Response.ok("Account delete successful", deletedAccount);
    }

    public async getAccountRoles(_req: NextRequest, params: { id: string }) {
        const { id } = params;

        const account = await this.repo.getById(parseInt(id, 10) || 0);

        if (!account) return Response.notFound("Account not found");

        const roles = await this.repo.getRoles(account.id);

        return Response.ok("Account roles found!", roles);
    }

    @CheckBody
    public async updateAccountRoles(req: NextRequest, params: { id: string }) {
        const { id } = params;

        const account = await this.repo.getById(parseInt(id, 10) || 0);

        if (!account) return Response.notFound("Account not found");

        const body = await req.json();

        const roles = Validators.updateRole.safeParse(body);

        if (!roles.success) return Response.badRequest(roles.error.message);

        const updatedAccount = await this.repo.updateRoles(account.id, roles.data.roles);

        const accountRoles = await this.repo.getRoles(updatedAccount.id);

        return Response.ok("Updated account roles", accountRoles);
    }

    public async getPaymentMethods(_req: NextRequest, params: { id: string }) {
        const { id } = params;

        const account = await this.repo.getById(parseInt(id, 10) || 0);

        if (!account) return Response.notFound("Account not found");

        const paymentMethods = await this.repo.getPaymentMethods(account.id);

        if (!paymentMethods.length) return Response.notFound("No payment methods were found");

        return Response.ok("Account payment methods found!", paymentMethods);
    }

    public async getPaymentMethod(_req: NextRequest, params: { id: string, paymentMethodId: string }) {
        const { id, paymentMethodId } = params;

        const account = await this.repo.getById(parseInt(id, 10) || 0);

        if (!account) return Response.notFound("Account not found");

        const repo = new PaymentMethodRepository();
        const paymentMethod = await repo.getById(parseInt(paymentMethodId, 10) || 0);

        if (!paymentMethod) return Response.notFound("Payment method not found");

        return Response.ok("Account payment method found", paymentMethod);
    }

    public async getAddresses(_req: NextRequest, params: { id: string }) {
        const { id } = params;

        const account = await this.repo.getById(parseInt(id, 10) || 0);

        if (!account) return Response.notFound("Account not found");

        const addresses = await this.repo.getAddresses(account.id);

        if (!addresses.length) return Response.notFound("No addresses were found");

        return Response.ok("Account addresses found", addresses);
    }

    public async getAddress(_req: NextRequest, params: { id: string, addressId: string }) {
        const { id, addressId } = params;

        const account = await this.repo.getById(parseInt(id, 10) || 0);

        if (!account) return Response.notFound("Account not found");

        const repo = new AddressRepository();
        const address = await repo.getById(parseInt(addressId, 10) || 0);

        if (!address) return Response.notFound("Address not found");

        return Response.ok("Account address found", address);
    }

    public async getOrders(_req: NextRequest, params: { id: string }) {
        const { id } = params;

        const account = await this.repo.getById(parseInt(id, 10) || 0);

        if (!account) return Response.notFound("Account not found");

        const orders = await this.repo.getOrders(account.id);

        if (!orders.length) return Response.notFound("No orders were found");

        return Response.ok("Account orders found", orders);
    }

    public async getOrder(_req: NextRequest, params: { id: string, orderId: string }) {
        const { id, orderId } = params;

        const account = await this.repo.getById(parseInt(id, 10) || 0);

        if (!account) return Response.notFound("Account not found");

        const repo = new OrderRepository();
        const order = await repo.getById(parseInt(orderId, 10) || 0);

        if (!order) return Response.notFound("Order not found");

        return Response.ok("Account order found", order);
    }

    public async getWishlist(_req: NextRequest, params: { id: string }) {
        const { id } = params;

        const account = await this.repo.getById(parseInt(id, 10) || 0);

        if (!account) return Response.notFound("Account not found");

        const wishlist = await this.repo.getWishlist(account.id);

        if (!wishlist.length) return Response.notFound("No wishlist items were found");

        return Response.ok("Account wishlist found", wishlist);
    }

    public async getWishlistItem(_req: NextRequest, params: { id: string, wishlistItemId: string }) {
        const { id, wishlistItemId } = params;

        const account = await this.repo.getById(parseInt(id, 10) || 0);

        if (!account) return Response.notFound("Account not found");

        const repo = new WishlistRepository();
        const wishlistItem = await repo.getById(parseInt(wishlistItemId, 10) || 0);

        if (!wishlistItem) return Response.notFound("Wishlist item not found");

        return Response.ok("Account wishlist item found", wishlistItem);
    }

    public async getCart(_req: NextRequest, params: { id: string }) {
        const {id} = params;

        const account = await this.repo.getById(parseInt(id, 10) || 0);

        if (!account) return Response.notFound("Account not found");

        const cart = await this.repo.getCart(account.id);

        if (!cart.length) return Response.notFound("No cart items were found");

        return Response.ok("Account cart found", cart);
    }

    public async getCartItem(_req: NextRequest, params: { id: string, cartItemId: string }) {
        const { id, cartItemId } = params;

        const account = await this.repo.getById(parseInt(id, 10) || 0);

        if (!account) return Response.notFound("Account not found");

        const repo = new CartRepository();
        const cartItem = await repo.getById(parseInt(cartItemId, 10) || 0);

        if (!cartItem) return Response.notFound("Cart item not found");

        return Response.ok("Account cart item found", cartItem);
    }

    public async getReviews(_req: NextRequest, params: { id: string }) {
        const { id } = params;

        const account = await this.repo.getById(parseInt(id, 10) || 0);

        if (!account) return Response.notFound("Account not found");

        const reviews = await this.repo.getReviews(account.id);

        if (!reviews.length) return Response.notFound("No reviews were found");

        return Response.ok("Account reviews found", reviews);
    }

    public async getReview(_req: NextRequest, params: { id: string, reviewId: string }) {
        const { id, reviewId } = params;

        const account = await this.repo.getById(parseInt(id, 10) || 0);

        if (!account) return Response.notFound("Account not found");

        const repo = new ReviewRepository();
        const review = await repo.getById(parseInt(reviewId, 10) || 0);

        if (!review) return Response.notFound("Review not found");

        return Response.ok("Account review found", review);
    }
}
