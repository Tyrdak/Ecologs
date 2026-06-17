import serverData from "@/src/data/ia/server.json";
import { ServerSpec } from "@/src/core/ia/types";

interface RawServer {
    id: string;
    "CASE.case_type": string;
    "CPU.units": number;
    "CPU.core_units": string | number;
    "CPU.die_size_per_core": string | number;
    "RAM.units": string | number;
    "RAM.capacity": number;
    "SSD.units": string | number;
    "SSD.capacity": number;
    "GPU.units": number;
    "GPU.vram": number;
    "USAGE.hours_life_time": number;
    "USAGE.use_time_ratio": number;
}

// Les champs CSV ont le format "médiane;min;max" — on prend la médiane
function parseMedian(value: string | number): number {
    if (typeof value === "number") return value;
    return parseFloat(value.split(";")[0]) || 0;
}

function toServerSpec(raw: RawServer): ServerSpec {
    return {
        id: raw.id,
        caseType: raw["CASE.case_type"],
        cpuUnits: raw["CPU.units"],
        cpuCoreUnits: parseMedian(raw["CPU.core_units"]),
        cpuDieSizePerCore: parseMedian(raw["CPU.die_size_per_core"]),
        ramUnits: parseMedian(raw["RAM.units"]),
        ramCapacityGb: raw["RAM.capacity"],
        ssdUnits: parseMedian(raw["SSD.units"]),
        ssdCapacityGb: raw["SSD.capacity"],
        gpuUnits: raw["GPU.units"],
        gpuVram: raw["GPU.vram"],
        hoursLifetime: raw["USAGE.hours_life_time"],
        useTimeRatio: raw["USAGE.use_time_ratio"],
    };
}

// Trouve le plus petit serveur GPU dont la VRAM totale couvre les besoins
export function findServer(vramNeededGb: number): ServerSpec | null {
    const servers = serverData as RawServer[];

    const candidates = servers
        .filter((s) => s["GPU.units"] > 0 && s["GPU.vram"] > 0)
        .filter((s) => s["GPU.units"] * s["GPU.vram"] >= vramNeededGb)
        .sort((a, b) => a["GPU.units"] * a["GPU.vram"] - b["GPU.units"] * b["GPU.vram"]);

    if (candidates.length === 0) return null;

    return toServerSpec(candidates[0]);
}
