interface HeroProps {
    onStart: () => void;
}

export default function HeroSection({ onStart }: HeroProps) {
    return (
        <section className="min-h-screen flex flex-col justify-center px-6 md:px-16 pt-24 pb-16">
            <div className="max-w-2xl">
                <h1
                    style={{
                        fontFamily: "Fraunces, Georgia, serif",
                        fontSize: "clamp(2.8rem, 6vw, 5rem)",
                        fontWeight: 600,
                        lineHeight: 1.08,
                        color: "var(--text)",
                        letterSpacing: "-0.02em",
                    }}
                >
                    Quelle est votre
                    <br />
                    <span style={{ color: "var(--green-mid)", fontStyle: "italic" }}>
                        empreinte carbone&nbsp;?
                    </span>
                </h1>

                <p
                    className="mt-8 text-lg"
                    style={{ color: "var(--text-muted)", maxWidth: "40ch", lineHeight: 1.6 }}
                >
                    En 5 minutes, estimez votre impact CO₂ sur le transport,
                    l&apos;alimentation et le logement.
                </p>

                <button
                    onClick={onStart}
                    className="mt-10 inline-flex items-center gap-2 px-7 py-3.5 font-medium text-base"
                    style={{
                        background: "var(--green-deep)",
                        color: "var(--white)",
                        transition: "opacity 0.15s",
                    }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = "0.85")}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = "1")}
                >
                    Commencer le calcul
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>

                <p className="mt-4 text-sm" style={{ color: "var(--text-muted)" }}>
                    Gratuit · Aucune inscription · Données ADEME 2024
                </p>
            </div>

            <div
                className="mt-20 flex gap-12"
                style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}
            >
                {[
                    { val: "9,9 t", label: "Moyenne française / an" },
                    { val: "2 t", label: "Objectif 2°C / an" },
                ].map(({ val, label }) => (
                    <div key={label}>
                        <div
                            style={{
                                fontFamily: "Fraunces, Georgia, serif",
                                fontSize: "1.75rem",
                                fontWeight: 600,
                                color: "var(--text)",
                                lineHeight: 1.2,
                            }}
                        >
                            {val}
                        </div>
                        <div className="mt-1">{label}</div>
                    </div>
                ))}
            </div>
        </section>
    );
}
