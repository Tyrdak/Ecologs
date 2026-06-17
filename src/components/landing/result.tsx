"use client";
import ScoreGauge from "@/src/components/ui/score";
import type { CarboneResult } from "@/src/core/carbone/types";
import { EQUIVALENCE_FACTORS } from "@/src/data/carbone/equivalences";

interface Props {
    result: CarboneResult;
    onRestart: () => void;
}

const CATEGORY_ICONS: Record<string, string> = {
    Transport: "🚘",
    Alimentation: "🍽️",
    Logement: "🏠",
};

const DETAIL_LABELS: Record<string, string> = {
    voiture: "Voiture",
    avion: "Avion",
    train: "Train",
    bus: "Bus",
    metro: "Métro / Tram",
    moto: "Moto / Scooter",
    vegalien: "Repas végétaliens",
    vegetarien: "Repas végétariens",
    viandeBlanche: "Viande blanche",
    viandeRouge: "Viande rouge",
    poissonGras: "Poisson gras",
    poissonBlanc: "Poisson blanc",
    petitDejeuner: "Petit déjeuner",
    electricite: "Électricité",
    chauffage: "Chauffage",
    construction: "Construction",
    climatisation: "Climatisation",
    vacances: "Vacances",
};

function fmt(kg: number): string {
    if (kg >= 1000) return `${(kg / 1000).toFixed(2)} tCO₂e`;
    return `${Math.round(kg)} kgCO₂e`;
}

export default function ResultStep({ result, onRestart }: Props) {
    const categories = [result.transport, result.alimentation, result.logement];
    const total = result.totalKgCo2e;

    const equivalences = EQUIVALENCE_FACTORS.map(f => ({
        label: f.label,
        quantity: Math.round(total / f.kgCo2ePerUnit),
    }));

    return (
        <div className="space-y-10 anim-scale-in">
            {/* Score gauge */}
            <ScoreGauge
                value={total}
                moyenne={result.moyenneFrance}
                objectif={result.objectif2Degres}
            />

            {/* Breakdown by category */}
            <div>
                <h3
                    className="font-semibold text-base mb-5"
                    style={{
                        fontFamily: "Fraunces, Georgia, serif",
                        color: "var(--text)",
                    }}
                >
                    Détail par poste
                </h3>
                <div className="space-y-4">
                    {categories.map((cat, i) => {
                        const pct = total > 0 ? (cat.kgCo2e / total) * 100 : 0;
                        return (
                            <details
                                key={cat.label}
                                className="group rounded-xl overflow-hidden"
                                style={{ border: "1.5px solid var(--border)", background: "var(--bg-card)" }}
                            >
                                <summary
                                    className="flex items-center gap-3 px-5 py-4 cursor-pointer list-none select-none"
                                    style={{ animationDelay: `${i * 0.1}s` }}
                                >
                                    <span className="text-xl">{CATEGORY_ICONS[cat.label]}</span>
                                    <span className="flex-1 font-semibold text-sm" style={{ color: "var(--text)" }}>
                                        {cat.label}
                                    </span>
                                    <span
                                        className="text-sm font-bold"
                                        style={{
                                            fontFamily: "Fraunces, Georgia, serif",
                                            color: "var(--green-deep)",
                                        }}
                                    >
                                        {fmt(cat.kgCo2e)}
                                    </span>
                                    <span
                                        className="text-xs ml-1 w-10 text-right"
                                        style={{ color: "var(--text-muted)" }}
                                    >
                                        {pct.toFixed(0)}%
                                    </span>
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 16 16"
                                        className="transition-transform group-open:rotate-180"
                                        style={{ color: "var(--text-muted)" }}
                                    >
                                        <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                                    </svg>
                                </summary>
                                {/* Progress bar */}
                                <div className="px-5 pb-1">
                                    <div className="h-1 rounded-full overflow-hidden" style={{ background: "var(--bg-alt)" }}>
                                        <div
                                            className="h-full rounded-full anim-bar"
                                            style={{ width: `${pct}%`, background: "var(--green-mid)" }}
                                        />
                                    </div>
                                </div>
                                {/* Details */}
                                <div className="px-5 py-4 border-t space-y-2" style={{ borderColor: "var(--border)" }}>
                                    {Object.entries(cat.details).map(([key, val]) => (
                                        <div key={key} className="flex justify-between text-sm">
                                            <span style={{ color: "var(--text-muted)" }}>
                                                {DETAIL_LABELS[key] ?? key}
                                            </span>
                                            <span style={{ color: "var(--text)", fontWeight: 500 }}>
                                                {fmt(val)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </details>
                        );
                    })}
                </div>
            </div>

            {/* Equivalences */}
            <div
                className="rounded-2xl p-6"
                style={{ background: "var(--bg-alt)", border: "1px solid var(--border)" }}
            >
                <h3
                    className="font-semibold text-sm mb-4"
                    style={{ color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}
                >
                    Équivalences
                </h3>
                <div className="space-y-2">
                    {equivalences.map(({ label, quantity }) => (
                        <div key={label} className="flex items-baseline justify-between">
                            <span className="text-sm" style={{ color: "var(--text-muted)" }}>
                                {label}
                            </span>
                            <span
                                className="text-base font-semibold"
                                style={{
                                    fontFamily: "Fraunces, Georgia, serif",
                                    color: "var(--green-deep)",
                                }}
                            >
                                {quantity.toLocaleString("fr-FR")}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Restart */}
            <button
                onClick={onRestart}
                className="w-full py-3 rounded-xl text-sm font-medium transition-colors"
                style={{ background: "var(--bg-alt)", color: "var(--text-muted)", border: "1px solid var(--border)" }}
            >
                ← Recommencer le calcul
            </button>
        </div>
    );
}
