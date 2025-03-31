import { useState } from "react";
import { Input, InputWrapper} from "@/components/Input";
import Button from "@/components/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, type ISignup } from "@/validation/signup";
import { useForm, type SubmitHandler } from "react-hook-form";
import Label from "@/components/Label";
import Loader from "@/components/Loader";
import useSessionStore from "@/store/useSessionStore";
import { useNavigate } from "react-router";

interface IFormField {
    id: string;
    label: string;
    type: "text" | "email" | "password";
    placeholder: string;
    name: keyof ISignup;
}

export default function SignUpForm() {
    const [loading, setLoading] = useState<boolean>(false);

    const { register, watch, handleSubmit, formState: { errors } } = useForm<ISignup>({ resolver: zodResolver(signupSchema) });

    const isFormIncomplete = Object.values(watch()).some((field) => field === "");
    const isButtonDisabled = isFormIncomplete || Object.keys(errors).length > 0 || loading;

    const { setSession } = useSessionStore()

    const navigate = useNavigate();

    const onSubmit: SubmitHandler<ISignup> = async (data) => {
        try {
            setLoading(true);

            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data),
                credentials: "include"
            });

            if (!response.ok) {
                return;
            }

            const res = await response.json();

            const { id, username } = res.user;
            setSession({ id, username });

            navigate("/");

        } catch (err) {
            console.error("Error during signup: ", err);
            throw(err);
        } finally {
            setLoading(false);
        }
    };

    const formFields: IFormField[] = [
        { id: "username", label: "Username", type: "text", placeholder: "Jon", name: "username" },
        { id: "email", label: "Email address", type: "email", placeholder: "example@gmail.com", name: "email" },
        { id: "password", label: "Password", type: "password", placeholder: "••••••••", name: "password" }
    ];

    return (
        <form autoComplete={"off"} method={"POST"} onSubmit={handleSubmit(onSubmit)} className={"flex flex-col mt-14 gap-y-8"}>
            {formFields.map((field) => (
                <div key={field.id} className={"form-group"}>
                    <Label id={field.id}>{field.label}</Label>
                    <InputWrapper hasError={!!errors[field.name]}>
                        <Input
                            id={field.id}
                            type={field.type}
                            placeholder={field.placeholder}
                            registration={register(field.name)}
                        />
                    </InputWrapper>
                    {errors[field.name] && (
                        <p className="errorMessage mt-1">
                            {errors[field.name]?.message}
                        </p>
                    )}
                </div>
            ))}
            <Button type={"submit"} disabled={isButtonDisabled} className={"w-full bg-button-main hover:bg-button-main-hovered active:bg-button-main-pressed disabled:text-text-disabled text-white"}>
                {loading ? <Loader size={"lg"} /> : "Sign up" }
            </Button>
        </form>
    )
}
