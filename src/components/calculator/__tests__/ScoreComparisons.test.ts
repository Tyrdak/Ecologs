import { describe, it, expect } from "vitest";

const KM_VOITURE = 0.218;
const STREAMING_H = 0.036;

describe("ScoreComparisons calculs", () => {
    it("convertit kgCO2e en km voiture", () => {
        const iaKg = 0.218;
        expect(iaKg / KM_VOITURE).toBeCloseTo(1, 1);
    });

    it("un petit impact IA (1mg) < 1m en voiture", () => {
        const iaKg = 0.000001; // 1 mg
        const km = iaKg / KM_VOITURE;
        expect(km).toBeLessThan(0.001);
    });

    it("convertit kgCO2e en heures streaming", () => {
        const iaKg = 0.036;
        expect(iaKg / STREAMING_H).toBeCloseTo(1, 1);
    });
});
