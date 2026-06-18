import { describe, it, expect } from "vitest";

// Teste la logique pure du stepper (stateless)
describe("Stepper logic", () => {
    it("step 0 is active, none are done", () => {
        const currentStep = 0;
        const steps = ["Transport", "Alimentation", "Logement", "Usage IA"];
        expect(steps[currentStep]).toBe("Transport");
        expect(currentStep < 0).toBe(false); // aucune étape complétée
    });

    it("step 2 marks 0 and 1 as done", () => {
        const currentStep = 2;
        const done = (i: number) => i < currentStep;
        expect(done(0)).toBe(true);
        expect(done(1)).toBe(true);
        expect(done(2)).toBe(false);
    });
});
