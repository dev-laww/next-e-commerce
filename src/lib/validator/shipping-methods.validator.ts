import z from "zod";

namespace Validators {
    export const search = z.object({
        id: z.preprocess(
            a => parseInt(a as string, 10),
            z.number().positive("ID must be positive")
        ).optional(),
        name: z.string().optional(),
        price: z.preprocess(
            a => parseFloat(a as string),
            z.number().positive("Price must be positive")
        ).optional(),
        pageToken: z.string().optional(),
        limit: z.number().optional()
    });

    export const create = z.object({
        name: z.string({ required_error: "Name is required" })
            .min(3, "Name must be at least 3 characters long")
            .max(50, "Name must be at most 50 characters long"),
        price: z.number({ required_error: "Price is required" })
            .positive("Price must be positive")
    });

    export const update = z.object({
        name: z.string()
            .min(3, "Name must be at least 3 characters long")
            .max(50, "Name must be at most 50 characters long")
            .optional(),
        price: z.number()
            .positive("Price must be positive")
            .optional()
    });
}

export default Validators;
