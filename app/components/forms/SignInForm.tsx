import { useState } from "react";
import Button from "@/components/Button";
import { Input, InputWrapper } from "@/components/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import Label from "@/components/Label";
import Loader from "@/components/Loader";
import useSessionStore from "@/store/useSessionStore";
import { useNavigate } from "react-router";
import { signinSchema, type ISignin } from "@/validation/signin";

interface IFormField {
    id: string;
    label: string;
    type: "email" | "password";
    placeholder: string;
    name: keyof ISignin;
}

export default function SignInForm() {
    const [loading, setLoading] = useState<boolean>(false);

    const { register, watch, handleSubmit, formState: { errors } } = useForm<ISignin>({ resolver: zodResolver(signinSchema) });

    const isFormIncomplete = Object.values(watch()).some((field) => field === "");
    const isButtonDisabled = isFormIncomplete || Object.keys(errors).length > 0 || loading;

    const { setSession } = useSessionStore();
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<ISignin> = async (data) => {
        try {
            setLoading(true);

            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/signin`, {
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

        } catch(error) {
            console.error("Error during sign in: ", error);
            throw(error);
        } finally {
            setLoading(false);
        }
    };

    const formFields: IFormField[] = [
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
            <Button
                type={"submit"}
                disabled={isButtonDisabled}
                className={"w-full bg-button-main hover:bg-button-main-hovered active:bg-button-main-pressed disabled:text-text-disabled text-white"}
            >
                {loading ? <Loader size={"lg"} /> : "Sign in"}
            </Button>
        </form>
    );
}