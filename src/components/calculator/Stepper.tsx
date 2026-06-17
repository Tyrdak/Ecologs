import { Car, Salad, Home, Cpu, Check } from "lucide-react";

const STEPS = [
    { label: "Transport", Icon: Car },
    { label: "Alimentation", Icon: Salad },
    { label: "Logement", Icon: Home },
    { label: "Usage IA", Icon: Cpu },
];

export default function Stepper({ currentStep }: { currentStep: number }) {
    return (
        <div className="flex items-center">
            {STEPS.map((s, i) => {
                const done = i < currentStep;
                const active = i === currentStep;
                const { Icon } = s;
                return (
                    <div key={s.label} className="flex items-center flex-1 last:flex-none">
                        <div className="flex flex-col items-center gap-1">
                            <div
                                className="w-10 h-10 rounded-full flex items-center justify-center"
                                style={{
                                    background: done ? "var(--green-mid)" : active ? "var(--green-deep)" : "var(--bg-alt)",
                                    color: done || active ? "white" : "var(--text-muted)",
                                    border: active ? "2px solid var(--green-deep)" : "2px solid transparent",
                                }}
                            >
                                {done ? <Check size={16} /> : <Icon size={16} />}
                            </div>
                            <span
                                className="text-xs font-medium hidden sm:block"
                                style={{ color: active ? "var(--text)" : "var(--text-muted)" }}
                            >
                                {s.label}
                            </span>
                        </div>
                        {i < STEPS.length - 1 && (
                            <div
                                className="flex-1 h-px mx-2"
                                style={{ background: i < currentStep ? "var(--green-mid)" : "var(--border)" }}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
}
