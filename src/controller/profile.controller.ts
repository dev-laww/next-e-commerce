import { type NextRequest } from "next/server";

import Validators from "@lib/validator/profile.validator";
import Response, { getSession } from "@lib/http";
import { AllowPermitted, CheckBody, CheckError } from "@utils/decorator";
import Repository from "@src/repository";
import { hash } from "@utils/hashing";
import { Order, OrderItem, Prisma } from "@prisma/client";
import { COUPON_TYPES, ORDER_STATUS, PAYMENT_METHODS } from "@lib/constants";
import humps from "humps";
import { getDatabaseLogger } from "@utils/logging";

const generateOrderNumber = () => {
    const date = new Date();

    const year = date.getFullYear().toString().slice(2);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hour = date.getHours().toString().padStart(2, "0");
    const minute = date.getMinutes().toString().padStart(2, "0");
    const second = date.getSeconds().toString().padStart(2, "0");

    return `${ year }${ month }${ day }${ hour }${ minute }${ second }`;
};

@AllowPermitted
@CheckError
export default class ProfileController {
    private repo = Repository.user;
    private logger = getDatabaseLogger({ name: "ProfileController", class: "ProfileController" })

    public async getProfile(req: NextRequest) {
        const session = await getSession(req);

        await this.logger.info(`User ${ session.id } retrieved their profile`);
        return Response.ok("Profile retrieved successfully", session);
    }

    @CheckBody
    public async updateProfile(req: NextRequest) {
        const session = await getSession(req);

        const body = await req.json();

        const profile = Validators.update.safeParse(body);

        if (!profile.success) return Response.validationError(profile.error.errors);

        const isEmailUpdated = !!profile.data.email && profile.data.email !== session.email;
        const isUsernameUpdated = !!profile.data.username && profile.data.username !== session.username;

        if (isEmailUpdated) {
            const emailExists = await this.repo.getByEmail(profile.data.email!);

            if (emailExists) return Response.badRequest("Email already exists");
        }

        if (isUsernameUpdated) {
            const usernameExists = await this.repo.getByUsername(profile.data.username!);

            if (usernameExists) return Response.badRequest("Username already exists");
        }

        const passwordMatches = await this.repo.verifyPassword(session.id, profile.data.password);

        if (!passwordMatches) return Response.unauthorized("Password is incorrect");

        delete body.password;

        const updatedProfile = await this.repo.update(session.id, humps.decamelizeKeys(body)
        ).then(({ password, ...data }) => data);

        await this.logger.info(`User ${ session.id } updated their profile`, undefined, true);
        return Response.ok("Profile updated successfully", updatedProfile);
    }

    @CheckBody
    public async updateEmail(req: NextRequest) {
        const session = await getSession(req);

        const body = await req.json();

        const email = Validators.email.safeParse(body);

        if (!email.success) return Response.validationError(email.error.errors);

        const emailExists = await this.repo.getByEmail(email.data.email!);

        if (emailExists) return Response.badRequest("Email already exists");

        const passwordMatches = await this.repo.verifyPassword(session.id, email.data.password);

        if (!passwordMatches) return Response.unauthorized("Password is incorrect");

        const updatedProfile = await this.repo.update(session.id, email.data).then(({ password, ...data }) => data);

        await this.logger.info(`User ${ session.id } updated their email`, undefined, true);
        return Response.ok("Email updated successfully", updatedProfile);
    }

    @CheckBody
    public async updateUsername(req: NextRequest) {
        const session = await getSession(req);

        const body = await req.json();

        const username = Validators.username.safeParse(body);

        if (!username.success) return Response.validationError(username.error.errors);

        const usernameExists = await this.repo.getByUsername(username.data.username!);

        if (usernameExists) return Response.badRequest("Username already exists");

        const passwordMatches = await this.repo.verifyPassword(session.id, username.data.password);

        if (!passwordMatches) return Response.unauthorized("Password is incorrect");

        const updatedProfile = await this.repo.update(session.id, {
            username: username.data.username
        }).then(({ password, ...data }) => data);

        await this.logger.info(`User ${ session.id } updated their username`, undefined, true);
        return Response.ok("Username updated successfully", updatedProfile);
    }

    @CheckBody
    public async updatePassword(req: NextRequest) {
        const session = await getSession(req);

        const body = await req.json();

        const password = Validators.password.safeParse(body);

        if (!password.success) return Response.validationError(password.error.errors);

        const passwordMatches = await this.repo.verifyPassword(session.id, password.data.currentPassword);

        if (!passwordMatches) return Response.unauthorized("Password is incorrect");

        const hashedPassword = await hash(password.data.newPassword);

        const updatedProfile = await this.repo.update(session.id, {
            password: hashedPassword
        }).then(({ password, ...data }) => data);

        await this.logger.info(`User ${ session.id } updated their password`, undefined, true);
        return Response.ok("Password updated successfully", updatedProfile);
    }

    public async getAddresses(req: NextRequest) {
        const session = await getSession(req);

        const addresses = await this.repo.getAddresses(session.id);

        if (!addresses.length) return Response.notFound("No addresses found");

        await this.logger.info(`User ${ session.id } retrieved their addresses`);
        return Response.ok("Addresses retrieved successfully", addresses);
    }

    public async deleteAddresses(req: NextRequest) {
        const session = await getSession(req);

        const addressesExists = await this.repo.getAddresses(session.id).then(addresses => addresses.length > 0);

        if (!addressesExists) return Response.notFound("No address found");

        const addresses = await Repository.address.deleteUserAddresses(session.id);

        await this.logger.info(`User ${ session.id } deleted their addresses`, undefined, true);
        return Response.ok(`${ addresses.count } address${ addresses.count > 1 ? "es" : "" } deleted successfully`);
    }

    @CheckBody
    public async addAddress(req: NextRequest) {
        const session = await getSession(req);

        const body = await req.json();

        const address = Validators.address.safeParse(body);

        if (!address.success) return Response.validationError(address.error.errors);

        const newAddress = await Repository.address.create(humps.decamelizeKeys({
            ...address.data,
            user_id: session.id
        }) as Prisma.AddressCreateInput);

        await this.logger.info(address, `User ${ session.id } added an address`, true);
        return Response.created("Address added successfully", newAddress);
    }

    public async getAddress(req: NextRequest, params: { id: string }) {
        const session = await getSession(req);

        const { id } = params;

        const address = await this.repo.getAddresses(session.id).then(addresses => addresses.find(address => address.id === Number(id) || 0));

        if (!address) return Response.notFound("Address not found");

        await this.logger.info(`User ${ session.id } retrieved an address`);
        return Response.ok("Address retrieved successfully", address);
    }

    @CheckBody
    public async updateAddress(req: NextRequest, params: { id: string }) {
        const { id } = params;

        let address = await Repository.address.getById(Number(id) || 0);

        if (!address) return Response.notFound("Address not found");

        const body = await req.json();

        const updatedAddress = Validators.updateAddress.safeParse(body);

        if (!updatedAddress.success) return Response.validationError(updatedAddress.error.errors);

        address = await Repository.address.update(Number(id), humps.decamelizeKeys(updatedAddress.data));

        await this.logger.info(updatedAddress, `User ${ address.user_id } updated an address`, true);
        return Response.ok("Address updated successfully", address);
    }

    public async deleteAddress(_req: NextRequest, params: { id: string }) {
        const { id } = params;

        let address = await Repository.address.getById(Number(id) || 0);

        if (!address) return Response.notFound("Address not found");

        address = await Repository.address.delete(Number(id));

        await this.logger.info(`User ${ address.user_id } deleted an address`, undefined, true);
        return Response.ok("Address deleted successfully", address);
    }

    public async getPaymentMethods(req: NextRequest) {
        const session = await getSession(req);

        const paymentMethods = await this.repo.getPaymentMethods(session.id);

        if (!paymentMethods.length) return Response.notFound("No payment methods found");

        await this.logger.info(`User ${ session.id } retrieved their payment methods`);
        return Response.ok("Payment methods retrieved successfully", paymentMethods);
    }

    public async deletePaymentMethods(req: NextRequest) {
        const session = await getSession(req);

        const paymentMethodsExists = await this.repo.getPaymentMethods(session.id).then(paymentMethods => paymentMethods.length > 0);

        if (!paymentMethodsExists) return Response.notFound("No payment method found");

        const paymentMethods = await Repository.paymentMethod.deleteByUserId(session.id);

        await this.logger.info(`User ${ session.id } deleted their payment methods`, undefined, true);
        return Response.ok(`${ paymentMethods.count } payment method${ paymentMethods.count > 1 ? "s" : "" } deleted successfully`);
    }

    @CheckBody
    public async addPaymentMethod(req: NextRequest) {
        const session = await getSession(req);
        const body = await req.json();

        const paymentMethod = Validators.paymentMethod.safeParse(body);

        if (!paymentMethod.success) return Response.validationError(paymentMethod.error.errors);

        let validator;
        switch (paymentMethod.data.type) {
            case PAYMENT_METHODS.GOOGLE:
            case PAYMENT_METHODS.PAYPAL:
                validator = Validators.paypalAndGoogle;
                break;
            case PAYMENT_METHODS.CREDIT_CARD:
                validator = Validators.creditCard;
                break;
        }

        const paymentMethodData = validator.safeParse(body);

        if (!paymentMethodData.success) return Response.validationError(paymentMethodData.error.errors);

        const newPaymentMethod = await Repository.paymentMethod.create(humps.decamelizeKeys({
            ...body,
            user_id: session.id
        }) as Prisma.PaymentMethodCreateInput);

        await this.logger.info(paymentMethodData, `User ${ session.id } added a payment method`, true);
        return Response.created("Payment method added successfully", newPaymentMethod);
    }

    public async getPaymentMethod(req: NextRequest, params: { id: string }) {
        const session = await getSession(req);

        const { id } = params;

        const paymentMethod = await this.repo.getPaymentMethods(session.id).then(paymentMethods => paymentMethods.find(paymentMethod => paymentMethod.id === Number(id) || 0));

        if (!paymentMethod) return Response.notFound("Payment method not found");

        await this.logger.info(`User ${ session.id } retrieved a payment method`);
        return Response.ok("Payment method retrieved successfully", paymentMethod);
    }

    @CheckBody
    public async updatePaymentMethod(req: NextRequest, params: { id: string }) {
        const { id } = params;

        let paymentMethod = await Repository.paymentMethod.getById(Number(id) || 0);

        if (!paymentMethod) return Response.notFound("Payment method not found");

        const body = await req.json();

        const updatedPaymentMethod = Validators.paymentMethod.safeParse(body);

        if (!updatedPaymentMethod.success) return Response.validationError(updatedPaymentMethod.error.errors);
        let validator;
        switch (updatedPaymentMethod.data.type) {
            case PAYMENT_METHODS.GOOGLE:
            case PAYMENT_METHODS.PAYPAL:
                validator = Validators.updatePaypalAndGoogle;
                break;
            case PAYMENT_METHODS.CREDIT_CARD:
                validator = Validators.updateCreditCard;
                break;
        }

        const paymentMethodData = validator.safeParse(body);

        if (!paymentMethodData.success) return Response.validationError(paymentMethodData.error.errors);

        paymentMethod = await Repository.paymentMethod.update(Number(id), humps.decamelizeKeys(paymentMethodData.data));

        await this.logger.info(paymentMethodData, `User ${ paymentMethod.user_id } updated a payment method`, true);
        return Response.ok("Payment method updated successfully", paymentMethod);
    }

    public async deletePaymentMethod(_req: NextRequest, params: { id: string }) {
        const { id } = params;

        let paymentMethod = await Repository.paymentMethod.getById(Number(id) || 0);

        if (!paymentMethod) return Response.notFound("Payment method not found");

        paymentMethod = await Repository.paymentMethod.delete(Number(id));

        await this.logger.info(paymentMethod, `User ${ paymentMethod.user_id } deleted a payment method`, true);
        return Response.ok("Payment method deleted successfully", paymentMethod);
    }

    public async getOrders(req: NextRequest) {
        const session = await getSession(req);

        const orders = await this.repo.getOrders(session.id);

        if (!orders.length) return Response.notFound("No orders found");

        await this.logger.info(`User ${ session.id } retrieved their orders`);
        return Response.ok("Orders retrieved successfully", orders);
    }

    public async getOrder(req: NextRequest, params: { id: string }) {
        const session = await getSession(req);

        const { id } = params;

        const order = await this.repo.getOrders(session.id).then(orders => orders.find(order => order.id === Number(id) || 0));

        if (!order) return Response.notFound("Order not found");

        await this.logger.info(`User ${ session.id } retrieved an order`);
        return Response.ok("Order retrieved successfully", order);
    }

    public async cancelOrder(_req: NextRequest, params: { id: string }) {
        const { id } = params;

        let order = await Repository.order.getById(Number(id) || 0);

        if (!order) return Response.notFound("Order not found");

        if (order.status !== ORDER_STATUS.PROCESSING) return Response.badRequest("Order cannot be cancelled");

        order = await Repository.order.update(Number(id), { status: ORDER_STATUS.CANCELLED });

        await this.logger.info(order, `User ${ order.user_id } cancelled an order`, true);
        return Response.ok("Order cancelled successfully", order);
    }

    public async getWishlist(req: NextRequest) {
        const session = await getSession(req);

        const wishlist = await this.repo.getWishlist(session.id);

        if (!wishlist.length) return Response.notFound("No wishlist found");

        await this.logger.info(`User ${ session.id } retrieved their wishlist`);
        return Response.ok("Wishlist retrieved successfully", wishlist);
    }

    public async deleteWishlist(req: NextRequest) {
        const session = await getSession(req);

        const wishlistExists = await this.repo.getWishlist(session.id).then(wishlist => wishlist.length > 0);

        if (!wishlistExists) return Response.notFound("No wishlist found");

        const wishlist = await Repository.wishlist.deleteUserWishlist(session.id);

        await this.logger.info(`User ${ session.id } deleted their wishlist`, undefined, true);
        return Response.ok(`${ wishlist.count } wishlist${ wishlist.count > 1 ? "s" : "" } deleted successfully`);
    }

    public async getWishlistItem(req: NextRequest, params: { id: string }) {
        const session = await getSession(req);

        const { id } = params;

        const wishlistItem = await this.repo.getWishlist(session.id).then(wishlist => wishlist.find(wishlistItem => wishlistItem.id === Number(id) || 0));

        if (!wishlistItem) return Response.notFound("Wishlist item not found");

        await this.logger.info(`User ${ session.id } retrieved a wishlist item`);
        return Response.ok("Wishlist item retrieved successfully", wishlistItem);
    }

    public async deleteWishlistItem(_req: NextRequest, params: { id: string }) {
        const { id } = params;

        let wishlistItem = await Repository.wishlist.getById(Number(id) || 0);

        if (!wishlistItem) return Response.notFound("Wishlist item not found");

        wishlistItem = await Repository.wishlist.delete(Number(id));

        await this.logger.info(wishlistItem, `User ${ wishlistItem.user_id } deleted a wishlist item`, true);
        return Response.ok("Wishlist item deleted successfully", wishlistItem);
    }

    @CheckBody
    public async moveWishlistItemToCart(req: NextRequest, params: { id: string }) {
        const { id } = params;
        const body = await req.json();

        const reqData = Validators.moveWishlistItemToCart.safeParse(body);

        if (!reqData.success) return Response.validationError(reqData.error.errors);

        const wishlistItem = await Repository.wishlist.getById(Number(id) || 0);

        if (!wishlistItem) return Response.notFound("Wishlist item not found");

        const { created_at, updated_at, id: itemId, ...data } = wishlistItem;

        const productVariant = await Repository.productVariant.getById(reqData.data.variantId);

        if (!productVariant) return Response.notFound("Product variant not found");

        const cartItemExists = await Repository.cart.getAll({
            user_id: wishlistItem.user_id,
            variant_id: reqData.data.variantId
        });

        if (!!cartItemExists.length) return Response.badRequest("Product variant already exists in cart, please update the quantity instead");

        const cartItem = await Repository.cart.create(humps.decamelizeKeys({
            ...data,
            ...reqData.data,
            total_price: productVariant.price * reqData.data.quantity,
        }) as Prisma.CartItemCreateInput);

        await Repository.wishlist.delete(Number(id));

        await this.logger.info(cartItem, `User ${ cartItem.user_id } moved a wishlist item to cart`, true);
        return Response.created("Wishlist item moved to cart successfully", cartItem);
    }

    public async getCart(req: NextRequest) {
        const session = await getSession(req);

        const cart = await this.repo.getCart(session.id);

        if (!cart.length) return Response.notFound("No cart found");

        await this.logger.info(`User ${ session.id } retrieved their cart`);
        return Response.ok("Cart retrieved successfully", cart);
    }

    public async deleteCart(req: NextRequest) {
        const session = await getSession(req);

        const cartExists = await this.repo.getCart(session.id).then(cart => cart.length > 0);

        if (!cartExists) return Response.notFound("No cart found");

        let cart = await Repository.cart.deleteUserCart(session.id);

        await this.logger.info(`User ${ session.id } deleted their cart`, undefined, true);
        return Response.ok(`${ cart.count } cart item${ cart.count > 1 ? "s" : "" } deleted successfully`);
    }

    public async getCartItem(req: NextRequest, params: { id: string }) {
        const session = await getSession(req);

        const { id } = params;

        const cartItem = await this.repo.getCart(session.id).then(cart => cart.find(cartItem => cartItem.id === Number(id) || 0));

        if (!cartItem) return Response.notFound("Cart item not found");

        await this.logger.info(`User ${ session.id } retrieved a cart item`);
        return Response.ok("Cart item retrieved successfully", cartItem);
    }

    @CheckBody
    public async updateQuantity(req: NextRequest, params: { id: string }) {
        const { id } = params;

        let cartItem = await Repository.cart.getById(Number(id) || 0);

        if (!cartItem) return Response.notFound("Cart item not found");

        const body = await req.json();

        const quantity = Validators.quantity.safeParse(body);

        if (!quantity.success) return Response.validationError(quantity.error.errors);

        const updatedCartItem = await Repository.cart.update(Number(id), humps.decamelizeKeys({
            quantity: quantity.data.quantity,
            total_price: (cartItem.total_price / cartItem.quantity) * quantity.data.quantity
        }));

        await this.logger.info(updatedCartItem, `User ${ updatedCartItem.user_id } updated a cart item`, true);
        return Response.ok("Quantity updated successfully", updatedCartItem);
    }

    public async deleteCartItem(_req: NextRequest, params: { id: string }) {
        const { id } = params;

        let cartItem = await Repository.cart.getById(Number(id) || 0);

        if (!cartItem) return Response.notFound("Cart item not found");

        cartItem = await Repository.cart.delete(Number(id));

        await this.logger.info(cartItem, `User ${ cartItem.user_id } deleted a cart item`, true);
        return Response.ok("Cart item deleted successfully", cartItem);
    }

    @CheckBody
    public async checkout(req: NextRequest) {
        const session = await getSession(req);

        const cart = await this.repo.getCart(session.id);

        if (!cart.length) return Response.notFound("No cart found");

        const body = await req.json();

        const checkout = Validators.checkout.safeParse(body);

        if (!checkout.success) return Response.validationError(checkout.error.errors);

        let cartItems;
        if (checkout.data.items) {
            cartItems = await Repository.cart.getAll({
                id: {
                    in: checkout.data.items
                }
            });

            if (cartItems.length !== checkout.data.items.length) return Response.badRequest("Cart item not found");
        }

        cartItems = await Repository.cart.getByUserId(session.id);
        const address = await Repository.address.getById(checkout.data.addressId);
        const shipping = await Repository.shipping.getById(checkout.data.shippingId);
        const paymentMethod = await Repository.paymentMethod.getById(checkout.data.paymentMethodId);

        let coupon, couponType = COUPON_TYPES.PERCENT, couponDiscount = 0;
        if (checkout.data.couponCode) {
            coupon = await Repository.coupon.getByCode(checkout.data.couponCode);

            if (!coupon) return Response.notFound("Invalid coupon code");

            couponType = coupon.type as COUPON_TYPES;
            couponDiscount = coupon.discount;
        }

        if (!address) return Response.notFound("Address not found");

        if (!shipping) return Response.notFound("Shipping not found");

        if (!paymentMethod) return Response.notFound("Payment method not found");

        let total = cartItems.reduce((total, cartItem) => total + cartItem.total_price, 0);
        couponType === COUPON_TYPES.PERCENT ? total -= total * (couponDiscount / 100) : total -= couponDiscount;

        const order = await Repository.order.create({
            user_id: session.id,
            shipping_id: shipping.id,
            address_id: address.id,
            status: ORDER_STATUS.PROCESSING,
            payment_id: paymentMethod.id,
            order_number: generateOrderNumber(),
            total: total + shipping.price,
        } as Order);

        const orderItems = await Promise.all(cartItems.map(async cartItem => {
            const { created_at, updated_at, id: itemId, total_price, user_id, ...data } = cartItem;

            const product = await Repository.product.getById(cartItem.product_id);
            const productVariant = await Repository.productVariant.getById(cartItem.variant_id);

            if (!product) return Response.notFound("Product not found");
            if (!productVariant) return Response.notFound("Product variant not found");

            return await Repository.order.createItem({
                ...data,
                order_id: order.id,
                product_id: product.id,
                variant_id: productVariant.id,
                price: total_price,
            } as OrderItem);
        }));

        await Promise.all(cartItems.map(async cartItem => await Repository.cart.delete(cartItem.id)));

        // TODO: Apply payment gateway here or use scheduled task to check for payment status

        const orderSummary = {
            order,
            address,
            shipping,
            paymentMethod,
            coupon,
            orderItems
        }

        await this.logger.info(orderSummary, `User ${ session.id } checked out`, true);
        return Response.created("Order created successfully", orderSummary);
    }

    public async getReviews(req: NextRequest) {
        const session = await getSession(req);

        const reviews = await this.repo.getReviews(session.id);

        if (!reviews.length) return Response.notFound("No reviews found");

        await this.logger.info(`User ${ session.id } retrieved their reviews`);
        return Response.ok("Reviews retrieved successfully", reviews);
    }

    public async deleteReviews(req: NextRequest) {
        const session = await getSession(req);

        const reviewsExists = await this.repo.getReviews(session.id).then(reviews => reviews.length > 0);

        if (!reviewsExists) return Response.notFound("No reviews found");

        const reviews = await Repository.review.deleteUserReviews(session.id);

        await this.logger.info(`User ${ session.id } deleted their reviews`, undefined, true);
        return Response.ok(`${ reviews.count } reviews deleted successfully`);
    }

    public async getReview(req: NextRequest, params: { id: string }) {
        const session = await getSession(req);

        const { id } = params;

        const review = await this.repo.getReviews(session.id).then(reviews => reviews.find(review => review.id === Number(id) || 0));

        if (!review) return Response.notFound("Review not found");

        await this.logger.info(`User ${ session.id } retrieved a review`);
        return Response.ok("Review retrieved successfully", review);
    }

    public async deleteReview(_req: NextRequest, params: { id: string }) {
        const { id } = params;

        let review = await Repository.review.getById(Number(id) || 0);

        if (!review) return Response.notFound("Review not found");

        review = await Repository.review.delete(Number(id));

        await this.logger.info(review, `User ${ review.user_id } deleted a review`, true);
        return Response.ok("Review deleted successfully", review);
    }

    public async getPayments(req: NextRequest) {
        const session = await getSession(req);

        const payments = await this.repo.getPayments(session.id);

        if (!payments.length) return Response.notFound("No payments found");

        await this.logger.info(`User ${ session.id } retrieved their payments`);
        return Response.ok("Payments retrieved successfully", payments);
    }

    public async getPayment(req: NextRequest, params: { id: string }) {
        const session = await getSession(req);

        const { id } = params;

        const payment = await this.repo.getPayments(session.id).then(payments => payments.find(payment => payment.id === Number(id) || 0));

        if (!payment) return Response.notFound("Payment not found");

        await this.logger.info(`User ${ session.id } retrieved a payment`);
        return Response.ok("Payment retrieved successfully", payment);
    }
}
