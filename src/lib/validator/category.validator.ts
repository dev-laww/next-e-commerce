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
    name: z.string({ required_error: "Category name is required" })
        .min(5, "Category name must be at least 5 characters")
        .max(50, "Category name must be at most 50 characters")
});


const update = z.object({
    name: z.string().optional()
});

const validator = {
    search,
    create,
    update
};

export default validator;
