import type { CarboneResult } from "@/src/core/carbone/types";

interface Props {
    result: CarboneResult;
    iaKg: number;
}

export default function ScoreBreakdown({ result, iaKg }: Props) {
    const total = result.totalKgCo2e + iaKg;
    const categories = [
        { label: "Transport", kg: result.transport.kgCo2e, color: "var(--green-deep)" },
        { label: "Alimentation", kg: result.alimentation.kgCo2e, color: "var(--green-mid)" },
        { label: "Logement", kg: result.logement.kgCo2e, color: "var(--gold)" },
        { label: "IA (requête)", kg: iaKg, color: "var(--text-muted)" },
    ];

    return (
        <div className="space-y-3">
            {categories.map(c => {
                const pct = total > 0 ? (c.kg / total) * 100 : 0;
                return (
                    <div key={c.label}>
                        <div className="flex justify-between text-sm mb-1">
                            <span style={{ color: "var(--text)" }}>{c.label}</span>
                            <span style={{ color: "var(--text-muted)" }}>
                                {c.kg < 1 ? `${(c.kg * 1000).toFixed(1)} g` : `${c.kg.toFixed(1)} kg`}
                            </span>
                        </div>
                        <div className="h-2 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
                            <div
                                className="h-full rounded-full transition-all duration-700"
                                style={{ width: `${pct}%`, background: c.color }}
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
