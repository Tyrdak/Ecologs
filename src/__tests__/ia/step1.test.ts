import { describe, it, expect } from "vitest";
import { resolveModel } from "@/src/core/ia/step1-model/ModelResolver";
import { estimateVram } from "@/src/core/ia/step1-model/VramEstimator";
import { findServer } from "@/src/core/ia/step1-model/ServerMatcher";

describe("ModelResolver", () => {
    it("résout un modèle Cohere 8B connu", () => {
        const model = resolveModel("cohere", "c4ai-aya-expanse-8b");
        expect(model).not.toBeNull();
        expect(model!.parametersBillion).toBe(8.03);
        expect(model!.type).toBe("dense");
        expect(model!.tps).toBe(23.1);
    });

    it("retourne null pour un modèle inexistant", () => {
        expect(resolveModel("openai", "modele-qui-nexiste-pas")).toBeNull();
    });

    it("retourne null pour un provider inexistant", () => {
        expect(resolveModel("provider-inexistant", "gpt-4")).toBeNull();
    });
});

describe("VramEstimator", () => {
    it("calcule 2 GB de VRAM par milliard de paramètres", () => {
        expect(estimateVram(7)).toBe(14);
        expect(estimateVram(70)).toBe(140);
        expect(estimateVram(8.03)).toBeCloseTo(16.06);
    });
});

describe("ServerMatcher", () => {
    it("trouve un serveur GPU pour un modèle 7B (14 GB VRAM)", () => {
        const server = findServer(14);
        expect(server).not.toBeNull();
        expect(server!.gpuUnits * server!.gpuVram).toBeGreaterThanOrEqual(14);
    });

    it("trouve le plus petit serveur qui suffit", () => {
        const small = findServer(14);
        const big = findServer(600);
        expect(big!.gpuUnits * big!.gpuVram).toBeGreaterThanOrEqual(
            small!.gpuUnits * small!.gpuVram
        );
    });

    it("retourne null si aucun serveur ne couvre la VRAM demandée", () => {
        expect(findServer(999999)).toBeNull();
    });
});
