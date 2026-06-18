export interface Section {
    id: string;
    title: string;
    content: string;
    table?: { headers: string[]; rows: string[][] };
}

export interface Article {
    slug: string;
    title: string;
    description: string;
    keywords: string[];
    author: { name: string; role: string };
    publishedAt: string;
    minutesRead: number;
    sections: Section[];
}

export const articleImpactIa: Article = {
    slug: "impact-carbone-ia",
    title: "L'impact carbone de l'IA : ce que vos requêtes coûtent vraiment",
    description: "Chaque requête à ChatGPT, Claude ou Gemini consomme de l'énergie. Découvrez comment se calcule l'empreinte carbone de l'IA et comment la réduire.",
    keywords: ["empreinte carbone IA", "impact environnemental ChatGPT", "CO2 intelligence artificielle", "GPU énergie", "LLM énergie", "green AI"],
    author: { name: "Équipe EcoLogs", role: "Recherche & Développement" },
    publishedAt: "2025-06-17",
    minutesRead: 8,
    sections: [
        {
            id: "pourquoi-ca-compte",
            title: "Pourquoi l'IA a-t-elle un impact carbone ?",
            content: "Chaque message envoyé à un modèle de langage déclenche une inférence sur un serveur GPU. Ces calculs consomment de l'électricité — et selon le mix énergétique du datacenter, cela produit plus ou moins de CO₂. S'y ajoute l'impact de la fabrication des serveurs, amortie sur leur durée de vie.",
        },
        {
            id: "fabrication-vs-usage",
            title: "Fabrication vs usage : deux postes distincts",
            content: "L'empreinte d'une requête IA se décompose en deux parties : l'impact de fabrication du serveur (GPU, CPU, RAM) amorti par requête, et l'impact d'usage lié à la consommation électrique pendant l'inférence. Pour une requête courte, l'usage domine. Pour un modèle très lourd, la fabrication peut représenter jusqu'à 30 % du total.",
            table: {
                headers: ["Composant", "Impact fabrication (kg CO₂e)", "Durée de vie"],
                rows: [
                    ["NVIDIA H100 (80 Go)", "~150 kg", "5 ans"],
                    ["NVIDIA A100 (40 Go)", "~100 kg", "5 ans"],
                    ["NVIDIA L4 (24 Go)", "~40 kg", "5 ans"],
                    ["Serveur complet (8x H100)", "~1 400 kg", "5 ans"],
                ],
            },
        },
        {
            id: "mix-energetique",
            title: "Le mix énergétique : le facteur clé",
            content: "La même requête envoyée à un serveur en Suède (13 gCO₂/kWh, quasi 100 % renouvelable) ou aux États-Unis (380 gCO₂/kWh, mix fossile) n'a pas le même bilan. Le choix du provider et de la localisation du datacenter est déterminant.",
            table: {
                headers: ["Pays", "Intensité carbone", "Principale source"],
                rows: [
                    ["France", "60 gCO₂/kWh", "Nucléaire"],
                    ["Suède", "13 gCO₂/kWh", "Hydraulique + nucléaire"],
                    ["États-Unis", "380 gCO₂/kWh", "Gaz + charbon"],
                    ["Allemagne", "350 gCO₂/kWh", "Gaz + charbon + renouvelable"],
                ],
            },
        },
        {
            id: "ordres-de-grandeur",
            title: "Ordres de grandeur concrets",
            content: "Pour 5 requêtes par jour à Claude Sonnet (Anthropic, US) avec 2 000 tokens, l'empreinte annuelle est d'environ 8–15 kg CO₂e. C'est comparable à 40–70 km en voiture, ou à charger un smartphone 800 fois. Pas énorme — mais multiplié par des milliards d'utilisateurs, cela représente plusieurs Mt CO₂e/an à l'échelle mondiale.",
        },
        {
            id: "comment-reduire",
            title: "Comment réduire son impact IA ?",
            content: "Quelques leviers concrets : (1) Préférer des providers avec datacenters en Europe (France, Suède) plutôt qu'aux US. (2) Utiliser des modèles plus petits pour les tâches simples (Haiku plutôt qu'Opus). (3) Réduire la longueur des contextes inutilement longs. (4) Regrouper ses questions plutôt que de faire des aller-retours courts. (5) Éviter de régénérer une réponse si la première était satisfaisante.",
        },
    ],
};
