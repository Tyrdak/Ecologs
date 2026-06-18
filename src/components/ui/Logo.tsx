interface LogoProps {
    size?: "sm" | "md" | "lg";
    variant?: "dark" | "light";
}

const sizes = { sm: 28, md: 36, lg: 52 };

export default function Logo({ size = "md", variant = "dark" }: LogoProps) {
    const px = sizes[size];
    const color = variant === "dark" ? "#1A3629" : "#FDFCF9";
    const textSize = size === "sm" ? "text-base" : size === "lg" ? "text-2xl" : "text-xl";

    return (
        <div className="flex items-center gap-2.5 select-none">
            {/* Leaf + E mark */}
            <svg
                width={px}
                height={px}
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
            >
                {/* Outer circle */}
                <circle cx="20" cy="20" r="19" fill={color} />
                {/* Stylized leaf forming E */}
                <path
                    d="M12 12 Q28 12 28 20 Q28 28 12 28"
                    stroke="#74B49B"
                    strokeWidth="2.5"
                    fill="none"
                    strokeLinecap="round"
                />
                {/* E stem + bars */}
                <line x1="12" y1="12" x2="12" y2="28" stroke="#FDFCF9" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="12" y1="12" x2="24" y2="12" stroke="#FDFCF9" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="12" y1="20" x2="21" y2="20" stroke="#FDFCF9" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="12" y1="28" x2="24" y2="28" stroke="#FDFCF9" strokeWidth="2.5" strokeLinecap="round" />
                {/* Small leaf accent */}
                <circle cx="28" cy="13" r="3" fill="#C5975A" />
            </svg>
            <span
                className={`${textSize} font-semibold tracking-tight`}
                style={{
                    fontFamily: "Fraunces, Georgia, serif",
                    color,
                    fontVariationSettings: "'opsz' 36",
                }}
            >
                Ecologs
            </span>
        </div>
    );
}
