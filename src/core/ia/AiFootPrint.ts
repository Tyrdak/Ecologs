import { Co2e } from "@/src/core/shared/Co2e";
import { AiUsage } from "@/src/core/ia/AiUsage";
import { AI_EMISSION_FACTORS } from "@/src/data/ia/aiEmissionFactors";

export type AiUsageCounts = Partial<Record<AiUsage, number>>;

export interface UsageDetail {
    usage: AiUsage;
    requests: number;
    co2e: Co2e;
    share: number;
}

export class AiFootPrint {
    constructor(private readonly counts: AiUsageCounts) {}

    private co2eFor(usage: AiUsage): Co2e {
        const requests = this.counts[usage] ?? 0;
        return AI_EMISSION_FACTORS[usage].apply(requests);
    }

    total(): Co2e {
        return Object.values(AiUsage).reduce(
            (sum, usage) => sum.plus(this.co2eFor(usage)),
            Co2e.zero(),
        );
    }

    details(): UsageDetail[] {
        const total = this.total();

        return Object.values(AiUsage)
            .map((usage) => {
                const co2e = this.co2eFor(usage);
                return {
                    usage,
                    requests: this.counts[usage] ?? 0,
                    co2e,
                    share: co2e.shareOf(total),
                };
            })
            .filter((detail) => detail.requests > 0);
    }
}
