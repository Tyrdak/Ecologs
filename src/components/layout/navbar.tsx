"use client";
import Logo from "@/src/components/ui/Logo";

interface NavbarProps {
    onStart?: () => void;
}

export default function Navbar({ onStart }: NavbarProps) {
    return (
        <nav
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12"
            style={{
                background: "rgba(246,244,239,0.88)",
                backdropFilter: "blur(12px)",
                borderBottom: "1px solid var(--border)",
            }}
        >
            <Logo size="sm" />
            <div className="flex items-center gap-6">
                <a
                    href="#comment-ca-marche"
                    className="hidden md:block text-sm font-medium"
                    style={{ color: "var(--text-muted)" }}
                >
                    Comment ça marche
                </a>
                <button
                    onClick={onStart}
                    className="text-sm font-medium px-5 py-2"
                    style={{ background: "var(--green-deep)", color: "var(--white)", transition: "opacity 0.15s" }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = "0.85")}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = "1")}
                >
                    Calculer
                </button>
            </div>
        </nav>
    );
}
