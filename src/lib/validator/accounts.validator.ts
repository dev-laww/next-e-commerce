import z from "zod";


const search = z.object({
    id: z.preprocess(
        (a) => parseInt(a as string, 10),
        z.number().positive()
    ).optional(),
    first_name: z.string().optional(),
    last_name: z.string().optional(),
    image_url: z.string().optional(),
    email: z.string().optional(),
    username: z.string().optional(),
    confirmed: z.preprocess(
        (a) => (a as string).match(/true/i) !== null,
        z.boolean()
    ).optional(),
    pageToken: z.string().optional(),
    limit: z.preprocess(
        (a) => parseInt(a as string, 10),
        z.number().positive()
    ).optional()
});

const validator = {
    search
};

export default validator;