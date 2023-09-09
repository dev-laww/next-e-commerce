import z from "zod";

const testSchema = z.object({
    name: z.string().min(2).max(255),
    email: z.string().email(),
    age: z.number().min(18).max(99),
});

const validator = {
    testSchema
};

export default validator;
