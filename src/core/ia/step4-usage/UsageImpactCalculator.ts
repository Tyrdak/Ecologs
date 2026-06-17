import providersData from "@/src/data/ia/providers.json";
import energyMixData from "@/src/data/ia/energy-mix.json";
import { ProviderConfig } from "@/src/core/ia/types";

type ProvidersMap = Record<string, { country: string; pue: number }>;
type EnergyMixMap = Record<string, number>;

const providers = providersData as ProvidersMap;
const energyMix = energyMixData as EnergyMixMap;

export function getProviderConfig(provider: string): ProviderConfig {
    return providers[provider] ?? providers["default"];
}

export function getCarbonIntensity(country: string): number {
    return energyMix[country] ?? energyMix["default"];
}

// Impact d'usage (électricité) en kgCO2e
// Iu = E(kWh) × PUE × (intensité carbone en kgCO2/kWh)
export function calcUsageImpact(
    energyKwh: number,
    pue: number,
    carbonIntensityGco2kwh: number
): number {
    return energyKwh * pue * (carbonIntensityGco2kwh / 1000);
}
