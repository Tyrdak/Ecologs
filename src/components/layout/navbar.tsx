"use client";
import { ChevronRight, Leaf } from "lucide-react";

interface Props {
    onStart?: () => void;
}

export default function Navbar({ onStart }: Props) {
    return (
        <nav
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12"
            style={{
                background: "rgba(246,244,239,0.88)",
                backdropFilter: "blur(12px)",
                borderBottom: "1px solid var(--border)",
            }}
        >
            <div className="flex items-center gap-2" style={{ color: "var(--green-deep)" }}>
                <Leaf size={18} strokeWidth={2} />
                <span style={{ fontFamily: "Fraunces, serif", fontWeight: 600, fontSize: "1.05rem" }}>
                    EcoLogs
                </span>
            </div>
            <button
                onClick={onStart}
                className="flex items-center gap-1.5 text-sm font-medium px-5 py-2 rounded-full"
                style={{ background: "var(--green-deep)", color: "var(--white)" }}
            >
                Commencer
                <ChevronRight size={15} />
            </button>
        </nav>
    );
}
