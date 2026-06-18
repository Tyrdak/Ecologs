import { GpuSpec, ServerSpec } from "@/src/core/ia/types";
import { calcGpuImpact } from "./GpuIeCalculator";
import { calcBaseboardImpact } from "./BaseboardIeCalculator";

// Impact total de fabrication du serveur en kgCO2e
// IE_server = baseboard + (nb_gpu × IE_gpu)
export function calcServerImpact(server: ServerSpec, gpu: GpuSpec): number {
    const baseboardImpact = calcBaseboardImpact(server);
    const gpuImpact = calcGpuImpact(gpu);
    return baseboardImpact + server.gpuUnits * gpuImpact;
}
