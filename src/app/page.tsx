"use client";
import { useRef, useState } from "react";
import Navbar from "@/src/components/layout/navbar";
import Footer from "@/src/components/layout/footer";
import HeroSection from "@/src/components/landing/herosection";
import CommentCaMarche from "@/src/components/landing/comment-ça-marche";
import Calculator from "@/src/components/calculator/Calculator";

export default function Home() {
    const [showCalculator, setShowCalculator] = useState(false);
    const calcRef = useRef<HTMLDivElement>(null);

    function handleStart() {
        setShowCalculator(true);
        setTimeout(() => {
            calcRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 60);
    }

    return (
        <div style={{ background: "var(--bg)" }}>
            <Navbar onStart={handleStart} />

            {!showCalculator ? (
                <>
                    <HeroSection onStart={handleStart} />
                    <CommentCaMarche />
                    <Footer />
                </>
            ) : (
                <div ref={calcRef} className="pt-16">
                    <Calculator onClose={() => setShowCalculator(false)} />
                    <Footer />
                </div>
            )}
        </div>
    );
}
