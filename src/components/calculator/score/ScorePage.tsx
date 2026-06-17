"use client";
import { RotateCcw, TrendingDown } from "lucide-react";
import type { CarboneResult } from "@/src/core/carbone/types";
import ScoreBreakdown from "./ScoreBreakdown";
import ScoreComparisons from "./ScoreComparisons";
import ScoreRing from "./ScoreRing";
import {
    scoreGlobal, scoreCarbone, scoreIa,
    scoreTransport, scoreAlimentation, scoreLogement,
} from "./scoreUtils";

interface IaResult { totalKgCo2e: number; }
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

    const sGlobal = scoreGlobal(carboneResult.totalKgCo2e, iaKg);
    const sCarbone = scoreCarbone(carboneResult.totalKgCo2e);
    const sIa = iaKg > 0 ? scoreIa(iaKg) : null;
    const sTransport = scoreTransport(carboneResult.transport.kgCo2e);
    const sAlimentation = scoreAlimentation(carboneResult.alimentation.kgCo2e);
    const sLogement = scoreLogement(carboneResult.logement.kgCo2e);

    return (
        <div className="min-h-screen py-20 px-4" style={{ background: "var(--bg)" }}>
            <div className="max-w-2xl mx-auto space-y-6">
                <div className="text-center">
                    <p className="text-sm font-medium uppercase tracking-wider mb-4" style={{ color: "var(--green-mid)" }}>
                        Votre résultat
                    </p>
                    <ScoreRing score={sGlobal} label="Score global" sublabel="/100" size="lg" />
                    <div className="mt-3 text-base" style={{ color: "var(--text-muted)" }}>
                        {totalTonnes.toFixed(1)} t CO₂e / an
                    </div>
                </div>

                <div className="rounded-2xl p-6" style={{ background: "var(--bg-card)", border: "1.5px solid var(--border)" }}>
                    <p className="text-sm font-semibold mb-5" style={{ color: "var(--text)" }}>Scores par catégorie</p>
                    <div className="flex justify-around flex-wrap gap-4">
                        <ScoreRing score={sCarbone} label="Carbone" sublabel={`${carboneResult.totalKgCo2e.toFixed(0)} kg`} />
                        {sIa !== null && <ScoreRing score={sIa} label="IA" sublabel={`${(iaKg * 1000).toFixed(2)} g`} />}
                        <ScoreRing score={sTransport} label="Transport" sublabel={`${carboneResult.transport.kgCo2e.toFixed(0)} kg`} />
                        <ScoreRing score={sAlimentation} label="Alimentation" sublabel={`${carboneResult.alimentation.kgCo2e.toFixed(0)} kg`} />
                        <ScoreRing score={sLogement} label="Logement" sublabel={`${carboneResult.logement.kgCo2e.toFixed(0)} kg`} />
                    </div>
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
                        L'objectif Accord de Paris est de <strong>{objectifTonnes.toFixed(0)} t</strong>.
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
