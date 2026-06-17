"use client";
import { useState, useEffect, useMemo } from "react";
import Stepper from "./Stepper";
import StepNav from "./StepNav";
import TransportStep from "./carbone/TransportStep";
import AlimentationStep from "./carbone/AlimentationStep";
import LogementStep from "./carbone/LogementStep";
import IaStep, { type IaInputs } from "./ia/IaStep";
import ScorePage from "./score/ScorePage";
import { calculerEmpreinte } from "@/src/core/carbone/CarboneCalculator";
import { DEFAULT_INPUTS } from "@/src/core/carbone/types";
import type { CarboneInputs } from "@/src/core/carbone/types";

const CACHE_KEY = "ecologs_form_v1";
const DEFAULT_IA: IaInputs = { provider: "", model: "", nbTokens: 500 };

interface Props {
    onBack: () => void;
}

export default function GlobalCalculator({ onBack }: Props) {
    const [step, setStep] = useState(0);
    const [carbone, setCarbone] = useState<CarboneInputs>(DEFAULT_INPUTS);
    const [ia, setIa] = useState<IaInputs>(DEFAULT_IA);
    const [iaResult, setIaResult] = useState<{ totalKgCo2e: number } | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        try {
            const saved = localStorage.getItem(CACHE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                if (parsed.carbone) setCarbone(parsed.carbone);
                if (parsed.ia) setIa(parsed.ia);
            }
        } catch {}
    }, []);

    useEffect(() => {
        localStorage.setItem(CACHE_KEY, JSON.stringify({ carbone, ia }));
    }, [carbone, ia]);

    const carboneResult = useMemo(() => calculerEmpreinte(carbone), [carbone]);
    const runningTotal = (carboneResult.totalKgCo2e / 1000).toFixed(1);

    async function goToScore() {
        if (!ia.provider || !ia.model) { setStep(4); return; }
        setLoading(true);
        try {
            const res = await fetch("/api/ia/calculate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(ia),
            });
            if (res.ok) setIaResult(await res.json());
        } catch {}
        setLoading(false);
        setStep(4);
    }

    function next() {
        if (step === 3) { goToScore(); return; }
        setStep(s => s + 1);
    }

    function restart() {
        setCarbone(DEFAULT_INPUTS);
        setIa(DEFAULT_IA);
        setIaResult(null);
        setStep(0);
        localStorage.removeItem(CACHE_KEY);
    }

    if (step === 4) {
        return <ScorePage carboneResult={carboneResult} iaResult={iaResult} onRestart={restart} />;
    }

    return (
        <div className="min-h-screen py-20 px-4" style={{ background: "var(--bg)" }}>
            <div className="max-w-2xl mx-auto">
                <Stepper currentStep={step} />
                <div
                    className="mt-8 rounded-2xl p-6 md:p-8"
                    style={{ background: "var(--bg-card)", border: "1.5px solid var(--border)" }}
                    key={step}
                >
                    {step === 0 && (
                        <TransportStep
                            value={carbone.transport}
                            onChange={v => setCarbone(p => ({ ...p, transport: v }))}
                        />
                    )}
                    {step === 1 && (
                        <AlimentationStep
                            value={carbone.alimentation}
                            onChange={v => setCarbone(p => ({ ...p, alimentation: v }))}
                        />
                    )}
                    {step === 2 && (
                        <LogementStep
                            value={carbone.logement}
                            onChange={v => setCarbone(p => ({ ...p, logement: v }))}
                        />
                    )}
                    {step === 3 && <IaStep value={ia} onChange={setIa} />}
                </div>
                <StepNav
                    step={step}
                    totalSteps={4}
                    onPrev={() => (step === 0 ? onBack() : setStep(s => s - 1))}
                    onNext={next}
                    loading={loading}
                    runningTotal={runningTotal}
                />
            </div>
        </div>
    );
}
