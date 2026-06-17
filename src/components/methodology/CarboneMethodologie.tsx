import { Car, Salad, Home, Calculator } from "lucide-react";

const STEPS = [
    {
        icon: Car,
        title: "Transport",
        desc: "Voiture (carburant × km × occupants), avion (court/long-courrier), train, bus, métro, moto. Facteurs d'émission : base ADEME 2024.",
        source: "ADEME Base Carbone",
    },
    {
        icon: Salad,
        title: "Alimentation",
        desc: "Régime alimentaire hebdomadaire × 52 semaines. Différenciation végétalien / végétarien / viande blanche / viande rouge / poisson.",
        source: "ADEME, Our World in Data",
    },
    {
        icon: Home,
        title: "Logement",
        desc: "Surface × DPE (âge du logement) × énergie de chauffage + construction amortie sur durée de vie + climatisation + hébergement vacances.",
        source: "ADEME, RE2020",
    },
    {
        icon: Calculator,
        title: "Agrégation",
        desc: "Somme des 3 postes en kgCO₂e/an. Comparaison avec la moyenne française (9,9 t) et l'objectif Accord de Paris (2 t).",
        source: "GIEC AR6",
    },
];

export default function CarboneMethodologie() {
    return (
        <section className="py-20 px-6 max-w-4xl mx-auto" aria-labelledby="carbone-method-title">
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--green-mid)" }}>
                Empreinte carbone quotidienne
            </p>
            <h2
                id="carbone-method-title"
                style={{ fontFamily: "Fraunces, serif", fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 700, color: "var(--green-deep)", marginBottom: "2.5rem" }}
            >
                Transport, alimentation, logement
            </h2>
            <ol className="space-y-6" role="list">
                {STEPS.map((s, i) => {
                    const Icon = s.icon;
                    return (
                        <li key={s.title} className="flex gap-5 rounded-2xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                            <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl" style={{ background: "var(--green-deep)", color: "white" }}>
                                <span className="text-xs font-bold mr-0.5" aria-hidden="true">{i + 1}</span>
                                <Icon size={16} aria-hidden="true" />
                            </div>
                            <div>
                                <h3 className="font-semibold mb-1" style={{ color: "var(--text)" }}>{s.title}</h3>
                                <p className="text-sm mb-2" style={{ color: "var(--text-muted)", lineHeight: 1.6 }}>{s.desc}</p>
                                <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "var(--bg-alt)", color: "var(--green-mid)", border: "1px solid var(--border)" }}>
                                    Source : {s.source}
                                </span>
                            </div>
                        </li>
                    );
                })}
            </ol>
        </section>
    );
}
