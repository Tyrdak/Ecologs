"use client";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost";
    size?: "sm" | "md" | "lg";
}

export default function Button({
    variant = "primary",
    size = "md",
    className = "",
    children,
    ...props
}: ButtonProps) {
    const base = "inline-flex items-center justify-center font-semibold rounded-full transition-all select-none";
    const sizes = { sm: "px-4 py-2 text-sm", md: "px-6 py-3 text-sm", lg: "px-8 py-4 text-base" };
    const variants: Record<string, React.CSSProperties> = {
        primary:   { background: "var(--green-deep)", color: "var(--white)" },
        secondary: { background: "var(--bg-alt)", color: "var(--text)", border: "1px solid var(--border)" },
        ghost:     { background: "transparent", color: "var(--text-muted)" },
    };

    return (
        <button
            className={`${base} ${sizes[size]} ${className}`}
            style={variants[variant]}
            {...props}
        >
            {children}
        </button>
    );
}
