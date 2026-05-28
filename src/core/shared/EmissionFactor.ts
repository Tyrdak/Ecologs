import { Co2e } from "./Co2e";
import { Source } from "./Source";

// Facteur d'émission : quantité de Co2e émise par unité d'activité (ex: kgCo2e/kWh)

export class EmissionFactor {
    constructor(
        readonly id: string,
        readonly label: string,
        readonly valuePerUnit: number,
        readonly unit: string,
        readonly source: Source,
        // "Uncertainty" : (0.3 = 30%) permet d'afficher une fourchette, obligatoire
        readonly uncertainty: number = 0,
    ) {
        if (!Number.isFinite(valuePerUnit) || valuePerUnit < 0) {
            throw new Error(`Facteur invalide "${id}": ${valuePerUnit}`);
        }
    }

    apply(quantity: number): Co2e {
        return Co2e.fromKg(this.valuePerUnit * quantity);
    }

    applyLow(quantity: number): Co2e {
        return Co2e.fromKg(this.valuePerUnit * quantity * (1 - this.uncertainty));
    }

    applyHigh(quantity: number): Co2e {
        return Co2e.fromKg(this.valuePerUnit * quantity * (1 + this.uncertainty));
    }

}
