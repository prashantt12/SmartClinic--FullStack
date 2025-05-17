import { z } from "zod";

export const RegisterDto = z.object({
    email: z.string().email({
        message: "Invalid email address",
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters long",
    }).max(20, {
        message: "Password must be at most 20 characters long",
    }).refine((val) => /[0-9]/.test(val) && /[!@#$%^&*]/.test(val),
        {
            message: "Password must contain at least one number and one special character",
        }
    ),
    confirmPassword: z.string().min(8, {
        message: "Password must be at least 8 characters long",
    }).max(20, {
        message: "Password must be at most 20 characters long",
    }).refine((val) => /[0-9]/.test(val) && /[!@#$%^&*]/.test(val),
        {
            message: "Password must contain at least one number and one special character",
        }
    ),
    firstname: z.string().min(1).max(30),
    lastname: z.string().min(1).max(30).optional(),
}).superRefine((data, ctx) => {
    data.password !== data.confirmPassword && ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
    })
});

export type RegisterDto = z.infer<typeof RegisterDto>;