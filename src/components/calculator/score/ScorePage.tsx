"use client";
import { RotateCcw, TrendingDown } from "lucide-react";
import type { CarboneResult } from "@/src/core/carbone/types";
import ScoreBreakdown from "./ScoreBreakdown";
import ScoreComparisons from "./ScoreComparisons";

interface IaResult {
    totalKgCo2e: number;
}

interface Props {
    carboneResult: CarboneResult;
    iaResult: IaResult | null;
    onRestart: () => void;
}

export default function ScorePage({ carboneResult, iaResult, onRestart }: Props) {
    const iaKg = iaResult?.totalKgCo2e ?? 0;
    const totalTonnes = (carboneResult.totalKgCo2e + iaKg) / 1000;
    const moyenneTonnes = carboneResult.moyenneFrance / 1000;
    const objectifTonnes = carboneResult.objectif2Degres / 1000;
    const ratioMoyenne = Math.round((totalTonnes / moyenneTonnes) * 100);

    return (
        <div className="min-h-screen py-20 px-4" style={{ background: "var(--bg)" }}>
            <div className="max-w-2xl mx-auto space-y-6">
                <div className="text-center mb-8">
                    <p className="text-sm font-medium uppercase tracking-wider mb-2" style={{ color: "var(--green-mid)" }}>
                        Votre résultat
                    </p>
                    <div style={{ fontFamily: "Fraunces, serif", fontSize: "clamp(3rem, 10vw, 5rem)", fontWeight: 700, color: "var(--green-deep)", lineHeight: 1 }}>
                        {totalTonnes.toFixed(1)}
                    </div>
                    <div className="text-lg" style={{ color: "var(--text-muted)" }}>tonnes CO₂e / an</div>
                </div>

                <div className="rounded-2xl p-6" style={{ background: "var(--bg-card)", border: "1.5px solid var(--border)" }}>
                    <p className="text-sm font-semibold mb-4" style={{ color: "var(--text)" }}>Répartition</p>
                    <ScoreBreakdown result={carboneResult} iaKg={iaKg} />
                </div>

                {iaKg > 0 && (
                    <div className="rounded-2xl p-6" style={{ background: "var(--bg-card)", border: "1.5px solid var(--border)" }}>
                        <ScoreComparisons iaKg={iaKg} />
                    </div>
                )}

                <div className="rounded-2xl p-5 flex items-center gap-4" style={{ background: "var(--bg-alt)", border: "1px solid var(--border)" }}>
                    <TrendingDown size={20} style={{ color: "var(--green-mid)", flexShrink: 0 }} />
                    <div className="text-sm" style={{ color: "var(--text)" }}>
                        Vous êtes à <strong>{ratioMoyenne}%</strong> de la moyenne française ({moyenneTonnes.toFixed(1)} t).
                        L'objectif Accord de Paris est <strong>{objectifTonnes.toFixed(0)} t</strong>.
                    </div>
                </div>

                <button
                    onClick={onRestart}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-full text-sm font-medium"
                    style={{ border: "1.5px solid var(--border)", color: "var(--text-muted)", background: "transparent" }}
                >
                    <RotateCcw size={15} />
                    Recommencer
                </button>
            </div>
        </div>
    );
}
