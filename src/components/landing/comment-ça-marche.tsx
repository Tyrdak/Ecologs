export default function CommentCaMarche() {
    const steps = [
        {
            num: "1.",
            title: "Répondez aux questions",
            desc: "Transport, alimentation, logement — 3 catégories, quelques minutes. Des valeurs par défaut sont déjà pré-remplies.",
        },
        {
            num: "2.",
            title: "Votre bilan calculé",
            desc: "Facteurs d'émission certifiés ADEME 2024. Résultat en tCO₂e/an avec le détail par poste.",
        },
        {
            num: "3.",
            title: "Comprenez où agir",
            desc: "Visualisez votre position par rapport à la moyenne française et à l'objectif 2°C. Identifiez vos leviers d'action.",
        },
    ];

    return (
        <section
            id="comment-ca-marche"
            className="py-24 px-6 md:px-16"
            style={{ borderTop: "1px solid var(--border)" }}
        >
            <div className="max-w-xl">
                <h2
                    className="mb-12"
                    style={{
                        fontFamily: "Fraunces, Georgia, serif",
                        fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                        fontWeight: 600,
                        color: "var(--text)",
                    }}
                >
                    Comment ça marche
                </h2>

                <ol className="flex flex-col gap-8">
                    {steps.map(({ num, title, desc }) => (
                        <li key={num} className="flex gap-6">
                            <span
                                style={{
                                    fontFamily: "Fraunces, Georgia, serif",
                                    fontSize: "1rem",
                                    fontWeight: 700,
                                    color: "var(--text-muted)",
                                    minWidth: "1.75rem",
                                    paddingTop: "0.15rem",
                                }}
                            >
                                {num}
                            </span>
                            <div>
                                <h3 className="font-semibold mb-1" style={{ color: "var(--text)" }}>
                                    {title}
                                </h3>
                                <p className="text-sm" style={{ color: "var(--text-muted)", lineHeight: 1.6 }}>
                                    {desc}
                                </p>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}
