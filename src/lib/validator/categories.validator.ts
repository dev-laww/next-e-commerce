import z from "zod";

namespace Validators {

    export const search = z.object({
        id: z.preprocess(
            (a) => parseInt(a as string, 10),
            z.number().positive()
        ).optional(),
        name: z.string().optional(),
        pageToken: z.string().optional(),
        limit: z.preprocess(
            (a) => parseInt(a as string, 10),
            z.number().positive()
        ).optional()
    });

    export const create = z.object({
        name: z.string({ required_error: "Category name is required" })
            .min(5, "Category name must be at least 5 characters")
            .max(50, "Category name must be at most 50 characters")
    });


    export const update = z.object({
        name: z.string().optional()
    });
}

export default Validators;
