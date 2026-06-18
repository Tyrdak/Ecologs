import { Source } from "@/src/core/shared/Source";

const ademe2024: Source = {
    label: "Base Empreinte® ADEME — Nos Gestes Climat",
    organisation: "ADEME",
    database: "Base Empreinte®",
    year: 2024,
    url: "https://nosgestesclimat.fr",
};

export const SOURCES = { ademe2024 } as const;

// kgCO2e/km par type de carburant (usage + construction amortie)
export const VOITURE_FACTEURS = {
    essence:    { value: 0.22,  label: "Essence / GPL" },
    diesel:     { value: 0.20,  label: "Diesel" },
    hybride:    { value: 0.14,  label: "Hybride" },
    electrique: { value: 0.085, label: "Électrique" },
} as const;

// kgCO2e/km passager (incluant traînées de condensation)
export const AVION_FACTEURS = {
    court: 0.22,  // < ~3 h (< ~2000 km)
    long:  0.17,  // > ~3 h (> ~2000 km)
    vitesseMoyenne: 800, // km/h pour conversion heures → km
} as const;

// kgCO2e/km
export const TRAIN_FACTEURS = {
    tgv:    0.00293,
    ter:    0.0277,
    mix:    0.011, // moyenne nationale
} as const;

// kgCO2e/km
export const TRANSPORTS_FACTEURS = {
    bus:   0.12,
    metro: 0.005,
    car:   0.0375,
    moto:  0.168,
} as const;

// kgCO2e/repas (déjeuner / dîner)
export const REPAS_FACTEURS = {
    vegalien:      { value: 0.54,  label: "Végétalien" },
    vegetarien:    { value: 0.85,  label: "Végétarien" },
    viandeBlanche: { value: 1.65,  label: "Viande blanche" },
    viandeRouge:   { value: 5.01,  label: "Viande rouge" },
    poissonGras:   { value: 1.45,  label: "Poisson gras" },
    poissonBlanc:  { value: 2.22,  label: "Poisson blanc" },
} as const;

// kgCO2e/repas (petit déjeuner)
export const PETIT_DEJ_FACTEURS = {
    continental:  { value: 0.32, label: "Continental (pain, beurre, confiture)" },
    laitCereales: { value: 0.45, label: "Lait & céréales" },
    britannique:  { value: 1.08, label: "Britannique (œufs, bacon)" },
    vegalien:     { value: 0.38, label: "Végétalien" },
} as const;

// kgCO2e/kWh
export const ELECTRICITE_FRANCE = 0.0561;

// kgCO2e/kWh (énergie finale)
export const CHAUFFAGE_FACTEURS = {
    gaz:          { value: 0.215,  label: "Gaz naturel" },
    fioul:        { value: 0.324,  label: "Fioul" },
    boisBuches:   { value: 0.046,  label: "Bois — bûches" },
    boisGranules: { value: 0.032,  label: "Bois — granulés" },
    electrique:   { value: 0.0561, label: "Électricité directe" },
    pompeChaleur: { value: 0.0187, label: "Pompe à chaleur" },
    reseauChaleur:{ value: 0.113,  label: "Réseau de chaleur urbain" },
} as const;

// Consommation de chauffage estimée (kWh/m²/an) selon énergie × ancienneté
export const CONSO_CHAUFFAGE_PAR_M2: Record<keyof typeof CHAUFFAGE_FACTEURS, { recent: number; ancien: number }> = {
    gaz:           { recent: 85,  ancien: 130 },
    fioul:         { recent: 90,  ancien: 140 },
    electrique:    { recent: 100, ancien: 155 },
    pompeChaleur:  { recent: 35,  ancien: 50  },
    boisBuches:    { recent: 110, ancien: 165 },
    boisGranules:  { recent: 100, ancien: 150 },
    reseauChaleur: { recent: 80,  ancien: 110 },
};

// kgCO2e/m² total construction, amorti sur durée de vie
export const CONSTRUCTION_FACTEURS = {
    appartement: { total: 740, dureeVie: 50 }, // → 14.8 kgCO2e/m²/an
    maison:      { total: 640, dureeVie: 50 }, // → 12.8 kgCO2e/m²/an
} as const;

// kgCO2e/an/climatiseur (construction amorti + fuites réfrigérant)
export const CLIMATISATION_PAR_UNITE = 300;

// kgCO2e/nuit (logement vacances)
export const VACANCES_FACTEURS = {
    hotel:    { value: 6.93,  label: "Hôtel / chambre d'hôtes" },
    camping:  { value: 1.4,   label: "Camping" },
    location: { value: 5.30,  label: "Location meublée (Airbnb…)" },
    echange:  { value: 3.52,  label: "Échange de maison" },
} as const;

// Consommation électrique hors chauffage par défaut (kWh/an/foyer)
export const CONSO_ELEC_BASE = 2800;
