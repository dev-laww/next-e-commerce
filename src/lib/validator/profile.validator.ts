import z from "zod";
import { PAYMENT_METHODS } from "@lib/constants";

namespace Validators {
    export const update = z.object({
        firstName: z.string()
            .min(3, "First name must be at least 3 characters long")
            .max(50, "First name must not exceed 50 characters")
            .optional(),
        lastName: z.string()
            .min(3, "Last name must be at least 3 characters long")
            .max(50, "Last name must not exceed 50 characters")
            .optional(),
        username: z.string()
            .min(3, "Username must be at least 3 characters long")
            .max(50, "Username must not exceed 50 characters")
            .optional(),
        imageUrl: z.string()
            .url("Image URL must be a valid URL")
            .optional(),
        email: z.string()
            .email("Email must be a valid email address")
            .optional(),
        password: z.string({ required_error: "Password is required" })
            .min(8, "Password must be at least 8 characters long")
            .max(50, "Password must not exceed 50 characters")
    });

    export const email = z.object({
        email: z.string({ required_error: "Email is required" })
            .email("Email must be a valid email address"),
        password: z.string({ required_error: "Password is required" })
            .min(8, "Password must be at least 8 characters long")
            .max(50, "Password must not exceed 50 characters")
    })

    export const username = z.object({
        username: z.string({ required_error: "Username is required" })
            .min(3, "Username must be at least 3 characters long")
            .max(50, "Username must not exceed 50 characters"),
        password: z.string({ required_error: "Password is required" })
            .min(8, "Password must be at least 8 characters long")
            .max(50, "Password must not exceed 50 characters")
    })

    export const password = z.object({
        oldPassword: z.string({ required_error: "Old password is required" })
            .min(8, "Old password must be at least 8 characters long")
            .max(50, "Old password must not exceed 50 characters"),
        newPassword: z.string({ required_error: "Password is required" })
            .min(8, "Password must be at least 8 characters long")
            .max(50, "Password must not exceed 50 characters"),
    });

    export const address = z.object({
        name: z.string({ required_error: "Name is required" })
            .min(3, "Name must be at least 3 characters long")
            .max(50, "Name must not exceed 50 characters"),
        address: z.string({ required_error: "Address is required" })
            .min(3, "Address must be at least 3 characters long")
            .max(50, "Address must not exceed 50 characters"),
        city: z.string({ required_error: "City is required" })
            .min(3, "City must be at least 3 characters long")
            .max(50, "City must not exceed 50 characters"),
        state: z.string({ required_error: "State is required" })
            .min(3, "State must be at least 3 characters long")
            .max(50, "State must not exceed 50 characters"),
        country: z.string({ required_error: "Country is required" })
            .min(3, "Country must be at least 3 characters long")
            .max(50, "Country must not exceed 50 characters"),
        zip: z.string({ required_error: "Zip is required" })
            .min(4, "Zip must be at least 4 characters long")
            .max(5, "Zip must not exceed 5 characters"),
        phone: z.string({ required_error: "Phone is required" })
            .min(11, "Phone must be at least 11 characters long")
            .max(11, "Phone must not exceed 11 characters")
    });

    export const updateAddress = z.object({
        name: z.string()
            .min(3, "Name must be at least 3 characters long")
            .max(50, "Name must not exceed 50 characters")
            .optional(),
        address: z.string()
            .min(3, "Address must be at least 3 characters long")
            .max(50, "Address must not exceed 50 characters")
            .optional(),
        city: z.string()
            .min(3, "City must be at least 3 characters long")
            .max(50, "City must not exceed 50 characters")
            .optional(),
        state: z.string()
            .min(3, "State must be at least 3 characters long")
            .max(50, "State must not exceed 50 characters")
            .optional(),
        country: z.string()
            .min(3, "Country must be at least 3 characters long")
            .max(50, "Country must not exceed 50 characters")
            .optional(),
        zip: z.string()
            .min(4, "Zip must be at least 4 characters long")
            .max(5, "Zip must not exceed 5 characters")
            .optional(),
        phone: z.string()
            .min(11, "Phone must be at least 11 characters long")
            .max(11, "Phone must not exceed 11 characters")
            .optional()
    });

    export const paymentMethod = z.object({
        type: z.enum([PAYMENT_METHODS.CREDIT_CARD, PAYMENT_METHODS.GOOGLE, PAYMENT_METHODS.PAYPAL]),
    });

    export const paypalAndGoogle = z.object({
        name: z.string({ required_error: "Name is required" })
            .min(3, "Name must be at least 3 characters long")
            .max(50, "Name must not exceed 50 characters"),
        email: z.string({ required_error: "Email is required" })
            .email("Email must be a valid email address")
    });

    export const creditCard = z.object({
        name: z.string({ required_error: "Name is required" })
            .min(3, "Name must be at least 3 characters long")
            .max(50, "Name must not exceed 50 characters"),
        cardNumber: z.string({ required_error: "Card number is required" })
            .min(16, "Card number must be at least 16 characters long")
            .max(16, "Card number must not exceed 16 characters"),
        expirationDate: z.string({ required_error: "Expiration date is required" })
            .min(5, "Expiration date must be at least 5 characters long")
            .max(5, "Expiration date must not exceed 5 characters"),
        cvv: z.string({ required_error: "CVV is required" })
            .min(3, "CVV must be at least 3 characters long")
            .max(3, "CVV must not exceed 3 characters")
    });

    export const updatePaypalAndGoogle = z.object({
        name: z.string({ required_error: "Name is required" })
            .min(3, "Name must be at least 3 characters long")
            .max(50, "Name must not exceed 50 characters")
            .optional(),
        email: z.string({ required_error: "Email is required" })
            .email("Email must be a valid email address")
            .optional()
    });

    export const updateCreditCard = z.object({
        name: z.string({ required_error: "Name is required" })
            .min(3, "Name must be at least 3 characters long")
            .max(50, "Name must not exceed 50 characters")
            .optional(),
        cardNumber: z.string({ required_error: "Card number is required" })
            .min(16, "Card number must be at least 16 characters long")
            .max(16, "Card number must not exceed 16 characters")
            .optional(),
        expirationDate: z.string({ required_error: "Expiration date is required" })
            .min(5, "Expiration date must be at least 5 characters long")
            .max(5, "Expiration date must not exceed 5 characters")
            .optional(),
        cvv: z.string({ required_error: "CVV is required" })
            .min(3, "CVV must be at least 3 characters long")
            .max(3, "CVV must not exceed 3 characters")
            .optional()
    });

    export const moveWishlistItemToCart = z.object({
        variantId: z.preprocess(
            a => parseInt(a as string, 10),
            z.number({ required_error: "Variant ID is required" })
                .positive()
        ),
        quantity: z.preprocess(
            a => parseInt(a as string, 10),
            z.number({ required_error: "Quantity is required" })
                .positive()
        )
    });

    export const quantity = z.object({
        quantity: z.preprocess(
            a => parseInt(a as string, 10),
            z.number({ required_error: "Quantity is required" })
                .positive()
        )
    });

    export const checkout = z.object({
        items: z.array(
            z.preprocess(
                a => parseInt(a as string, 10),
                z.number({ required_error: "Item ID is required" })
                    .positive()
            )
        ).optional(),
        shippingId: z.preprocess(
            a => parseInt(a as string, 10),
            z.number({ required_error: "Shipping ID is required" })
                .positive()
        ),
        addressId: z.preprocess(
            a => parseInt(a as string, 10),
            z.number({ required_error: "Address ID is required" })
                .positive()
        ),
        paymentMethodId: z.preprocess(
            a => parseInt(a as string, 10),
            z.number({ required_error: "Payment method ID is required" })
                .positive()
        ),
        couponCode: z.string()
            .optional()
    });
}

export default Validators;