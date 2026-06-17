import { Cpu, Server, Zap, Globe } from "lucide-react";

const STEPS = [
    {
        icon: Cpu,
        title: "1. Résolution du modèle -> GPU",
        desc: "On estime la VRAM nécessaire (paramètres × 2 octets en FP16) puis on sélectionne le GPU le plus adapté dans notre base (P100, L4, A100, H100...).",
    },
    {
        icon: Server,
        title: "2. Impact fabrication du serveur",
        desc: "Impact carbone de fabrication du serveur (GPU + CPU + RAM + SSD) amorti sur sa durée de vie et son taux d'utilisation. Source : données Boavizta.",
    },
    {
        icon: Zap,
        title: "3. Énergie consommée",
        desc: "Durée d'exécution = tokens ÷ TPS. Puissance = TDP GPU × nombre de GPU + CPU. Énergie (kWh) corrigée par le PUE du datacenter (1.1-1.3).",
    },
    {
        icon: Globe,
        title: "4. Mix énergétique & émissions",
        desc: "Intensité carbone du pays du provider (gCO₂/kWh) × énergie consommée = impact usage. Total = fabrication amortie + usage. Annualisé par requêtes/jour × 365.",
    }
];

export default function IaMethodologie() {
    return (
        <section className="py-20 px-6" style={{ background: "var(--bg-alt)" }} aria-labelledby="ia-method-title">
            <div className="max-w-4xl mx-auto">
                <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--green-mid)" }}>
                    Empreinte de l&apos;intelligence artificielle
                </p>
                <h2
                    id="ia-method-title"
                    style={{ fontFamily: "Fraunces, serif", fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 700, color: "var(--green-deep)", marginBottom: "0.75rem" }}
                >
                    Du GPU au gramme de CO₂
                </h2>
                <p className="text-sm mb-10" style={{ color: "var(--text-muted)", maxWidth: "580px", lineHeight: 1.7 }}>
                    Méthodologie inspirée d&apos;<strong>EcoLogits</strong> et des travaux de <strong>Boavizta</strong>.
                    Chaque requête passe par 4 étapes de calcul indépendantes.
                </p>
                <div className="grid md:grid-cols-2 gap-5">
                    {STEPS.map(s => {
                        const Icon = s.icon;
                        return (
                            <div key={s.title} className="rounded-2xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                                <div className="flex items-center gap-3 mb-3">
                                    <Icon size={20} style={{ color: "var(--green-mid)" }} aria-hidden="true" />
                                    <h3 className="font-semibold text-sm" style={{ color: "var(--text)" }}>{s.title}</h3>
                                </div>
                                <p className="text-sm" style={{ color: "var(--text-muted)", lineHeight: 1.6 }}>{s.desc}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
