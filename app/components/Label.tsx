import type { ReactNode } from "react";

interface ILabel {
    id: string;
    className?: string;
    children: ReactNode;
}

export default function Label({ id, className, children }: ILabel) {
    const baseClass = "text-sm font-medium text-black";


    return (
        <label htmlFor={id}
        className={baseClass + className}
        >
            {children}
        </label>
    )
}
