import z from "zod";

namespace Validators {
    export const search = z.object({
        id: z.preprocess(
            a => parseInt(a as string, 10),
            z.number().positive("ID must be positive")
        ).optional(),
        level: z.string().optional(),
        pageToken: z.string().optional(),
        limit: z.preprocess(
            a => parseInt(a as string, 10),
            z.number().positive("Limit must be positive")
        ).optional()
    });
}

export default Validators;
