"use client";
import { useState } from "react";
import { fr } from "./fr";
import { en } from "./en";
import type { Translations } from "./fr";

const LOCALES: Record<string, Translations> = { fr, en };

export function useTranslation() {
    const [locale, setLocale] = useState<"fr" | "en">(() => {
        if (typeof window === "undefined") return "fr";
        const saved = localStorage.getItem("locale") as "fr" | "en" | null;
        return saved && LOCALES[saved] ? saved : "fr";
    });

    function switchLocale(l: "fr" | "en") {
        setLocale(l);
        localStorage.setItem("locale", l);
    }

    return { t: LOCALES[locale], locale, switchLocale };
}
