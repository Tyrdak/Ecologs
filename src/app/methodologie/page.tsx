import type { Metadata } from "next";
import MethodologieHero from "@/src/components/methodology/MethodologieHero";
import CarboneMethodologie from "@/src/components/methodology/CarboneMethodologie";
import IaMethodologie from "@/src/components/methodology/IaMethodologie";
import Navbar from "@/src/components/layout/navbar";
import Footer from "@/src/components/layout/footer";

export const metadata: Metadata = {
    title: "Méthodologie | EcoLogs — Comment calculer l'empreinte carbone",
    description: "Découvrez comment EcoLogs calcule votre empreinte carbone : transport, alimentation, logement, et l'impact de l'IA (GPU, serveur, mix énergétique).",
    keywords: ["empreinte carbone", "méthodologie", "calcul CO2", "impact IA", "GPU énergie", "ADEME"],
};

export default function MethodologiePage() {
    return (
        <>
            <Navbar />
            <main id="main-content" className="pt-16">
                <MethodologieHero />
                <CarboneMethodologie />
                <IaMethodologie />
            </main>
            <Footer />
        </>
    );
}
