// Quantité d'équivalent CO2, stockée en Kg (kgCo2e)

export class Co2e {
    private constructor(private readonly kg: number) {
        if (!Number.isFinite(kg) || kg < 0) {
            throw new Error(`Quantité Co2e invalide : ${kg}`);
        }
    }

    static fromKg(kg: number): Co2e {
        return new Co2e(kg);
    }

    static fromTonnes(tonnes: number): Co2e {
        return new Co2e(tonnes * 1000);
    }

    static zero(): Co2e {
        return new Co2e(0);
    }

    get kilograms(): number {
        return this.kg
    }

    get tonnes(): number {
        return this.kg / 1000;
    }

    plus(other: Co2e): Co2e {
        return new Co2e(this.kg + other.kg);
    }

    times(factor: number): Co2e {
        return new Co2e(this.kg * factor);
    }

    // Part en % de cette valeur dans un total donné
    shareOf(total: Co2e): number {
        return total.kg === 0 ? 0 : (this.kg / total.kg) * 100;
    }
}