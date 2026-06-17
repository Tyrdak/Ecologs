import { describe, it, expect } from "vitest";
import { amortizeImpact } from "@/src/core/ia/step3-amortization/AmortizationCalculator";
import { ServerSpec } from "@/src/core/ia/types";

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

describe("AmortizationCalculator", () => {
    it("retourne une valeur positive", () => {
        expect(amortizeImpact(1, server, 10000)).toBeGreaterThan(0);
    });

    it("est proportionnel au temps d'exécution", () => {
        const r1 = amortizeImpact(1, server, 10000);
        const r2 = amortizeImpact(2, server, 10000);
        expect(r2).toBeCloseTo(r1 * 2, 10);
    });

    it("calcule ΔL = 35040h × 3600s × 1 = 126 144 000 s", () => {
        const deltaL = 35040 * 3600 * 1;
        const expected = (1 / deltaL) * 10000;
        expect(amortizeImpact(1, server, 10000)).toBeCloseTo(expected, 10);
    });

    it("diminue si la durée de vie du serveur augmente", () => {
        const longLife: ServerSpec = { ...server, hoursLifetime: 70080 };
        const r1 = amortizeImpact(1, server, 10000);
        const r2 = amortizeImpact(1, longLife, 10000);
        expect(r2).toBeLessThan(r1);
    });
});
