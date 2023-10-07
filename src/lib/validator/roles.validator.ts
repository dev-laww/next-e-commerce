import z from "zod";

namespace Validators {
    export const search = z.object({
        id: z.preprocess(
            (a) => parseInt(a as string, 10),
            z.number().positive()
        ).optional(),
        name: z.string().optional(),
        code: z.string().optional(),
        pageToken: z.string().optional(),
        limit: z.preprocess(
            (a) => parseInt(a as string, 10),
            z.number().positive()
        ).optional()
    });

    export const create = z.object({
        name: z.string({ required_error: "Name is required" })
            .min(3, "Name must be at least 3 characters long")
            .max(255, "Name must be at most 255 characters long"),
        code: z.string({ required_error: "Code is required" })
            .min(3, "Code must be at least 3 characters long")
            .max(255, "Code must be at most 255 characters long"),
    });

    export const update = z.object({
        name: z.string().optional(),
        code: z.string().optional(),
    });
}

export default Validators;
