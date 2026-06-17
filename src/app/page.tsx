"use client";
import { useState } from "react";
import Navbar from "@/src/components/layout/navbar";
import Footer from "@/src/components/layout/footer";
import HeroSection from "@/src/components/landing/herosection";
import GlobalCalculator from "@/src/components/calculator/GlobalCalculator";

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
            <HeroSection onStart={() => setShowCalc(true)} />
            <Footer />
        </div>
    );
}
