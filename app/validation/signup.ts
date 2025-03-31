import z from "zod";

export interface ISignup {
    username: string;
    email: string;
    password: string;
}

export const signupSchema = z.object({
    username: z.string().nonempty("Username is required").min(2, "Username must contain at least 2 characters"),
    email: z.string().nonempty("Email address is required").email("Invalid email address"),
    password: z.string().nonempty("Password is required").min(6, "Password must contain at least 6 characters"),
});

