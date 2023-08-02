import z from "zod";

const registerSchema = z.object({
    "firstName": z.string({required_error: "First name is required"})
        .min(3, "First name must be at least 3 characters")
        .max(50, "First name must be at most 50 characters"),
    "lastName": z.string({required_error: "Last name is required"})
        .min(3, "Last name must be at least 3 characters")
        .max(50, "Last name must be at most 50 characters"),
    "email": z.string({required_error: "Email is required"})
        .email("Invalid email address"),
    "imageUrl": z.optional(z.string().url("Invalid image url")),
    "password": z.string({required_error: "Password is required"})
        .min(8, "Password must be at least 8 characters")
        .max(50, "Password must be at most 50 characters"),
    "confirmPassword": z.string({required_error: "Confirm password is required"})
        .min(8, "Password must be at least 8 characters")
        .max(50, "Password must be at most 50 characters"),
})

const loginSchema = z.object({
    "email": z.string({required_error: "Email is required"})
        .email("Invalid email address"),
    "password": z.string({required_error: "Password is required"})
        .min(8, "Password must be at least 8 characters")
        .max(50, "Password must be at most 50 characters")
})

const confirmEmailSchema = z.object({
    "token": z.string({required_error: "Token is required"})
})


const refreshTokenSchema = z.object({
    "token": z.string({required_error: "Token is required"})
})

const resetPasswordSchema = z.object({
    "email": z.string({required_error: "Token is required"})
        .email("Invalid email address")
});

const confirmResetPasswordSchema = z.object({
    "token": z.string({required_error: "Token is required"}),
    "password": z.string({required_error: "Password is required"})
        .min(8, "Password must be at least 8 characters")
        .max(50, "Password must be at most 50 characters"),
})

const resendEmailSchema = z.object({
    "email": z.string({required_error: "Email is required"})
        .email("Invalid email address"),
    "type": z.enum(["otp", "token"], {required_error: "Type is required"})
});


export default {
    registerSchema,
    loginSchema,
    confirmEmailSchema,
    refreshTokenSchema,
    resetPasswordSchema,
    confirmResetPasswordSchema,
    resendEmailSchema
}