import { describe, it, expect } from "vitest";
import { calcGpuImpact, findGpu } from "@/src/core/ia/step2-manufacturing/GpuIeCalculator";
import { calcBaseboardImpact } from "@/src/core/ia/step2-manufacturing/BaseboardIeCalculator";
import { calcServerImpact } from "@/src/core/ia/step2-manufacturing/ServerIeCalculator";
import { GpuSpec, ServerSpec } from "@/src/core/ia/types";

const gpuH100: GpuSpec = {
    name: "NVIDIA H100 SXM 80GB",
    vram: 80,
    tdpW: 700,
    dieSurface: 2810.4,
    pwbSurface: 296.37,
    massHeatsink: 0.90077,
};

const serverVeryhigh: ServerSpec = {
    id: "platfom_gpucompute_veryhigh",
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

describe("GpuIeCalculator", () => {
    it("calcule l'impact fabrication du H100 (silicium + circuit + dissipateur)", () => {
        const impact = calcGpuImpact(gpuH100);
        const expected = 2810.4 * 0.12 + 296.37 * 0.15 + 0.90077 * 0.009;
        expect(impact).toBeCloseTo(expected, 3);
    });

    it("trouve le H100 par VRAM exacte (80 GB)", () => {
        const gpu = findGpu(80);
        expect(gpu!.name).toBe("NVIDIA H100 SXM 80GB");
    });

    it("trouve le GPU le plus proche au-dessus si VRAM exacte absente (32 GB → A100 40 GB)", () => {
        const gpu = findGpu(32);
        expect(gpu!.vram).toBe(40);
    });

    it("retourne le plus grand GPU disponible si VRAM demandée dépasse tout", () => {
        const gpu = findGpu(999);
        expect(gpu).not.toBeNull();
        expect(gpu!.name).toBe("NVIDIA H100 SXM 80GB");
    });
});

describe("BaseboardIeCalculator", () => {
    it("retourne un impact positif pour un serveur standard", () => {
        const impact = calcBaseboardImpact(serverVeryhigh);
        expect(impact).toBeGreaterThan(0);
    });

    it("inclut le rack (150 kgCO2) et l'assemblage (6.68 kgCO2)", () => {
        const impact = calcBaseboardImpact(serverVeryhigh);
        expect(impact).toBeGreaterThan(150 + 6.68);
    });
});

describe("ServerIeCalculator", () => {
    it("l'impact serveur est supérieur à l'impact d'un seul GPU", () => {
        const gpuImpact = calcGpuImpact(gpuH100);
        const serverImpact = calcServerImpact(serverVeryhigh, gpuH100);
        expect(serverImpact).toBeGreaterThan(gpuImpact);
    });

    it("contient bien les 8 GPUs dans le total", () => {
        const gpuImpact = calcGpuImpact(gpuH100);
        const baseboard = calcBaseboardImpact(serverVeryhigh);
        const serverImpact = calcServerImpact(serverVeryhigh, gpuH100);
        expect(serverImpact).toBeCloseTo(baseboard + 8 * gpuImpact, 3);
    });
});
