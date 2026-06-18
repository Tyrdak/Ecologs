import { Co2e } from "@/src/core/shared/Co2e";
import { Equivalence } from "@/src/core/shared/Equivalence";

interface EquivalenceFactor {
    id: string;
    label: string;
    unit: string;
    kgCo2ePerUnit: number;
}

export const EQUIVALENCE_FACTORS: EquivalenceFactor[] = [
    {
        id: "voiture",
        label: "km en voiture (moyenne française)",
        unit: "km",
        kgCo2ePerUnit: 0.218,
    },
    {
        id: "repas_viande_rouge",
        label: "repas avec viande rouge",
        unit: "repas",
        kgCo2ePerUnit: 5.01,
    },
];

export function equivalencesFor(co2e: Co2e): Equivalence[] {
    return EQUIVALENCE_FACTORS.map((factor) => ({
        id: factor.id,
        label: factor.label,
        unit: factor.unit,
        quantity: co2e.kilograms / factor.kgCo2ePerUnit,
    }));
}
