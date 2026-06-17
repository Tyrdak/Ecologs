"use client";

interface NumberFieldProps {
    label: string;
    value: number;
    onChange: (v: number) => void;
    min?: number;
    max?: number;
    step?: number;
    unit?: string;
    hint?: string;
    disabled?: boolean;
}

export function NumberField({
    label, value, onChange, min = 0, max = 999999, step = 1, unit, hint, disabled
}: NumberFieldProps) {
    return (
        <div className={disabled ? "opacity-40 pointer-events-none" : ""}>
            <label className="block text-sm font-medium mb-1" style={{ color: "var(--text)" }}>
                {label}
                {hint && (
                    <span className="ml-2 text-xs font-normal" style={{ color: "var(--text-muted)" }}>
                        {hint}
                    </span>
                )}
            </label>
            <div
                className="flex items-center rounded-xl overflow-hidden"
                style={{ border: "1.5px solid var(--border)", background: "var(--bg-card)" }}
            >
                <input
                    type="number"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={e => onChange(Math.max(min, Math.min(max, Number(e.target.value))))}
                    className="flex-1 px-4 py-3 text-sm outline-none bg-transparent"
                    style={{ color: "var(--text)" }}
                />
                {unit && (
                    <span
                        className="px-4 py-3 text-xs font-medium border-l"
                        style={{ color: "var(--text-muted)", borderColor: "var(--border)", background: "var(--bg-alt)" }}
                    >
                        {unit}
                    </span>
                )}
            </div>
        </div>
    );
}

interface SliderFieldProps {
    label: string;
    value: number;
    onChange: (v: number) => void;
    min?: number;
    max: number;
    step?: number;
    unit?: string;
    format?: (v: number) => string;
    presets?: { label: string; value: number }[];
}

export function SliderField({
    label, value, onChange, min = 0, max, step = 1, unit, format, presets
}: SliderFieldProps) {
    const display = format ? format(value) : `${value.toLocaleString("fr-FR")}${unit ? " " + unit : ""}`;
    return (
        <div>
            <div className="flex items-baseline justify-between mb-2">
                <label className="text-sm font-medium" style={{ color: "var(--text)" }}>{label}</label>
                <span
                    className="text-base font-bold"
                    style={{ fontFamily: "Fraunces, Georgia, serif", color: "var(--green-deep)" }}
                >
                    {display}
                </span>
            </div>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={e => onChange(Number(e.target.value))}
            />
            {presets && (
                <div className="flex gap-2 mt-2 flex-wrap">
                    {presets.map(p => (
                        <button
                            key={p.label}
                            type="button"
                            onClick={() => onChange(p.value)}
                            className="text-xs px-2.5 py-1 rounded-full transition-colors"
                            style={{
                                background: value === p.value ? "var(--green-deep)" : "var(--bg-alt)",
                                color: value === p.value ? "var(--white)" : "var(--text-muted)",
                                border: "1px solid var(--border)",
                            }}
                        >
                            {p.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

interface ToggleProps {
    label: string;
    checked: boolean;
    onChange: (v: boolean) => void;
    description?: string;
}

export function Toggle({ label, checked, onChange, description }: ToggleProps) {
    return (
        <label className="flex items-start gap-4 cursor-pointer group">
            <div
                className="relative shrink-0 mt-0.5 w-11 h-6 rounded-full transition-colors"
                style={{ background: checked ? "var(--green-deep)" : "var(--border)" }}
                onClick={() => onChange(!checked)}
            >
                <div
                    className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform"
                    style={{ transform: checked ? "translateX(20px)" : "translateX(0)" }}
                />
            </div>
            <div>
                <span className="text-sm font-medium" style={{ color: "var(--text)" }}>{label}</span>
                {description && (
                    <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{description}</p>
                )}
            </div>
        </label>
    );
}

interface RadioGroupProps<T extends string> {
    label: string;
    options: { value: T; label: string; description?: string }[];
    value: T;
    onChange: (v: T) => void;
    cols?: number;
}

export function RadioGroup<T extends string>({
    label, options, value, onChange, cols = 2
}: RadioGroupProps<T>) {
    return (
        <div>
            <p className="text-sm font-medium mb-3" style={{ color: "var(--text)" }}>{label}</p>
            <div
                className="grid gap-2"
                style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
            >
                {options.map(opt => {
                    const selected = value === opt.value;
                    return (
                        <button
                            key={opt.value}
                            type="button"
                            onClick={() => onChange(opt.value)}
                            className="px-4 py-3 rounded-xl text-left transition-all"
                            style={{
                                background: selected ? "var(--green-deep)" : "var(--bg-card)",
                                color: selected ? "var(--white)" : "var(--text)",
                                border: `1.5px solid ${selected ? "var(--green-deep)" : "var(--border)"}`,
                            }}
                        >
                            <span className="block text-sm font-medium">{opt.label}</span>
                            {opt.description && (
                                <span
                                    className="block text-xs mt-0.5"
                                    style={{ color: selected ? "rgba(255,255,255,0.7)" : "var(--text-muted)" }}
                                >
                                    {opt.description}
                                </span>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
