"use client";
import { useEffect, useState } from "react";
import type { Section } from "@/src/content/articles/impact-ia";

interface Props {
    sections: Section[];
}

export default function TableOfContents({ sections }: Props) {
    const [active, setActive] = useState(sections[0]?.id ?? "");

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
            },
            { rootMargin: "-20% 0% -70% 0%" }
        );
        sections.forEach(s => {
            const el = document.getElementById(s.id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, [sections]);

    return (
        <nav aria-label="Sommaire de l'article" className="sticky top-24 hidden lg:block">
            <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "var(--text-muted)" }}>
                Sommaire
            </p>
            <ol className="space-y-1" role="list">
                {sections.map(s => (
                    <li key={s.id}>
                        <a
                            href={`#${s.id}`}
                            aria-current={active === s.id ? "location" : undefined}
                            className="block text-sm py-1 px-2 rounded-lg transition-all"
                            style={{
                                color: active === s.id ? "var(--green-deep)" : "var(--text-muted)",
                                background: active === s.id ? "var(--bg-alt)" : "transparent",
                                fontWeight: active === s.id ? 600 : 400,
                            }}
                        >
                            {s.title}
                        </a>
                    </li>
                ))}
            </ol>
        </nav>
    );
}
