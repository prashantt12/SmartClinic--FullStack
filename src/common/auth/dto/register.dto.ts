import { z } from "zod";

export const RegisterDto = z.object({
    email: z.string().email({
        message: "Invalid email address",
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters long",
    }).refine((val) => /[0-9]/.test(val) && /[!@#$%^&*]/.test(val),
        {
            message: "Password must contain at least one number and one special character",
        }
    ),
    confirmPassword: z.string(),
    firstName: z.string().min(1, 'Full Name is required'),
})
.refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export type RegisterDto = z.infer<typeof RegisterDto>;