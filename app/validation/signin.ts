import z from "zod";

export interface ISignin {
    email: string;
    password: string;
}

export const signinSchema = z.object({
    email: z.string().nonempty("Email address is required").email("Invalid email address"),
    password: z.string().nonempty("Password is required").min(6, "Password must contain at least 6 characters"),
});

