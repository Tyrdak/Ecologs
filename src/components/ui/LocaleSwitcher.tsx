"use client";
import { useTranslation } from "@/src/i18n/useTranslation";

export default function LocaleSwitcher() {
    const { locale, switchLocale } = useTranslation();
    return (
        <div className="flex items-center gap-1 text-xs font-medium" role="group" aria-label="Langue">
            {(["fr", "en"] as const).map(l => (
                <button
                    key={l}
                    onClick={() => switchLocale(l)}
                    aria-pressed={locale === l}
                    aria-label={`Passer en ${l === "fr" ? "français" : "anglais"}`}
                    className="px-2 py-1 rounded uppercase"
                    style={{
                        background: locale === l ? "var(--green-deep)" : "transparent",
                        color: locale === l ? "white" : "var(--text-muted)",
                    }}
                >
                    {l}
                </button>
            ))}
        </div>
    );
}
