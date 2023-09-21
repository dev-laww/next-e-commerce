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
            .positive(),
        price: z.number({required_error: "Price is required"})
            .positive(),
        rawPrice: z.number({required_error: "Raw price is required"})
            .positive(),
        stock: z.number({required_error: "Quantity is required"})
            .positive(),
        name: z.string({required_error: "Name is required"})
            .min(3, "Name must be at least 3 characters long")
            .max(50, "Name must not exceed 255 characters"),
    });

    export const update = z.object({
        imageUrl: z.string({required_error: "Image is required"})
            .url()
            .optional(),
        productId: z.number({required_error: "Product ID is required"})
            .positive()
            .optional(),
        price: z.number({required_error: "Price is required"})
            .positive()
            .optional(),
        rawPrice: z.number({required_error: "Raw price is required"})
            .positive()
            .optional(),
        stock: z.number({required_error: "Quantity is required"})
            .positive()
            .optional(),
        name: z.string({required_error: "Name is required"})
            .min(3, "Name must be at least 3 characters long")
            .max(50, "Name must not exceed 255 characters")
            .optional(),
    });
}

export default Validators;
