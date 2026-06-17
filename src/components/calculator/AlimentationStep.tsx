"use client";
import { RadioGroup } from "@/src/components/ui/input-bar";
import { REPAS_FACTEURS, PETIT_DEJ_FACTEURS } from "@/src/data/carbone/emissionFactors";
import type { AlimentationInputs, TypeRepas, TypePetitDej } from "@/src/core/carbone/types";

interface Props {
    value: AlimentationInputs;
    onChange: (v: AlimentationInputs) => void;
}

const REPAS_TYPES = Object.entries(REPAS_FACTEURS).map(([k, v]) => ({
    key: k as TypeRepas,
    label: v.label,
    co2: v.value,
}));

const PRESETS: { label: string; values: Partial<Record<TypeRepas, number>> }[] = [
    { label: "Omnivore moyen", values: { vegalien: 0, vegetarien: 2, viandeBlanche: 5, viandeRouge: 3, poissonGras: 2, poissonBlanc: 2 } },
    { label: "Flexitarien", values: { vegalien: 2, vegetarien: 4, viandeBlanche: 4, viandeRouge: 1, poissonGras: 2, poissonBlanc: 1 } },
    { label: "Végétarien", values: { vegalien: 3, vegetarien: 11, viandeBlanche: 0, viandeRouge: 0, poissonGras: 0, poissonBlanc: 0 } },
    { label: "Végétalien", values: { vegalien: 14, vegetarien: 0, viandeBlanche: 0, viandeRouge: 0, poissonGras: 0, poissonBlanc: 0 } },
];

const PETIT_DEJ_OPTIONS = Object.entries(PETIT_DEJ_FACTEURS).map(([k, v]) => ({
    value: k as TypePetitDej,
    label: v.label,
}));

export default function AlimentationStep({ value, onChange }: Props) {
    const total = Object.values(value.repasParSemaine).reduce((a, b) => a + b, 0);
    const MAX = 14;

    function setRepas(type: TypeRepas, nb: number) {
        const currentTotal = total - (value.repasParSemaine[type] ?? 0);
        const clamped = Math.max(0, Math.min(nb, MAX - currentTotal));
        onChange({
            ...value,
            repasParSemaine: { ...value.repasParSemaine, [type]: clamped },
        });
    }

    function applyPreset(preset: typeof PRESETS[0]) {
        onChange({
            ...value,
            repasParSemaine: {
                vegalien: 0,
                vegetarien: 0,
                viandeBlanche: 0,
                viandeRouge: 0,
                poissonGras: 0,
                poissonBlanc: 0,
                ...preset.values,
            },
        });
    }

    return (
        <div className="space-y-10">
            {/* Repas */}
            <section>
                <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-base flex items-center gap-2" style={{ color: "var(--text)" }}>
                        <span className="text-xl">🍽️</span> Repas par semaine
                    </h3>
                    <span
                        className="text-sm font-semibold px-3 py-1 rounded-full"
                        style={{
                            background: total === MAX ? "rgba(116,180,155,0.15)" : "var(--bg-alt)",
                            color: total === MAX ? "var(--green-mid)" : "var(--text-muted)",
                        }}
                    >
                        {total} / {MAX} repas
                    </span>
                </div>
                <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
                    Déjeuners + dîners (14 repas par semaine maximum)
                </p>

                {/* Presets */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {PRESETS.map(p => (
                        <button
                            key={p.label}
                            type="button"
                            onClick={() => applyPreset(p)}
                            className="text-xs px-3 py-1.5 rounded-full font-medium transition-colors"
                            style={{ background: "var(--bg-alt)", color: "var(--text-muted)", border: "1px solid var(--border)" }}
                        >
                            {p.label}
                        </button>
                    ))}
                </div>

                {/* Repas sliders */}
                <div className="space-y-4">
                    {REPAS_TYPES.map(({ key, label, co2 }) => {
                        const nb = value.repasParSemaine[key] ?? 0;
                        return (
                            <div key={key}>
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm font-medium" style={{ color: "var(--text)" }}>
                                        {label}
                                    </span>
                                    <div className="flex items-center gap-3">
                                        <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                                            {co2} kgCO₂e/repas
                                        </span>
                                        <div
                                            className="flex items-center gap-1 rounded-lg overflow-hidden"
                                            style={{ border: "1.5px solid var(--border)" }}
                                        >
                                            <button
                                                type="button"
                                                onClick={() => setRepas(key, nb - 1)}
                                                className="px-3 py-1.5 text-sm font-bold transition-colors"
                                                style={{ color: "var(--text-muted)", background: "var(--bg-alt)" }}
                                            >
                                                −
                                            </button>
                                            <span
                                                className="w-8 text-center text-sm font-semibold"
                                                style={{ color: "var(--text)" }}
                                            >
                                                {nb}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() => setRepas(key, nb + 1)}
                                                disabled={total >= MAX}
                                                className="px-3 py-1.5 text-sm font-bold transition-colors disabled:opacity-30"
                                                style={{ color: "var(--text-muted)", background: "var(--bg-alt)" }}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                {/* mini progress */}
                                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--bg-alt)" }}>
                                    <div
                                        className="h-full rounded-full transition-all"
                                        style={{
                                            width: `${(nb / MAX) * 100}%`,
                                            background: co2 > 3 ? "var(--gold)" : co2 > 1 ? "var(--green-mid)" : "var(--green-light)",
                                        }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            <div style={{ height: 1, background: "var(--border)" }} />

            {/* Petit déjeuner */}
            <section>
                <RadioGroup
                    label="🥐  Petit déjeuner habituel"
                    options={PETIT_DEJ_OPTIONS}
                    value={value.petitDejeuner}
                    onChange={v => onChange({ ...value, petitDejeuner: v })}
                    cols={2}
                />
            </section>
        </div>
    );
}
