"use client";
import { useState } from "react";
import Navbar from "@/src/components/layout/navbar";
import Footer from "@/src/components/layout/footer";
import HeroSection from "@/src/components/landing/herosection";
import GlobalCalculator from "@/src/components/calculator/GlobalCalculator";
import CarboneMethodologie from "@/src/components/methodology/CarboneMethodologie";
import IaMethodologie from "@/src/components/methodology/IaMethodologie";
import SourcesSection from "@/src/components/landing/SourcesSection";

export default function Home() {
    const [showCalc, setShowCalc] = useState(false);

    if (showCalc) {
        return (
            <>
                <Navbar onStart={() => setShowCalc(true)} />
                <GlobalCalculator onBack={() => setShowCalc(false)} />
                <Footer />
            </>
        );
    }

    return (
        <div style={{ background: "var(--bg)" }}>
            <Navbar onStart={() => setShowCalc(true)} />
            <main id="main-content">
                <HeroSection onStart={() => setShowCalc(true)} />
                <section id="methodologie" aria-label="Méthodologie de calcul">
                    <CarboneMethodologie />
                    <IaMethodologie />
                </section>
                <SourcesSection />
            </main>
            <Footer />
        </div>
    );
}
