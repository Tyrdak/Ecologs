"use client";
import { ArrowRight } from "lucide-react";

interface Props {
    onStart: () => void;
}

export default function HeroSection({ onStart }: Props) {
    return (
        <section
            className="flex flex-col items-center justify-center min-h-screen px-6 text-center"
            style={{ background: "var(--bg)" }}
        >
            <p
                className="text-sm font-medium tracking-widest uppercase mb-6"
                style={{ color: "var(--green-mid)", letterSpacing: "0.15em" }}
            >
                Calculateur d'empreinte carbone
            </p>
            <h1
                className="mb-6 leading-tight"
                style={{
                    fontFamily: "Fraunces, serif",
                    fontSize: "clamp(2.2rem, 6vw, 4.5rem)",
                    fontWeight: 700,
                    color: "var(--green-deep)",
                    maxWidth: "800px",
                }}
            >
                Quelle est votre empreinte carbone&nbsp;?
            </h1>
            <p
                className="mb-10 text-base md:text-lg"
                style={{ color: "var(--text-muted)", maxWidth: "520px", lineHeight: 1.7 }}
            >
                Estimez l'impact climatique de vos habitudes quotidiennes
                et de votre usage de l'IA en quelques minutes.
            </p>
            <button
                onClick={onStart}
                className="flex items-center gap-2 px-8 py-4 rounded-full text-base font-semibold"
                style={{ background: "var(--green-deep)", color: "var(--white)" }}
            >
                Commencer le calcul
                <ArrowRight size={18} />
            </button>
        </section>
    );
}
