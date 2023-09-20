import z from "zod";

namespace Validators {
    export const testSchema = z.object({
        name: z.string().min(2).max(255),
        email: z.string().email(),
        age: z.number().min(18).max(99),
    });
}

export default Validators;
