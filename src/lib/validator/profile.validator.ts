import z from "zod";

namespace Validators {
    export const update = z.object({
        firstName: z.string()
            .min(3, "First name must be at least 3 characters long")
            .max(50, "First name must not exceed 50 characters")
            .optional(),
        lastName: z.string()
            .min(3, "Last name must be at least 3 characters long")
            .max(50, "Last name must not exceed 50 characters")
            .optional(),
        username: z.string()
            .min(3, "Username must be at least 3 characters long")
            .max(50, "Username must not exceed 50 characters")
            .optional(),
        imageUrl: z.string()
            .url("Image URL must be a valid URL")
            .optional(),
        email: z.string()
            .email("Email must be a valid email address")
            .optional(),
        password: z.string({ required_error: "Password is required" })
            .min(8, "Password must be at least 8 characters long")
            .max(50, "Password must not exceed 50 characters")
    });

    export const email = z.object({
        email: z.string({ required_error: "Email is required" })
            .email("Email must be a valid email address"),
        password: z.string({ required_error: "Password is required" })
            .min(8, "Password must be at least 8 characters long")
            .max(50, "Password must not exceed 50 characters")
    })

    export const username = z.object({
        username: z.string({ required_error: "Username is required" })
            .min(3, "Username must be at least 3 characters long")
            .max(50, "Username must not exceed 50 characters"),
        password: z.string({ required_error: "Password is required" })
            .min(8, "Password must be at least 8 characters long")
            .max(50, "Password must not exceed 50 characters")
    })

    export const password = z.object({
        oldPassword: z.string({ required_error: "Old password is required" })
            .min(8, "Old password must be at least 8 characters long")
            .max(50, "Old password must not exceed 50 characters"),
        newPassword: z.string({ required_error: "Password is required" })
            .min(8, "Password must be at least 8 characters long")
            .max(50, "Password must not exceed 50 characters"),
    });

    export const addresses = z.object({
        id: z.preprocess(
            a => parseInt(a as string, 10),
            z.number().positive()
        )
            .optional(),

        pageToken: z.string().optional(),
        limit: z.preprocess(
            (a) => parseInt(a as string, 10),
            z.number().positive()
        ).optional()
    });
}

export default Validators;