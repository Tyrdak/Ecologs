"use client";
import { useEffect, useState } from "react";
import { Cpu, Loader2, ChevronRight } from "lucide-react";

export interface IaInputs {
    provider: string;
    model: string;
    nbTokens: number;
}

interface ProviderOption {
    id: string;
    label: string;
}

interface ModelOption {
    provider: string;
    name: string;
    parametersBillion: number;
    type: string;
}

const PRESETS = [
    { label: "500", value: 500 },
    { label: "2 000", value: 2000 },
    { label: "8 000", value: 8000 },
    { label: "32 000", value: 32000 },
];

interface Props {
    value: IaInputs;
    onChange: (v: IaInputs) => void;
}

function StepLabel({ n, label, active }: { n: number; label: string; active: boolean }) {
    return (
        <div className="flex items-center gap-2">
            <div
                className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                style={{
                    background: active ? "var(--green-deep)" : "var(--border)",
                    color: active ? "white" : "var(--text-muted)",
                }}
            >
                {n}
            </div>
            <span className="text-sm font-medium" style={{ color: active ? "var(--text)" : "var(--text-muted)" }}>
                {label}
            </span>
        </div>
    );
}

export default function IaStep({ value, onChange }: Props) {
    const [providers, setProviders] = useState<ProviderOption[]>([]);
    const [models, setModels] = useState<ModelOption[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/ia/models")
            .then(r => r.json())
            .then(d => {
                setProviders(d.providers);
                setModels(d.models);
            })
            .finally(() => setLoading(false));
    }, []);

    const filtered = models.filter(m => m.provider === value.provider);
    const set = (patch: Partial<IaInputs>) => onChange({ ...value, ...patch });

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <Loader2 size={24} className="animate-spin" style={{ color: "var(--text-muted)" }} />
            </div>
        );
    }

    return (
        <div>
            <div className="flex items-center gap-3 mb-6">
                <Cpu size={20} style={{ color: "var(--green-mid)" }} />
                <h3 style={{ fontFamily: "Fraunces, serif", fontSize: "1.4rem", fontWeight: 600 }}>
                    Usage de l'IA
                </h3>
            </div>

            <div className="flex items-center gap-2 mb-6 text-xs" style={{ color: "var(--text-muted)" }}>
                <StepLabel n={1} label="Provider" active={true} />
                <ChevronRight size={12} />
                <StepLabel n={2} label="Modèle" active={!!value.provider} />
                <ChevronRight size={12} />
                <StepLabel n={3} label="Requête" active={!!value.model} />
            </div>

            <div className="space-y-5">
                <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "var(--text-muted)" }}>
                        1 — Provider
                    </label>
                    <select
                        value={value.provider}
                        onChange={e => set({ provider: e.target.value, model: "" })}
                        className="w-full px-4 py-2.5 rounded-xl text-sm"
                        style={{ background: "var(--bg-alt)", border: "1px solid var(--border)", color: "var(--text)" }}
                    >
                        <option value="">Sélectionner un provider…</option>
                        {providers.map(p => (
                            <option key={p.id} value={p.id}>{p.label}</option>
                        ))}
                    </select>
                </div>

                <div style={{ opacity: value.provider ? 1 : 0.4, pointerEvents: value.provider ? "auto" : "none" }}>
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "var(--text-muted)" }}>
                        2 — Modèle
                    </label>
                    <select
                        value={value.model}
                        onChange={e => set({ model: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl text-sm"
                        style={{ background: "var(--bg-alt)", border: "1px solid var(--border)", color: "var(--text)" }}
                    >
                        <option value="">Sélectionner un modèle…</option>
                        {filtered.map(m => (
                            <option key={m.name} value={m.name}>
                                {m.name} — {m.parametersBillion}B ({m.type})
                            </option>
                        ))}
                    </select>
                </div>

                <div style={{ opacity: value.model ? 1 : 0.4, pointerEvents: value.model ? "auto" : "none" }}>
                    <div className="flex items-baseline justify-between mb-1.5">
                        <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                            3 — Requête
                        </label>
                        <span style={{ fontFamily: "Fraunces, serif", fontSize: "1.1rem", fontWeight: 600, color: "var(--green-deep)" }}>
                            {value.nbTokens.toLocaleString("fr-FR")} tokens
                        </span>
                    </div>
                    <div className="flex gap-2 mb-3 flex-wrap">
                        {PRESETS.map(p => (
                            <button
                                key={p.value}
                                onClick={() => set({ nbTokens: p.value })}
                                className="text-xs px-3 py-1.5 rounded-full"
                                style={{
                                    background: value.nbTokens === p.value ? "var(--green-deep)" : "var(--bg-alt)",
                                    color: value.nbTokens === p.value ? "white" : "var(--text-muted)",
                                    border: "1px solid var(--border)",
                                }}
                            >
                                {p.label}
                            </button>
                        ))}
                    </div>
                    <input
                        type="range"
                        value={value.nbTokens}
                        min={100}
                        max={128000}
                        step={500}
                        onChange={e => set({ nbTokens: parseInt(e.target.value) })}
                        className="w-full"
                        style={{ accentColor: "var(--green-deep)" }}
                    />
                    <div className="flex justify-between text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                        <span>100</span>
                        <span>128 000</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
