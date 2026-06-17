import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Ecologs — Calculateur d'empreinte carbone",
    description:
        "Estimez votre empreinte carbone personnelle en quelques minutes : transport, alimentation, logement. Comprenez où agir pour un avenir 2°C.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="fr" className="h-full antialiased">
            <body className="min-h-full flex flex-col">{children}</body>
        </html>
    );
}
