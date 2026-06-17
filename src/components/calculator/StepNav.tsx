import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";

interface Props {
    step: number;
    totalSteps: number;
    onPrev: () => void;
    onNext: () => void;
    loading?: boolean;
    runningTotal: string;
}

export default function StepNav({ step, totalSteps, onPrev, onNext, loading, runningTotal }: Props) {
    const isLast = step === totalSteps - 1;
    return (
        <div className="mt-6 flex items-center justify-between">
            <button
                onClick={onPrev}
                className="flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-full"
                style={{ color: "var(--text-muted)", background: "var(--bg-alt)", border: "1px solid var(--border)" }}
            >
                <ArrowLeft size={15} />
                {step === 0 ? "Retour" : "Précédent"}
            </button>
            <div className="text-center">
                <div style={{ fontFamily: "Fraunces, serif", fontSize: "1.1rem", fontWeight: 600, color: "var(--text)" }}>
                    {runningTotal} t CO₂e
                </div>
                <div className="text-xs" style={{ color: "var(--text-muted)" }}>en cours…</div>
            </div>
            <button
                onClick={onNext}
                disabled={loading}
                className="flex items-center gap-2 text-sm font-semibold px-6 py-2.5 rounded-full"
                style={{ background: "var(--green-deep)", color: "white", opacity: loading ? 0.7 : 1 }}
            >
                {loading && <Loader2 size={15} className="animate-spin" />}
                {isLast ? "Voir mes résultats" : "Suivant"}
                {!loading && <ArrowRight size={15} />}
            </button>
        </div>
    );
}
