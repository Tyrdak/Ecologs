"use client";
import { Toggle, SliderField, RadioGroup } from "@/src/components/ui/input-bar";
import { VOITURE_FACTEURS } from "@/src/data/carbone/emissionFactors";
import type { TransportInputs, TypeVoiture } from "@/src/core/carbone/types";

interface Props {
    value: TransportInputs;
    onChange: (v: TransportInputs) => void;
}

const voitureOptions = Object.entries(VOITURE_FACTEURS).map(([k, v]) => ({
    value: k as TypeVoiture,
    label: v.label,
}));

export default function TransportStep({ value, onChange }: Props) {
    const upd = (patch: Partial<TransportInputs>) => onChange({ ...value, ...patch });
    const updV = (patch: Partial<TransportInputs["voiture"]>) =>
        upd({ voiture: { ...value.voiture, ...patch } });

    return (
        <div className="space-y-10">
            {/* === Voiture === */}
            <section>
                <h3 className="font-semibold text-base mb-4 flex items-center gap-2" style={{ color: "var(--text)" }}>
                    <span className="text-xl">🚘</span> Voiture
                </h3>
                <div className="space-y-5">
                    <Toggle
                        label="J'utilise une voiture"
                        checked={value.voiture.utilise}
                        onChange={v => updV({ utilise: v })}
                    />
                    {value.voiture.utilise && (
                        <>
                            <SliderField
                                label="Distance annuelle"
                                value={value.voiture.kmAnnuels}
                                onChange={v => updV({ kmAnnuels: v })}
                                max={60000}
                                step={500}
                                unit="km/an"
                                presets={[
                                    { label: "Peu (5 000 km)", value: 5000 },
                                    { label: "Moyen (12 000 km)", value: 12000 },
                                    { label: "Beaucoup (20 000 km)", value: 20000 },
                                ]}
                            />
                            <RadioGroup
                                label="Type de carburant"
                                options={voitureOptions}
                                value={value.voiture.typeCarburant}
                                onChange={v => updV({ typeCarburant: v })}
                                cols={2}
                            />
                            <SliderField
                                label="Nombre d'occupants en moyenne"
                                value={value.voiture.nbOccupants}
                                onChange={v => updV({ nbOccupants: v })}
                                min={1}
                                max={5}
                                step={1}
                                presets={[
                                    { label: "Seul", value: 1 },
                                    { label: "2 personnes", value: 2 },
                                    { label: "3+", value: 3 },
                                ]}
                            />
                        </>
                    )}
                </div>
            </section>

            <div style={{ height: 1, background: "var(--border)" }} />

            {/* === Avion === */}
            <section>
                <h3 className="font-semibold text-base mb-4 flex items-center gap-2" style={{ color: "var(--text)" }}>
                    <span className="text-xl">✈️</span> Avion
                </h3>
                <div className="space-y-5">
                    <SliderField
                        label="Vols court-courrier (< 5h)"
                        value={value.avion.heuresCourtCourrier}
                        onChange={v => upd({ avion: { ...value.avion, heuresCourtCourrier: v } })}
                        max={40}
                        step={0.5}
                        unit="h/an"
                        presets={[
                            { label: "Aucun", value: 0 },
                            { label: "1 A/R Europe (4h)", value: 4 },
                            { label: "2 A/R Europe (8h)", value: 8 },
                        ]}
                    />
                    <SliderField
                        label="Vols long-courrier (> 5h)"
                        value={value.avion.heuresLongCourrier}
                        onChange={v => upd({ avion: { ...value.avion, heuresLongCourrier: v } })}
                        max={80}
                        step={1}
                        unit="h/an"
                        presets={[
                            { label: "Aucun", value: 0 },
                            { label: "1 A/R long (20h)", value: 20 },
                            { label: "2 A/R long (40h)", value: 40 },
                        ]}
                    />
                </div>
            </section>

            <div style={{ height: 1, background: "var(--border)" }} />

            {/* === Train === */}
            <section>
                <h3 className="font-semibold text-base mb-4 flex items-center gap-2" style={{ color: "var(--text)" }}>
                    <span className="text-xl">🚆</span> Train
                </h3>
                <SliderField
                    label="Distance en train par an"
                    value={value.train.kmAnnuels}
                    onChange={v => upd({ train: { kmAnnuels: v } })}
                    max={30000}
                    step={100}
                    unit="km/an"
                    presets={[
                        { label: "Peu", value: 500 },
                        { label: "Régulier (5 000 km)", value: 5000 },
                        { label: "Très fréquent", value: 15000 },
                    ]}
                />
            </section>

            <div style={{ height: 1, background: "var(--border)" }} />

            {/* === Transports collectifs === */}
            <section>
                <h3 className="font-semibold text-base mb-4 flex items-center gap-2" style={{ color: "var(--text)" }}>
                    <span className="text-xl">🚌</span> Bus & Métro
                </h3>
                <div className="space-y-5">
                    <SliderField
                        label="Bus par an"
                        value={value.bus.kmAnnuels}
                        onChange={v => upd({ bus: { kmAnnuels: v } })}
                        max={10000}
                        step={100}
                        unit="km/an"
                        presets={[{ label: "Aucun", value: 0 }, { label: "Quotidien (2 000 km)", value: 2000 }]}
                    />
                    <SliderField
                        label="Métro / Tram par an"
                        value={value.metro.kmAnnuels}
                        onChange={v => upd({ metro: { kmAnnuels: v } })}
                        max={10000}
                        step={100}
                        unit="km/an"
                        presets={[{ label: "Aucun", value: 0 }, { label: "Quotidien (2 000 km)", value: 2000 }]}
                    />
                </div>
            </section>

            <div style={{ height: 1, background: "var(--border)" }} />

            {/* === Moto === */}
            <section>
                <h3 className="font-semibold text-base mb-4 flex items-center gap-2" style={{ color: "var(--text)" }}>
                    <span className="text-xl">🏍️</span> Moto / Scooter
                </h3>
                <div className="space-y-5">
                    <Toggle
                        label="J'utilise une moto ou un scooter thermique"
                        checked={value.moto.utilise}
                        onChange={v => upd({ moto: { ...value.moto, utilise: v } })}
                    />
                    {value.moto.utilise && (
                        <SliderField
                            label="Distance annuelle"
                            value={value.moto.kmAnnuels}
                            onChange={v => upd({ moto: { ...value.moto, kmAnnuels: v } })}
                            max={30000}
                            step={500}
                            unit="km/an"
                            presets={[
                                { label: "Peu (3 000 km)", value: 3000 },
                                { label: "Régulier (8 000 km)", value: 8000 },
                            ]}
                        />
                    )}
                </div>
            </section>
        </div>
    );
}
