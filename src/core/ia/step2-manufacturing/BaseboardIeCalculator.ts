import factorsData from "@/src/data/ia/factors.json";
import { ServerSpec } from "@/src/core/ia/types";

interface Factors {
    assembly: { gwp: { impact: number } };
    case: { gwp: { rack: { impact: number }; blade: { impact_blade_server: number } } };
    cpu: { gwp: { die_impact: number; impact: number } };
    ram: { gwp: { die_impact: number } };
    ssd: { gwp: { die_impact: number } };
}

const f = factorsData as unknown as Factors;

function getCaseImpact(caseType: string): number {
    if (caseType === "blade") return f.case.gwp.blade.impact_blade_server;
    return f.case.gwp.rack.impact;
}

// Impact de fabrication du serveur sans les GPUs (boîtier, assemblage, CPU, RAM, SSD)
export function calcBaseboardImpact(server: ServerSpec): number {
    const caseImpact = getCaseImpact(server.caseType);
    const assemblyImpact = f.assembly.gwp.impact;

    const cpuDieSurface = server.cpuCoreUnits * server.cpuDieSizePerCore;
    const cpu1Impact = cpuDieSurface * f.cpu.gwp.die_impact + f.cpu.gwp.impact;
    const cpuTotalImpact = cpu1Impact * server.cpuUnits;

    const ramImpact = server.ramUnits * server.ramCapacityGb * f.ram.gwp.die_impact;
    const ssdImpact = server.ssdUnits * server.ssdCapacityGb * f.ssd.gwp.die_impact;

    return caseImpact + assemblyImpact + cpuTotalImpact + ramImpact + ssdImpact;
}
