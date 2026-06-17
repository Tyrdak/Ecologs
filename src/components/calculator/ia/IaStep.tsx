"use client";
import { useEffect, useState } from "react";
import { Cpu, Loader2 } from "lucide-react";

export interface IaInputs {
    provider: string;
    model: string;
    nbTokens: number;
}

interface ModelOption {
    provider: string;
    name: string;
    parametersBillion: number;
    type: string;
}

const PRESETS = [
    { label: "Courte (500)", value: 500 },
    { label: "Moyenne (2 000)", value: 2000 },
    { label: "Longue (8 000)", value: 8000 },
];

interface Props {
    value: IaInputs;
    onChange: (v: IaInputs) => void;
}

export default function IaStep({ value, onChange }: Props) {
    const [providers, setProviders] = useState<string[]>([]);
    const [models, setModels] = useState<ModelOption[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/ia/models")
            .then(r => r.json())
            .then(d => { setProviders(d.providers); setModels(d.models); })
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
            <div className="space-y-5">
                <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-muted)" }}>
                        Fournisseur
                    </label>
                    <select
                        value={value.provider}
                        onChange={e => set({ provider: e.target.value, model: "" })}
                        className="w-full px-4 py-2.5 rounded-xl text-sm"
                        style={{ background: "var(--bg-alt)", border: "1px solid var(--border)", color: "var(--text)" }}
                    >
                        <option value="">Sélectionner…</option>
                        {providers.filter(p => p !== "default").map(p => (
                            <option key={p} value={p}>{p}</option>
                        ))}
                    </select>
                </div>
                {value.provider && (
                    <div>
                        <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-muted)" }}>
                            Modèle
                        </label>
                        <select
                            value={value.model}
                            onChange={e => set({ model: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl text-sm"
                            style={{ background: "var(--bg-alt)", border: "1px solid var(--border)", color: "var(--text)" }}
                        >
                            <option value="">Sélectionner…</option>
                            {filtered.map(m => (
                                <option key={m.name} value={m.name}>
                                    {m.name} — {m.parametersBillion}B ({m.type})
                                </option>
                            ))}
                        </select>
                    </div>
                )}
                <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-muted)" }}>
                        Tokens par requête
                    </label>
                    <div className="flex gap-2 mb-3">
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
                        type="number"
                        value={value.nbTokens}
                        min={1}
                        max={100000}
                        onChange={e => set({ nbTokens: parseInt(e.target.value) || 1 })}
                        className="w-full px-4 py-2.5 rounded-xl text-sm"
                        style={{ background: "var(--bg-alt)", border: "1px solid var(--border)", color: "var(--text)" }}
                    />
                </div>
            </div>
        </div>
    );
}
