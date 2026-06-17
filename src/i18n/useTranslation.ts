"use client";
import { useState, useEffect } from "react";
import { fr } from "./fr";
import { en } from "./en";
import type { Translations } from "./fr";

const LOCALES: Record<string, Translations> = { fr, en };

export function useTranslation() {
    const [locale, setLocale] = useState<"fr" | "en">("fr");

    useEffect(() => {
        const saved = localStorage.getItem("locale") as "fr" | "en" | null;
        if (saved && LOCALES[saved]) setLocale(saved);
    }, []);

    function switchLocale(l: "fr" | "en") {
        setLocale(l);
        localStorage.setItem("locale", l);
    }

    return { t: LOCALES[locale], locale, switchLocale };
}
