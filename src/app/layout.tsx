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
            <body className="min-h-full flex flex-col">
                <a
                    href="#main-content"
                    className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-medium"
                    style={{ background: "var(--green-deep)", color: "white" }}
                >
                    Aller au contenu principal
                </a>
                {children}
            </body>
        </html>
    );
}
