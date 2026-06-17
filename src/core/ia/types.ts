export interface ModelSpec {
    provider: string;
    name: string;
    parametersBillion: number;
    type: "dense" | "moe";
    tps: number;
}

export interface GpuSpec {
    name: string;
    vram: number;
    dieSurface: number;
    pwbSurface: number;
    massHeatsink: number;
    tdpW: number;
}

export interface ServerSpec {
    id: string;
    caseType: string;
    cpuUnits: number;
    cpuCoreUnits: number;
    cpuDieSizePerCore: number;
    ramUnits: number;
    ramCapacityGb: number;
    ssdUnits: number;
    ssdCapacityGb: number;
    gpuUnits: number;
    gpuVram: number;
    hoursLifetime: number;
    useTimeRatio: number;
}

export interface ProviderConfig {
    country: string;
    pue: number;
}

export interface AiRequestInput {
    provider: string;
    model: string;
    nbTokens: number;
}

export interface AiImpactResult {
    ieRequest: number;
    iuRequest: number;
    totalKgCo2e: number;
    detail: {
        executionTimeSec: number;
        energyKwh: number;
        serverCountry: string;
        carbonIntensityGco2kwh: number;
        pue: number;
        serverId: string;
        gpuName: string;
        tps: number;
        nbTokens: number;
    };
}
