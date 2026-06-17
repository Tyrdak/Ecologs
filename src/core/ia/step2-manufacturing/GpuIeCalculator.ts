import gpuData from "@/src/data/ia/gpu_specs.json";
import { GpuSpec } from "@/src/core/ia/types";

interface RawGpu {
    name: string;
    vram: number;
    tdp_w: number;
    die_surface: number;
    pwb_surface: number;
    mass_heatsink: number;
}

const FACTEUR_SILICIUM = 0.12;  // kgCO2e/mm²
const FACTEUR_PWB = 0.15;       // kgCO2e/mm²
const FACTEUR_METAL = 0.009;    // kgCO2e/kg

// Impact de fabrication d'un GPU en kgCO2e (formule Boavizta)
export function calcGpuImpact(gpu: GpuSpec): number {
    const silicium = gpu.dieSurface * FACTEUR_SILICIUM;
    const circuit = gpu.pwbSurface * FACTEUR_PWB;
    const dissipateur = gpu.massHeatsink * FACTEUR_METAL;
    return silicium + circuit + dissipateur;
}

function toGpuSpec(raw: RawGpu): GpuSpec {
    return {
        name: raw.name,
        vram: raw.vram,
        tdpW: raw.tdp_w,
        dieSurface: raw.die_surface,
        pwbSurface: raw.pwb_surface,
        massHeatsink: raw.mass_heatsink,
    };
}

// Trouve le GPU avec la VRAM exacte, sinon le plus proche au-dessus
export function findGpu(vramGb: number): GpuSpec | null {
    const gpus = gpuData as RawGpu[];

    const exact = gpus.find((g) => g.vram === vramGb);
    if (exact) return toGpuSpec(exact);

    const above = [...gpus].filter((g) => g.vram >= vramGb).sort((a, b) => a.vram - b.vram);
    if (above.length > 0) return toGpuSpec(above[0]);

    const below = [...gpus].sort((a, b) => b.vram - a.vram);
    return below.length > 0 ? toGpuSpec(below[0]) : null;
}
