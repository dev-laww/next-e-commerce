import z from "zod";

namespace Validators {
    export const search = z.object({
        id: z.preprocess(
            (a) => parseInt(a as string, 10),
            z.number().positive()
        ).optional(),
        name: z.string().optional(),
        categories: z.string().optional(),
        pageToken: z.string().optional(),
        limit: z.preprocess(
            (a) => parseInt(a as string, 10),
            z.number().positive()
        ).optional()
    });

    export const create = z.object({
        name: z.string({ required_error: "Product name is required" })
            .min(3, "Product name must be atleast 3 characters")
            .max(50, "Product name must be at most 50 characters"),
        description: z.string({ required_error: "Product name is required" })
            .min(15, "Product description must be atleast 15 characters")
            .max(2000, "Product description must be at most 2000 characters"),
    });

    export const update = z.object({
        name: z.string()
            .min(3, "Product name must be atleast 3 characters")
            .max(50, "Product name must be at most 50 characters")
            .optional(),
        description: z.string({ required_error: "Product name is required" })
            .min(15, "Product description must be atleast 15 characters")
            .max(2000, "Product description must be at most 2000 characters")
            .optional(),
    });

    // TODO: make this form data to accept file uploads
    export const variant = z.object({
        imageUrl: z.string({ required_error: "Image is required" })
            .url(),
        price: z.number({ required_error: "Price is required" })
            .positive("Must be positive"),
        rawPrice: z.number({ required_error: "Raw price is required" })
            .positive("Must be positive"),
        stock: z.number({ required_error: "Quantity is required" })
            .positive("Must be positive"),
        name: z.string({ required_error: "Name is required" })
            .min(3, "Name must be at least 3 characters long")
            .max(50, "Name must not exceed 255 characters"),
    });

    export const variantUpdate = z.object({
        imageUrl: z.string()
            .url()
            .optional(),
        price: z.number()
            .positive("Must be positive")
            .optional(),
        rawPrice: z.number()
            .positive("Must be positive")
            .optional(),
        stock: z.number()
            .positive("Must be positive")
            .optional(),
        name: z.string()
            .min(3, "Name must be at least 3 characters long")
            .max(50, "Name must not exceed 255 characters")
            .optional(),
    });

    export const review = z.object({
        rating: z.number({ required_error: "Rating is required" })
            .min(1, "Rating must be between 1 and 5")
            .max(5, "Rating must be between 1 and 5"),
        comment: z.string({ required_error: "Comment is required" })
            .min(3, "Comment must be at least 3 characters long")
            .max(255, "Comment must not exceed 255 characters"),
        variantId: z.number({ required_error: "Variant ID is required" })
    });

    export const reviewUpdate = z.object({
        rating: z.number({ required_error: "Rating is required" })
            .min(1, "Rating must be between 1 and 5")
            .max(5, "Rating must be between 1 and 5")
            .optional(),
        comment: z.string({ required_error: "Comment is required" })
            .min(3, "Comment must be at least 3 characters long")
            .max(255, "Comment must not exceed 255 characters")
            .optional(),
    });
}


export default Validators;
