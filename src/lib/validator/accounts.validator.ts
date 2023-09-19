import z from "zod";

namespace Validators {
    export const search = z.object({
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

    export const create = z.object({
        firstName: z.string({ required_error: "First name is required" })
            .min(3, "First name must be at least 3 characters")
            .max(50, "First name must be at most 50 characters"),
        lastName: z.string({ required_error: "Last name is required" })
            .min(3, "Last name must be at least 3 characters")
            .max(50, "Last name must be at most 50 characters"),
        username: z.string({ required_error: "Username is required" }),
        email: z.string({ required_error: "Email is required" })
            .email("Invalid email address"),
        imageUrl: z.optional(z.string().url("Invalid image url")),
        password: z.string({ required_error: "Password is required" })
            .min(8, "Password must be at least 8 characters")
            .max(50, "Password must be at most 50 characters"),
        confirmPassword: z.string({ required_error: "Confirm password is required" })
            .min(8, "Password must be at least 8 characters")
            .max(50, "Password must be at most 50 characters")
    })

    export const update = z.object({
        firstName: z.string()
            .min(3, "First name must be at least 3 characters")
            .max(50, "First name must be at most 50 characters")
            .optional(),
        lastName: z.string()
            .min(3, "Last name must be at least 3 characters")
            .max(50, "Last name must be at most 50 characters")
            .optional(),
        username: z.string().optional(),
        email: z.string()
            .email("Invalid email address")
            .optional(),
        imageUrl: z.string().url("Invalid image url").optional(),
        password: z.string()
            .min(8, "Password must be at least 8 characters")
            .max(50, "Password must be at most 50 characters")
            .optional(),
        confirmPassword: z.string()
            .min(8, "Password must be at least 8 characters")
            .max(50, "Password must be at most 50 characters")
            .optional()
    })

    export const updateRole = z.object({
        roles: z.array(z.preprocess(
            (a) => parseInt(a as string, 10),

            z.number().positive()
        ), { required_error: "Roles is required" }),
    })
}

export default Validators;