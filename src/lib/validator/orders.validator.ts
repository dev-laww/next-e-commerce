import z from "zod";

namespace Validators {
    export const search = z.object({
        id: z.preprocess(
            a => parseInt(a as string, 10),
            z.number().positive("ID must be positive")
        ).optional(),
        userId: z.preprocess(
            a => parseInt(a as string, 10),
            z.number().positive("User ID must be positive")
        ).optional(),
        status: z.string().optional(),
        addressId: z.preprocess(
            a => parseInt(a as string, 10),
            z.number().positive("Address ID must be positive")
        ).optional(),
        shippingId: z.preprocess(
            a => parseInt(a as string, 10),
            z.number().positive("Shipping ID must be positive")
        ).optional(),
        pageToken: z.string().optional(),
        limit: z.preprocess(
            a => parseInt(a as string, 10),
            z.number().positive("Limit must be positive")
        ).optional()
    });
}

export default Validators;
