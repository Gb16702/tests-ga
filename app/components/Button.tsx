import type { ButtonHTMLAttributes, ReactNode } from "react";

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
    readonly type: "button" | "reset" | "submit";
    readonly className: string;
    readonly disabled: boolean;
    readonly children: ReactNode;
    readonly onClick?: () => void;
}

export default function Button({ type, className, disabled, children, onClick }: IButton) {

    return (
        <button
            type={type}
            className={className}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    )
}
