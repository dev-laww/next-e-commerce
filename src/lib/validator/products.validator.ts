import z from "zod";

const search = z.object({
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

const create = z.object({
    name: z.string({ required_error: "Product name is required" })
        .min(3, "Product name must be atleast 3 characters")
        .max(50, "Product name must be at most 50 characters"),
    description: z.string({ required_error: "Product name is required" })
        .min(15, "Product description must be atleast 10 characters")
        .max(2000, "Product description must be at most 2000 characters"),
});

const update = z.object({
    name: z.string()
        .min(3, "Product name must be atleast 3 characters")
        .max(50, "Product name must be at most 50 characters")
        .optional(),
    description: z.string({ required_error: "Product name is required" })
        .min(15, "Product description must be atleast 10 characters")
        .max(2000, "Product description must be at most 2000 characters")
        .optional(),
});

const validator = {
    search,
    create,
    update
};

export default validator;
