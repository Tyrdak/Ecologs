import { BookOpen } from "lucide-react";

export default function MethodologieHero() {
    return (
        <section
            className="py-24 px-6 text-center"
            style={{ background: "var(--green-deep)", color: "white" }}
            aria-labelledby="methodology-title"
        >
            <div className="flex justify-center mb-4">
                <BookOpen size={32} aria-hidden="true" />
            </div>
            <p className="text-sm font-medium uppercase tracking-widest mb-3 opacity-70">
                Transparence & sources
            </p>
            <h1
                id="methodology-title"
                style={{ fontFamily: "Fraunces, serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, maxWidth: "700px", margin: "0 auto 1rem" }}
            >
                Comment calculons-nous votre empreinte&nbsp;?
            </h1>
            <p className="text-base opacity-80 max-w-xl mx-auto" style={{ lineHeight: 1.7 }}>
                Nos calculs s'appuient sur des données publiques vérifiées (ADEME, Boavizta, EcoLogits)
                et une méthodologie ouverte et reproductible.
            </p>
        </section>
    );
}
