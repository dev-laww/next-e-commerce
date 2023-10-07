import z from "zod";
import { COUPON_TYPES } from "@lib/constants";

namespace Validators {
    export const search = z.object({
        id: z.preprocess(
            a => parseInt(a as string, 10),
            z.number().positive("ID must be positive")
        ).optional(),
        code: z.string().optional(),
        type: z.string().optional(),
        discount: z.preprocess(
            a => parseFloat(a as string),
            z.number().positive("Discount must be positive")
        ).optional(),
        pageToken: z.string().optional(),
        limit: z.preprocess(
            a => parseInt(a as string, 10),
            z.number().positive("Limit must be positive")
        ).optional()
    });

    export const create = z.object({
        code: z.string()
            .min(1, "Code must be at least 1 character long")
            .max(10, "Code must be at most 10 characters long")
            .optional(),
        type: z.enum([COUPON_TYPES.FIXED, COUPON_TYPES.PERCENT], {
            required_error: "Type is required",
            invalid_type_error: "Invalid type must be either fixed or percent"
        }),
        discount: z.number({ required_error: "Discount is required" })
            .positive("Discount must be positive")
    });

    export const update = z.object({
        type: z.enum([COUPON_TYPES.FIXED, COUPON_TYPES.PERCENT], {
            invalid_type_error: "Invalid type must be either fixed or percent"
        }).optional(),
        discount: z.number()
            .positive("Discount must be positive")
            .optional()
    });
}

export default Validators;
