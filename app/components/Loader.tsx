import { cn } from "@/utils/cn";

interface LoaderProps {
    readonly className?: string;
    readonly size?: "sm" | "md" | "lg";
}

export default function Loader({ className, size = "md" }: LoaderProps) {
    const sizeList = {
        sm: "size-4",
        md: "size-5",
        lg: "size-6",
    }

    const sizeClass = sizeList[size] ?? sizeList.md;

    return (
        <svg
            className={cn(sizeClass, "animate-spin text-white fill-button-main", className)}
            viewBox="0 0 100 100"
            aria-hidden="true"
        >
            <circle
                fill="none"
                strokeWidth={10}
                className="stroke-current opacity-40"
                cx="50"
                cy="50"
                r="40"
            />
            <circle
                fill="none"
                strokeWidth={10}
                className="stroke-current"
                strokeDasharray="250"
                strokeDashoffset="190"
                cx="50"
                cy="50"
                r="40"
            />
            <span className="sr-only">Loading...</span>
        </svg>
    );
}