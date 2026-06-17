import { describe, it, expect } from "vitest";
import { calcAiImpact } from "@/src/core/ia/AiImpactCalculator";

describe("AiImpactCalculator", () => {
    it("calcule l'empreinte carbone d'un modèle Cohere 8B", () => {
        const result = calcAiImpact({
            provider: "cohere",
            model: "c4ai-aya-expanse-8b",
            nbTokens: 500,
        });

        expect(result.totalKgCo2e).toBeGreaterThan(0);
        expect(result.ieRequest).toBeGreaterThan(0);
        expect(result.iuRequest).toBeGreaterThan(0);
        expect(result.detail.gpuName).toBeDefined();
        expect(result.detail.nbTokens).toBe(500);
    });

    it("lève une erreur pour un modèle inconnu", () => {
        expect(() =>
            calcAiImpact({ provider: "openai", model: "modele-inexistant", nbTokens: 100 })
        ).toThrow("Modèle inconnu");
    });

    it("une requête avec plus de tokens génère plus de CO2", () => {
        const petite = calcAiImpact({ provider: "cohere", model: "c4ai-aya-expanse-8b", nbTokens: 100 });
        const grande = calcAiImpact({ provider: "cohere", model: "c4ai-aya-expanse-8b", nbTokens: 1000 });
        expect(grande.totalKgCo2e).toBeGreaterThan(petite.totalKgCo2e);
    });

    it("le total est bien la somme Ie + Iu", () => {
        const result = calcAiImpact({ provider: "cohere", model: "c4ai-aya-expanse-8b", nbTokens: 500 });
        expect(result.totalKgCo2e).toBeCloseTo(result.ieRequest + result.iuRequest, 10);
    });

    it("mistralai utilise le serveur en Suède (mix carbone faible)", () => {
        const mistral = calcAiImpact({ provider: "mistralai", model: "codestral-2405", nbTokens: 500 });
        expect(mistral.detail.serverCountry).toBe("SE");
        expect(mistral.detail.carbonIntensityGco2kwh).toBe(13);
    });
});
