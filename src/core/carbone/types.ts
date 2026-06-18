import type {
    VOITURE_FACTEURS,
    REPAS_FACTEURS,
    PETIT_DEJ_FACTEURS,
    CHAUFFAGE_FACTEURS,
    VACANCES_FACTEURS,
} from "@/src/data/carbone/emissionFactors";

export type TypeVoiture = keyof typeof VOITURE_FACTEURS;
export type TypeRepas = keyof typeof REPAS_FACTEURS;
export type TypePetitDej = keyof typeof PETIT_DEJ_FACTEURS;
export type TypeChauffage = keyof typeof CHAUFFAGE_FACTEURS;
export type TypeVacances = keyof typeof VACANCES_FACTEURS;
export type TypeLogement = "appartement" | "maison";
export type AgeLogement = "recent" | "ancien";

export interface TransportInputs {
    voiture: {
        utilise: boolean;
        kmAnnuels: number;
        typeCarburant: TypeVoiture;
        nbOccupants: number;
    };
    avion: {
        heuresCourtCourrier: number;
        heuresLongCourrier: number;
    };
    train: {
        kmAnnuels: number;
    };
    bus: {
        kmAnnuels: number;
    };
    metro: {
        kmAnnuels: number;
    };
    moto: {
        utilise: boolean;
        kmAnnuels: number;
    };
}

export interface AlimentationInputs {
    repasParSemaine: Record<TypeRepas, number>;
    petitDejeuner: TypePetitDej;
}

export interface LogementInputs {
    type: TypeLogement;
    surface: number;
    nbHabitants: number;
    ageLogement: AgeLogement;
    chauffage: TypeChauffage;
    consoElecKwh: number | null; // null = utiliser défaut estimé
    climatisation: boolean;
    nbClimatiseurs: number;
    nuitesVacances: Partial<Record<TypeVacances, number>>;
}

export interface CarboneInputs {
    transport: TransportInputs;
    alimentation: AlimentationInputs;
    logement: LogementInputs;
}

export interface CategoryResult {
    label: string;
    kgCo2e: number;
    details: Record<string, number>;
}

export interface CarboneResult {
    totalKgCo2e: number;
    transport: CategoryResult;
    alimentation: CategoryResult;
    logement: CategoryResult;
    moyenneFrance: number;
    objectif2Degres: number;
}

export const DEFAULT_INPUTS: CarboneInputs = {
    transport: {
        voiture: { utilise: true, kmAnnuels: 12000, typeCarburant: "essence", nbOccupants: 1 },
        avion:   { heuresCourtCourrier: 2, heuresLongCourrier: 0 },
        train:   { kmAnnuels: 1000 },
        bus:     { kmAnnuels: 200 },
        metro:   { kmAnnuels: 500 },
        moto:    { utilise: false, kmAnnuels: 0 },
    },
    alimentation: {
        repasParSemaine: {
            vegalien:      0,
            vegetarien:    2,
            viandeBlanche: 5,
            viandeRouge:   3,
            poissonGras:   2,
            poissonBlanc:  2,
        },
        petitDejeuner: "continental",
    },
    logement: {
        type:          "appartement",
        surface:       65,
        nbHabitants:   2,
        ageLogement:   "recent",
        chauffage:     "gaz",
        consoElecKwh:  null,
        climatisation: false,
        nbClimatiseurs: 0,
        nuitesVacances: { hotel: 5 },
    },
};
