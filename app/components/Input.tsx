import type { InputHTMLAttributes, ReactNode } from "react";
import type { useForm } from "react-hook-form";
import {cn} from "@/utils/cn";

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
    readonly id: string;
    readonly type: "text" | "email" | "password";
    readonly placeholder?: string;
    readonly ariaInvalid?: boolean;
    readonly registration: ReturnType<ReturnType<typeof useForm>["register"]>;
}

export function Input({ id, type, registration, placeholder, ariaInvalid, ...props }: IInput) {

    return (
        <input
            id={id}
            type={type}
            placeholder={placeholder}
            aria-invalid={ariaInvalid}
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            {...registration}
            {...props}
        />
    )
}

interface IInputWrapper {
    readonly children: ReactNode;
    readonly hasError?: boolean;
    readonly className?: string;
}

export function InputWrapper({ children, hasError = false, className }: IInputWrapper) {
    return (
        <div
            className={cn(
                "bg-[#FBFBFB] w-[100%] h-[40px] rounded-[6px] outline outline-[#EEEEEE]",
                "transition-colors duration-200 focus-within:outline-button-main",
                {
                    "outline-red-600 bg-red-50": hasError,
                },
                className
            )}
        >
            {children}
        </div>
    );
}
