import { describe, it, expect } from "vitest";
import { estimateExecutionTime } from "@/src/core/ia/step4-usage/ExecutionTimeEstimator";
import { calcEnergyKwh } from "@/src/core/ia/step4-usage/EnergyCalculator";
import { calcUsageImpact, getProviderConfig, getCarbonIntensity } from "@/src/core/ia/step4-usage/UsageImpactCalculator";
import { GpuSpec, ServerSpec } from "@/src/core/ia/types";

const gpu: GpuSpec = {
    name: "NVIDIA H100 SXM 80GB",
    vram: 80,
    tdpW: 700,
    dieSurface: 2810.4,
    pwbSurface: 296.37,
    massHeatsink: 0.90077,
};

const server: ServerSpec = {
    id: "test",
    caseType: "rack",
    cpuUnits: 2,
    cpuCoreUnits: 24,
    cpuDieSizePerCore: 0,
    ramUnits: 14,
    ramCapacityGb: 64,
    ssdUnits: 2,
    ssdCapacityGb: 2000,
    gpuUnits: 8,
    gpuVram: 80,
    hoursLifetime: 35040,
    useTimeRatio: 1,
};

describe("ExecutionTimeEstimator", () => {
    it("calcule 500 tokens à 50 TPS = 10 secondes", () => {
        expect(estimateExecutionTime(500, 50)).toBe(10);
    });

    it("lève une erreur si TPS est nul ou négatif", () => {
        expect(() => estimateExecutionTime(500, 0)).toThrow("TPS invalide");
        expect(() => estimateExecutionTime(500, -1)).toThrow("TPS invalide");
    });
});

describe("EnergyCalculator", () => {
    it("calcule la conso : (8×700W + 500W) × temps", () => {
        const timeSec = 10;
        const puissanceW = 8 * 700 + 500;
        const expected = (puissanceW / 1000) * (timeSec / 3600);
        expect(calcEnergyKwh(timeSec, server, gpu)).toBeCloseTo(expected, 10);
    });
});

describe("UsageImpactCalculator", () => {
    it("retourne la config mistralai (Suède)", () => {
        const config = getProviderConfig("mistralai");
        expect(config.country).toBe("SE");
        expect(config.pue).toBe(1.3);
    });

    it("utilise la config par défaut pour un provider inconnu", () => {
        const config = getProviderConfig("provider-inconnu");
        expect(config).toBeDefined();
        expect(config.country).toBe("US");
    });

    it("retourne 60 gCO2/kWh pour la France", () => {
        expect(getCarbonIntensity("FR")).toBe(60);
    });

    it("utilise la valeur par défaut pour un pays inconnu", () => {
        expect(getCarbonIntensity("XX")).toBe(300);
    });

    it("calcule Iu = E × PUE × Fem (conversion g→kg)", () => {
        const result = calcUsageImpact(1, 1.2, 380);
        expect(result).toBeCloseTo(1 * 1.2 * 0.38, 5);
    });
});
