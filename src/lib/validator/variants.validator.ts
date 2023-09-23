import z from "zod";

namespace Validators {
    export const search = z.object({
        id: z.preprocess(
            a => parseInt(a as string, 10),
            z.number().positive("ID must be positive")
        ).optional(),
        productId: z.preprocess(
            a => parseInt(a as string, 10),
            z.number().positive("ID must be positive")
        ).optional(),
        pageToken: z.string().optional(),
        limit: z.number().optional()
    });

    // TODO: make this form data to accept file uploads
    export const create = z.object({
        imageUrl: z.string({required_error: "Image is required"})
            .url(),
        productId: z.number({required_error: "Product ID is required"})
            .positive("Must be positive"),
        price: z.number({required_error: "Price is required"})
            .positive("Must be positive"),
        rawPrice: z.number({required_error: "Raw price is required"})
            .positive("Must be positive"),
        stock: z.number({required_error: "Quantity is required"})
            .positive("Must be positive"),
        name: z.string({required_error: "Name is required"})
            .min(3, "Name must be at least 3 characters long")
            .max(50, "Name must not exceed 255 characters"),
    });

    export const update = z.object({
        imageUrl: z.string()
            .url()
            .optional(),
        price: z.number()
            .positive("Price must be positive")
            .optional(),
        rawPrice: z.number()
            .positive("Raw price must be positive")
            .optional(),
        stock: z.number()
            .positive("stock must be positive")
            .optional(),
        name: z.string()
            .min(3, "Name must be at least 3 characters long")
            .max(50, "Name must not exceed 255 characters")
            .optional(),
    });

    export const createReview = z.object({
        rating: z.number({required_error: "Rating is required"})
            .positive("Must be positive")
            .max(5, "Rating must be at most 5"),
        comment: z.string({required_error: "Comment is required"})
    });

    export const updateReview = z.object({
        rating: z.number()
            .positive("Must be positive")
            .max(5, "Rating must be at most 5")
            .optional(),
        comment: z.string()
            .optional()
    });
}

export default Validators;
