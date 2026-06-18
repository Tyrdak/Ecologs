import { ExternalLink } from "lucide-react";

const SOURCES = [
    {
        name: "ADEME Base Carbone",
        desc: "Facteurs d'émission transport & alimentation",
        href: "https://base-empreinte.ademe.fr",
    },
    {
        name: "Boavizta",
        desc: "Impact fabrication serveurs & GPU",
        href: "https://boavizta.org",
    },
    {
        name: "EcoLogits",
        desc: "Méthodologie empreinte IA",
        href: "https://ecologits.ai",
    },
    {
        name: "GIEC AR6",
        desc: "Objectif 2 °C — 2 t CO₂e/an",
        href: "https://www.ipcc.ch/ar6-syr",
    },
    {
        name: "IEA",
        desc: "Intensité carbone des mix électriques",
        href: "https://www.iea.org/data-and-statistics",
    },
];

export default function SourcesSection() {
    return (
        <section
            className="py-14 px-6"
            style={{ borderTop: "1px solid var(--border)" }}
            aria-labelledby="sources-title"
        >
            <div className="max-w-4xl mx-auto">
                <p
                    id="sources-title"
                    className="text-xs font-semibold uppercase tracking-widest text-center mb-8"
                    style={{ color: "var(--text-muted)" }}
                >
                    Données ouvertes & sources
                </p>
                <ul
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
                    role="list"
                >
                    {SOURCES.map(s => (
                        <li key={s.name}>
                            <a
                                href={s.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-col gap-1.5 p-4 rounded-xl h-full"
                                style={{
                                    background: "var(--bg-card)",
                                    border: "1px solid var(--border)",
                                    color: "inherit",
                                    textDecoration: "none",
                                }}
                                aria-label={`${s.name} — ${s.desc} (ouvre dans un nouvel onglet)`}
                            >
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-semibold" style={{ color: "var(--green-deep)" }}>
                                        {s.name}
                                    </span>
                                    <ExternalLink size={11} style={{ color: "var(--text-muted)" }} aria-hidden="true" />
                                </div>
                                <p className="text-xs leading-snug" style={{ color: "var(--text-muted)" }}>
                                    {s.desc}
                                </p>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
