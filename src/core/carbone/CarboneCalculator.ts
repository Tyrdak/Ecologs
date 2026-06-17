import {
    VOITURE_FACTEURS,
    AVION_FACTEURS,
    TRAIN_FACTEURS,
    TRANSPORTS_FACTEURS,
    REPAS_FACTEURS,
    PETIT_DEJ_FACTEURS,
    ELECTRICITE_FRANCE,
    CHAUFFAGE_FACTEURS,
    CONSO_CHAUFFAGE_PAR_M2,
    CONSTRUCTION_FACTEURS,
    CLIMATISATION_PAR_UNITE,
    VACANCES_FACTEURS,
    CONSO_ELEC_BASE,
} from "@/src/data/carbone/emissionFactors";
import type { CarboneInputs, CarboneResult, CategoryResult } from "./types";

// Moyenne française 2023 et objectif Accord de Paris
const MOYENNE_FRANCE_KG = 9900;
const OBJECTIF_2_DEGRES_KG = 2000;

function calcTransport(t: CarboneInputs["transport"]): CategoryResult {
    const details: Record<string, number> = {};

    if (t.voiture.utilise && t.voiture.kmAnnuels > 0) {
        const facteur = VOITURE_FACTEURS[t.voiture.typeCarburant].value;
        details.voiture = (t.voiture.kmAnnuels * facteur) / Math.max(1, t.voiture.nbOccupants);
    }

    const kmCourtCourrier = t.avion.heuresCourtCourrier * AVION_FACTEURS.vitesseMoyenne;
    const kmLongCourrier  = t.avion.heuresLongCourrier  * AVION_FACTEURS.vitesseMoyenne;
    const avion = kmCourtCourrier * AVION_FACTEURS.court + kmLongCourrier * AVION_FACTEURS.long;
    if (avion > 0) details.avion = avion;

    if (t.train.kmAnnuels > 0) details.train = t.train.kmAnnuels * TRAIN_FACTEURS.mix;
    if (t.bus.kmAnnuels > 0)   details.bus   = t.bus.kmAnnuels   * TRANSPORTS_FACTEURS.bus;
    if (t.metro.kmAnnuels > 0) details.metro = t.metro.kmAnnuels * TRANSPORTS_FACTEURS.metro;

    if (t.moto.utilise && t.moto.kmAnnuels > 0) {
        details.moto = t.moto.kmAnnuels * TRANSPORTS_FACTEURS.moto;
    }

    const kgCo2e = Object.values(details).reduce((s, v) => s + v, 0);
    return { label: "Transport", kgCo2e, details };
}

function calcAlimentation(a: CarboneInputs["alimentation"]): CategoryResult {
    const details: Record<string, number> = {};

    for (const [type, nbParSemaine] of Object.entries(a.repasParSemaine)) {
        if (nbParSemaine > 0) {
            details[type] = nbParSemaine * 52 * REPAS_FACTEURS[type as keyof typeof REPAS_FACTEURS].value;
        }
    }

    details.petitDejeuner = 365 * PETIT_DEJ_FACTEURS[a.petitDejeuner].value;

    const kgCo2e = Object.values(details).reduce((s, v) => s + v, 0);
    return { label: "Alimentation", kgCo2e, details };
}

function calcLogement(l: CarboneInputs["logement"]): CategoryResult {
    const details: Record<string, number> = {};
    const habitants = Math.max(1, l.nbHabitants);

    // Électricité courante (hors chauffage)
    const consoElec = l.consoElecKwh ?? CONSO_ELEC_BASE;
    details.electricite = (consoElec * ELECTRICITE_FRANCE) / habitants;

    // Chauffage
    const consoRef = CONSO_CHAUFFAGE_PAR_M2[l.chauffage][l.ageLogement];
    const consoChauf = l.surface * consoRef;
    details.chauffage = (consoChauf * CHAUFFAGE_FACTEURS[l.chauffage].value) / habitants;

    // Construction amortie
    const { total, dureeVie } = CONSTRUCTION_FACTEURS[l.type];
    details.construction = (l.surface * total) / dureeVie / habitants;

    // Climatisation
    if (l.climatisation && l.nbClimatiseurs > 0) {
        details.climatisation = (l.nbClimatiseurs * CLIMATISATION_PAR_UNITE) / habitants;
    }

    // Vacances
    let vacances = 0;
    for (const [type, nuits] of Object.entries(l.nuitesVacances)) {
        if (nuits && nuits > 0) {
            vacances += nuits * VACANCES_FACTEURS[type as keyof typeof VACANCES_FACTEURS].value;
        }
    }
    if (vacances > 0) details.vacances = vacances;

    const kgCo2e = Object.values(details).reduce((s, v) => s + v, 0);
    return { label: "Logement", kgCo2e, details };
}

export function calculerEmpreinte(inputs: CarboneInputs): CarboneResult {
    const transport    = calcTransport(inputs.transport);
    const alimentation = calcAlimentation(inputs.alimentation);
    const logement     = calcLogement(inputs.logement);

    const totalKgCo2e = transport.kgCo2e + alimentation.kgCo2e + logement.kgCo2e;

    return {
        totalKgCo2e,
        transport,
        alimentation,
        logement,
        moyenneFrance:    MOYENNE_FRANCE_KG,
        objectif2Degres:  OBJECTIF_2_DEGRES_KG,
    };
}
