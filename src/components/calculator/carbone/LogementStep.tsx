"use client";
import { Home, Zap, AirVent, Sun } from "lucide-react";
import { SliderField, Toggle, RadioGroup } from "@/src/components/ui/input-bar";
import { CHAUFFAGE_FACTEURS, VACANCES_FACTEURS } from "@/src/data/carbone/emissionFactors";
import type { LogementInputs, TypeChauffage, TypeLogement, AgeLogement, TypeVacances } from "@/src/core/carbone/types";

interface Props {
    value: LogementInputs;
    onChange: (v: LogementInputs) => void;
}

const chauffageOptions = Object.entries(CHAUFFAGE_FACTEURS).map(([k, v]) => ({
    value: k as TypeChauffage,
    label: v.label,
}));

const logementOptions: { value: TypeLogement; label: string }[] = [
    { value: "appartement", label: "🏢  Appartement" },
    { value: "maison",      label: "🏠  Maison" },
];

const ageOptions: { value: AgeLogement; label: string; description: string }[] = [
    { value: "recent", label: "Récent / isolé",    description: "Construit après 1990 ou bien rénové" },
    { value: "ancien", label: "Ancien / peu isolé", description: "Avant 1975, peu ou pas rénové" },
];

const vacancesTypes = Object.entries(VACANCES_FACTEURS).map(([k, v]) => ({
    key: k as TypeVacances,
    label: v.label,
    co2: v.value,
}));

export default function LogementStep({ value, onChange }: Props) {
    const upd = (patch: Partial<LogementInputs>) => onChange({ ...value, ...patch });

    function setVacances(type: TypeVacances, nuits: number) {
        upd({ nuitesVacances: { ...value.nuitesVacances, [type]: Math.max(0, nuits) } });
    }

    return (
        <div className="space-y-10">
            {/* Type + surface */}
            <section>
                <h3 className="font-semibold text-base mb-4 flex items-center gap-2" style={{ color: "var(--text)" }}>
                    <Home size={18} /> Votre logement
                </h3>
                <div className="space-y-5">
                    <RadioGroup
                        label="Type de logement"
                        options={logementOptions}
                        value={value.type}
                        onChange={v => upd({ type: v })}
                        cols={2}
                    />
                    <SliderField
                        label="Surface totale"
                        value={value.surface}
                        onChange={v => upd({ surface: v })}
                        min={15}
                        max={300}
                        step={5}
                        unit="m²"
                        presets={[
                            { label: "Studio (30 m²)", value: 30 },
                            { label: "T2 (50 m²)", value: 50 },
                            { label: "T3 (75 m²)", value: 75 },
                            { label: "T4 (100 m²)", value: 100 },
                        ]}
                    />
                    <SliderField
                        label="Nombre de personnes dans le logement"
                        value={value.nbHabitants}
                        onChange={v => upd({ nbHabitants: v })}
                        min={1}
                        max={8}
                        step={1}
                        presets={[
                            { label: "Seul·e", value: 1 },
                            { label: "2 personnes", value: 2 },
                            { label: "3 personnes", value: 3 },
                            { label: "4 personnes", value: 4 },
                        ]}
                    />
                    <RadioGroup
                        label="Ancienneté / isolation"
                        options={ageOptions}
                        value={value.ageLogement}
                        onChange={v => upd({ ageLogement: v })}
                        cols={2}
                    />
                </div>
            </section>

            <div style={{ height: 1, background: "var(--border)" }} />

            {/* Énergie */}
            <section>
                <h3 className="font-semibold text-base mb-4 flex items-center gap-2" style={{ color: "var(--text)" }}>
                    <Zap size={18} /> Énergie
                </h3>
                <div className="space-y-5">
                    <RadioGroup
                        label="Source de chauffage principale"
                        options={chauffageOptions}
                        value={value.chauffage}
                        onChange={v => upd({ chauffage: v })}
                        cols={2}
                    />
                    <SliderField
                        label="Consommation électrique (hors chauffage)"
                        value={value.consoElecKwh ?? 2800}
                        onChange={v => upd({ consoElecKwh: v })}
                        min={500}
                        max={12000}
                        step={100}
                        unit="kWh/an"
                        presets={[
                            { label: "Faible (1 500 kWh)", value: 1500 },
                            { label: "Moyenne (2 800 kWh)", value: 2800 },
                            { label: "Élevée (5 000 kWh)", value: 5000 },
                        ]}
                    />
                </div>
            </section>

            <div style={{ height: 1, background: "var(--border)" }} />

            {/* Climatisation */}
            <section>
                <h3 className="font-semibold text-base mb-4 flex items-center gap-2" style={{ color: "var(--text)" }}>
                    <AirVent size={18} /> Climatisation
                </h3>
                <div className="space-y-5">
                    <Toggle
                        label="J'ai un ou plusieurs climatiseurs"
                        checked={value.climatisation}
                        onChange={v => upd({ climatisation: v, nbClimatiseurs: v ? 1 : 0 })}
                    />
                    {value.climatisation && (
                        <SliderField
                            label="Nombre de climatiseurs"
                            value={value.nbClimatiseurs}
                            onChange={v => upd({ nbClimatiseurs: v })}
                            min={1}
                            max={6}
                            step={1}
                        />
                    )}
                </div>
            </section>

            <div style={{ height: 1, background: "var(--border)" }} />

            {/* Vacances */}
            <section>
                <h3 className="font-semibold text-base mb-4 flex items-center gap-2" style={{ color: "var(--text)" }}>
                    <Sun size={18} /> Hébergement vacances
                </h3>
                <p className="text-sm mb-5" style={{ color: "var(--text-muted)" }}>
                    Nuits passées hors de chez vous par an (hôtel, camping, location…)
                </p>
                <div className="space-y-4">
                    {vacancesTypes.map(({ key, label, co2 }) => {
                        const nuits = value.nuitesVacances[key] ?? 0;
                        return (
                            <div key={key} className="flex items-center gap-4">
                                <span className="text-sm flex-1" style={{ color: "var(--text)" }}>
                                    {label}
                                    <span className="ml-2 text-xs" style={{ color: "var(--text-muted)" }}>
                                        {co2} kgCO₂e/nuit
                                    </span>
                                </span>
                                <div
                                    className="flex items-center gap-1 rounded-lg overflow-hidden shrink-0"
                                    style={{ border: "1.5px solid var(--border)" }}
                                >
                                    <button
                                        type="button"
                                        onClick={() => setVacances(key, nuits - 1)}
                                        className="px-3 py-1.5 text-sm font-bold"
                                        style={{ color: "var(--text-muted)", background: "var(--bg-alt)" }}
                                    >
                                        −
                                    </button>
                                    <span
                                        className="w-10 text-center text-sm font-semibold"
                                        style={{ color: "var(--text)" }}
                                    >
                                        {nuits}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => setVacances(key, nuits + 1)}
                                        className="px-3 py-1.5 text-sm font-bold"
                                        style={{ color: "var(--text-muted)", background: "var(--bg-alt)" }}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>
        </div>
    );
}
