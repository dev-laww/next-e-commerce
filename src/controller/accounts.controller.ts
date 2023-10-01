import { NextRequest } from "next/server";
import { User } from "@prisma/client";

import humps from "humps";

import Response from "@lib/http";
import Validators from "@lib/validator/accounts.validator";
import { PageToken, UserSession } from "@lib/types";
import Repository from "@src/repository";
import { AllowPermitted, CheckBody, CheckError } from "@utils/decorator";
import { generatePageToken, generateRandomToken, parsePageToken } from "@utils/token";
import { hash } from "@utils/hashing";
import * as Constants from "@lib/constants";
import Email from "@utils/email";
import { getDatabaseLogger } from "@utils/logging";

// TODO: Add filters to all get methods that returns a list of items

@AllowPermitted
@CheckError
export default class AccountsController {
    private repo = Repository.user;
    private logger = getDatabaseLogger({ name: "controller:accounts", class: "AccountsController" })

    public async getAccounts(req: NextRequest) {
        const searchParams = Object.fromEntries(req.nextUrl.searchParams);
        const filters = Validators.search.parse(searchParams);

        let { pageToken, limit, ...filter } = filters;
        limit = limit || 50;

        // Parse page token
        const parsedPageToken = parsePageToken<User>(pageToken || "");

        let isPrevious;
        if (pageToken) {
            if (!parsedPageToken) return Response.badRequest("Invalid page token");

            isPrevious = parsedPageToken.type === "previous";
        }

        const pageSize = isPrevious ? -limit : limit;

        // Fetch the addresses
        const result = await Repository.user.getAll(filter, pageSize, parsedPageToken?.cursor as User);

        if (!result.length) return Response.notFound("No account found");

        // Determine if there are more pages
        const hasNextPage = await this.repo.getAll(filter, limit, result[result.length - 1]).then(res => res.length > 0);
        const hasPreviousPage = await this.repo.getAll(filter, -limit, result[0]).then(res => res.length > 0);

        // Generate URLs
        const nextPageToken: PageToken<User> = {
            cursor: {
                id: result[result.length - 1].id
            },
            type: "next"
        };

        const previousPageToken: PageToken<User> = {
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
            previousPageUrl: hasPreviousPage ? `${req.nextUrl.origin}/${req.nextUrl.pathname}?${previousSearchParams.toString()}` : undefined,
            nextPageUrl: hasNextPage ? `${req.nextUrl.origin}/${req.nextUrl.pathname}?${nextSearchParams.toString()}` : undefined,
        };

        return Response.ok("Accounts found", {
            result,
            meta,
        });
    }

    @CheckBody
    public async createAccount(req: NextRequest) {
        const body = await req.json();
        const requestData = Validators.create.safeParse(body);

        if (!requestData.success) return Response.validationError(requestData.error.errors);

        if (body.password !== body.confirmPassword) return Response.badRequest("Passwords do not match");

        delete body.confirmPassword;

        const userExistsByEmail = await this.repo.getByEmail(body.email);
        const userExistsByUsername = await this.repo.getByUsername(body.username);

        if (userExistsByEmail) return Response.badRequest("Email already exists");
        if (userExistsByUsername) return Response.badRequest("Username already exists");

        body.password = await hash(body.password);

        const user = await this.repo.create(humps.decamelizeKeys(body) as User)
        const userSession: UserSession = {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            username: user.username,
            image_url: user.image_url
        }

        const token = generateRandomToken();
        const confirmationToken = await this.repo.generateTokenOTP(
            user.id,
            token,
            Constants.TOKEN_TYPE.EMAIL_CONFIRMATION_TOKEN
        );

        if (!confirmationToken) {
            await this.logger.error("Failed to generate confirmation token", undefined, true);
            await this.repo.delete(user.id);
            return Response.internalServerError("Failed to generate confirmation token");
        }

        try {
            await Email.sendToken(user.email, token)
        } catch (error) {
            await this.logger.error(error);
            await this.repo.delete(user.id);
            return Response.internalServerError("Failed to send confirmation email");
        }

        return Response.created("Account created successfully", userSession);
    }

    public async getAccount(_req: NextRequest, params: { id: string }) {
        const { id } = params;
        const account = await this.repo.getById(parseInt(id, 10) || 0);

        if (!account) return Response.notFound("Account not found");

        return Response.ok("Account found", account);
    };

    @CheckBody
    public async updateAccount(req: NextRequest, params: { id: string }) {
        const { id } = params;
        const account = await this.repo.getById(parseInt(id, 10) || 0);

        if (!account) return Response.notFound("Account not found");

        const body = await req.json();

        const user = Validators.update.safeParse(body);

        if (!user.success) return Response.badRequest(user.error.message);

        if (user.data.password !== user.data.confirmPassword) return Response.badRequest("Passwords do not match");

        delete body.confirmPassword;

        body.password = await hash(body.password);

        const data = humps.decamelizeKeys(body) as User;

        const { emailUpdated, usernameUpdated } = {
            emailUpdated: account.email !== data.email,
            usernameUpdated: account.username !== data.username
        }

        if (emailUpdated && await this.repo.getByEmail(data.email))
            return Response.badRequest("Email already exists");

        if (usernameUpdated && await this.repo.getByUsername(data.username))
            return Response.badRequest("Username already exists");

        const updatedAccount = await this.repo.update(account.id, data);

        await this.logger.info(updatedAccount, `Account [${id}] has been updated`, true);
        return Response.ok("Account account update successful", updatedAccount);
    }

    public async deleteAccount(_req: NextRequest, params: { id: string }) {
        const { id } = params;
        const account = await this.repo.getById(parseInt(id, 10) || 0);

        if (!account) return Response.notFound("Account not found");

        const deletedAccount = await this.repo.delete(account.id);

        await this.logger.info(deletedAccount, `Account [${id}] deleted`, true);
        return Response.ok("Account delete successful", deletedAccount);
    }

    public async getAccountRoles(_req: NextRequest, params: { id: string }) {
        const { id } = params;
        const account = await this.repo.getById(parseInt(id, 10) || 0);

        if (!account) return Response.notFound("Account not found");

        const roles = await this.repo.getRoles(account.id);

        if (!roles.length) return Response.notFound("No roles were found");

        return Response.ok("Account roles found", roles);
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

        await this.logger.info(accountRoles, `Account [${id}] roles updated`, true);
        return Response.ok("Updated account roles", accountRoles);
    }

    public async getPaymentMethods(_req: NextRequest, params: { id: string }) {
        const { id } = params;
        const account = await this.repo.getById(parseInt(id, 10) || 0);

        if (!account) return Response.notFound("Account not found");

        const paymentMethods = await this.repo.getPaymentMethods(account.id);

        if (!paymentMethods.length) return Response.notFound("No payment methods were found");

        return Response.ok("Account payment methods found", paymentMethods);
    }

    public async getPaymentMethod(_req: NextRequest, params: { id: string, paymentMethodId: string }) {
        const { id, paymentMethodId } = params;
        const account = await this.repo.getById(parseInt(id, 10) || 0);

        if (!account) return Response.notFound("Account not found");

        const paymentMethod = await this.repo.getPaymentMethods(account.id).then(res => res.find(pm => pm.id === parseInt(paymentMethodId, 10) || 0));

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

        const address = await this.repo.getAddresses(account.id).then(res => res.find(a => a.id === parseInt(addressId, 10) || 0));

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

        const order = await this.repo.getOrders(account.id).then(res => res.find(o => o.id === parseInt(orderId, 10) || 0));

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

        const wishlistItem = await this.repo.getWishlist(account.id).then(res => res.find(w => w.id === parseInt(wishlistItemId, 10) || 0));

        if (!wishlistItem) return Response.notFound("Wishlist item not found");

        return Response.ok("Account wishlist item found", wishlistItem);
    }

    public async getCart(_req: NextRequest, params: { id: string }) {
        const { id } = params;
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

        const cartItem = await this.repo.getCart(account.id).then(res => res.find(w => w.id === parseInt(cartItemId, 10) || 0));

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

        const review = await this.repo.getReviews(account.id).then(res => res.find(r => r.id === parseInt(reviewId, 10) || 0));

        if (!review) return Response.notFound("Review not found");

        return Response.ok("Account review found", review);
    }

    public async getPayments(_req: NextRequest, params: { id: string }) {
        const { id } = params;
        const account = await this.repo.getById(parseInt(id, 10) || 0);

        if (!account) return Response.notFound("Account not found");

        const payments = await this.repo.getPayments(account.id);

        if (!payments.length) return Response.notFound("No payments were found");

        return Response.ok("Account payments found", payments);
    }

    public async getPayment(_req: NextRequest, params: { id: string, paymentId: string }) {
        const { id, paymentId } = params;
        const account = await this.repo.getById(parseInt(id, 10) || 0);

        if (!account) return Response.notFound("Account not found");

        const payment = await this.repo.getPayments(account.id).then(res => res.find(p => p.id === parseInt(paymentId, 10) || 0));

        if (!payment) return Response.notFound("Payment not found");

        return Response.ok("Account payment found", payment);
    }
}
