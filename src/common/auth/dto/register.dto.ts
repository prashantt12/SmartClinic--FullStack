import { Role } from "generated/prisma";
import { createZodDto } from "nestjs-zod";
import { z } from "zod";

export const RegisterSchema = z.object({
    email: z.string().email({
        message: "Invalid email address",
    }).toLowerCase().trim(),

    password: z.string().trim().min(8, {
        message: "Password must be at least 8 characters long",
    }).max(20, {
        message: "Password must be at most 20 characters long",
    }).refine((val) => /[0-9]/.test(val) && /[!@#$%^&*]/.test(val),
        {
            message: "Password must contain at least one number and one special character",
        }
    ),

    confirmPassword: z.string().trim().min(8, {
        message: "Password must be at least 8 characters long",
    }).max(20, {
        message: "Password must be at most 20 characters long",
    }).refine((val) => /[0-9]/.test(val) && /[!@#$%^&*]/.test(val),
        {
            message: "Password must contain at least one number and one special character",
        }
    ),

    firstname: z.string().min(1).max(30).transform((val) => val.trim().toLowerCase()),
    lastname: z.string().min(1).max(30).transform((val) => val.trim().toLowerCase()).optional(),
    role: z.string().optional().transform((val) => {
        if(!val) return Role.PATIENT;
        const upper = String(val).toUpperCase();
        if (!Object.values(Role).includes(upper as Role)) {
            throw new Error("Invalid role");
        }
        return upper as Role;
    })
}).superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
        ctx.addIssue({
            code: "custom",
            path: ["confirmPassword"],
            message: "Passwords do not match",
        })
    }
});

export class RegisterDto extends createZodDto(RegisterSchema) {};