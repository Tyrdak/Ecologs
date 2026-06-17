"use client";
import { useState, useMemo } from "react";
import TransportStep from "./TransportStep";
import AlimentationStep from "./AlimentationStep";
import LogementStep from "./LogementStep";
import ResultStep from "@/src/components/landing/result";
import { calculerEmpreinte } from "@/src/core/carbone/CarboneCalculator";
import { DEFAULT_INPUTS } from "@/src/core/carbone/types";
import type { CarboneInputs } from "@/src/core/carbone/types";

const STEPS = [
    { id: "transport",    label: "Transport",    icon: "🚘" },
    { id: "alimentation", label: "Alimentation", icon: "🍽️" },
    { id: "logement",     label: "Logement",     icon: "🏠" },
    { id: "resultat",     label: "Résultat",     icon: "📊" },
];

interface Props {
    onClose?: () => void;
}

export default function Calculator({ onClose }: Props) {
    const [step, setStep] = useState(0);
    const [inputs, setInputs] = useState<CarboneInputs>(DEFAULT_INPUTS);

    const result = useMemo(() => calculerEmpreinte(inputs), [inputs]);

    const isLast = step === STEPS.length - 1;

    function next() { setStep(s => Math.min(s + 1, STEPS.length - 1)); }
    function prev() { setStep(s => Math.max(s - 1, 0)); }
    function restart() { setInputs(DEFAULT_INPUTS); setStep(0); }

    // Running total shown in the footer
    const totalT = (result.totalKgCo2e / 1000).toFixed(1);

    return (
        <div
            id="calculateur"
            className="py-20 px-4 md:px-8"
            style={{ background: "var(--bg)", minHeight: "100vh" }}
        >
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="mb-10 flex items-center justify-between">
                    <div>
                        <p
                            className="text-xs font-semibold tracking-widest uppercase mb-1"
                            style={{ color: "var(--green-mid)" }}
                        >
                            Calculateur
                        </p>
                        <h2
                            style={{
                                fontFamily: "Fraunces, Georgia, serif",
                                fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
                                fontWeight: 600,
                                color: "var(--text)",
                                lineHeight: 1.2,
                            }}
                        >
                            Mon empreinte carbone
                        </h2>
                    </div>
                    {onClose && (
                        <button
                            onClick={onClose}
                            className="text-sm px-4 py-2 rounded-full"
                            style={{ color: "var(--text-muted)", background: "var(--bg-alt)", border: "1px solid var(--border)" }}
                        >
                            ← Retour
                        </button>
                    )}
                </div>

                {/* Progress steps */}
                <div className="flex items-center gap-0 mb-10">
                    {STEPS.map((s, i) => {
                        const done    = i < step;
                        const current = i === step;
                        return (
                            <div key={s.id} className="flex items-center flex-1 last:flex-none">
                                <button
                                    onClick={() => i < step && setStep(i)}
                                    className="flex flex-col items-center gap-1 group"
                                    style={{ cursor: i < step ? "pointer" : "default" }}
                                    title={s.label}
                                >
                                    <div
                                        className="w-9 h-9 rounded-full flex items-center justify-center text-base transition-all"
                                        style={{
                                            background: done ? "var(--green-mid)" : current ? "var(--green-deep)" : "var(--bg-alt)",
                                            color: (done || current) ? "white" : "var(--text-muted)",
                                            border: current ? "2px solid var(--green-deep)" : "2px solid transparent",
                                        }}
                                    >
                                        {done ? "✓" : s.icon}
                                    </div>
                                    <span
                                        className="text-xs font-medium hidden sm:block"
                                        style={{ color: current ? "var(--text)" : "var(--text-muted)" }}
                                    >
                                        {s.label}
                                    </span>
                                </button>
                                {i < STEPS.length - 1 && (
                                    <div
                                        className="flex-1 h-px mx-2"
                                        style={{ background: i < step ? "var(--green-mid)" : "var(--border)" }}
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Form card */}
                <div
                    className="rounded-2xl p-6 md:p-8 anim-scale-in"
                    key={step}
                    style={{ background: "var(--bg-card)", border: "1.5px solid var(--border)" }}
                >
                    {step === 0 && (
                        <TransportStep
                            value={inputs.transport}
                            onChange={v => setInputs(prev => ({ ...prev, transport: v }))}
                        />
                    )}
                    {step === 1 && (
                        <AlimentationStep
                            value={inputs.alimentation}
                            onChange={v => setInputs(prev => ({ ...prev, alimentation: v }))}
                        />
                    )}
                    {step === 2 && (
                        <LogementStep
                            value={inputs.logement}
                            onChange={v => setInputs(prev => ({ ...prev, logement: v }))}
                        />
                    )}
                    {step === 3 && (
                        <ResultStep result={result} onRestart={restart} />
                    )}
                </div>

                {/* Navigation */}
                {step < STEPS.length - 1 && (
                    <div className="mt-6 flex items-center justify-between">
                        <button
                            onClick={prev}
                            disabled={step === 0}
                            className="flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-full transition-all disabled:opacity-30"
                            style={{ color: "var(--text-muted)", background: "var(--bg-alt)", border: "1px solid var(--border)" }}
                        >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                                <path d="M10 4l-4 4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                            Précédent
                        </button>

                        {/* Live total */}
                        <div className="text-center">
                            <div
                                className="text-sm font-semibold"
                                style={{ fontFamily: "Fraunces, Georgia, serif", color: "var(--text)", fontSize: "1.1rem" }}
                            >
                                {totalT} t
                            </div>
                            <div className="text-xs" style={{ color: "var(--text-muted)" }}>en cours…</div>
                        </div>

                        <button
                            onClick={next}
                            className="flex items-center gap-2 text-sm font-semibold px-6 py-2.5 rounded-full transition-all"
                            style={{ background: "var(--green-deep)", color: "var(--white)" }}
                        >
                            {isLast ? "Voir les résultats" : "Suivant"}
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                                <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
