"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Leaf } from "lucide-react";
import LocaleSwitcher from "@/src/components/ui/LocaleSwitcher";

interface Props {
    onStart?: () => void;
}

const LINKS = [
    { href: "/#methodologie", label: "Méthodologie" },
    { href: "/blog", label: "Blog" },
];

export default function Navbar({ onStart }: Props) {
    const pathname = usePathname();
    return (
        <nav
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12"
            style={{ background: "rgba(246,244,239,0.88)", backdropFilter: "blur(12px)", borderBottom: "1px solid var(--border)" }}
            aria-label="Navigation principale"
        >
            <Link href="/" className="flex items-center gap-2" style={{ color: "var(--green-deep)" }} aria-label="EcoLogs — Accueil">
                <Leaf size={18} strokeWidth={2} aria-hidden="true" />
                <span style={{ fontFamily: "Fraunces, serif", fontWeight: 600, fontSize: "1.05rem" }}>EcoLogs</span>
            </Link>
            <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center gap-1">
                    {LINKS.map(l => (
                        <Link
                            key={l.href}
                            href={l.href}
                            aria-current={pathname === l.href ? "page" : undefined}
                            className="text-sm font-medium px-3 py-1.5 rounded-full"
                            style={{ color: pathname === l.href ? "var(--green-deep)" : "var(--text-muted)" }}
                        >
                            {l.label}
                        </Link>
                    ))}
                </div>
                <LocaleSwitcher />
                <button
                    onClick={onStart}
                    className="flex items-center gap-1.5 text-sm font-medium px-5 py-2 rounded-full"
                    style={{ background: "var(--green-deep)", color: "var(--white)" }}
                    aria-label="Ouvrir le calculateur"
                >
                    Commencer
                    <ChevronRight size={15} aria-hidden="true" />
                </button>
            </div>
        </nav>
    );
}
