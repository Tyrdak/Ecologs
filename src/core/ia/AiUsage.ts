// Type d'usage IA, classé par intensité énergétique croissante

export enum AiUsage {
    TexteSimple = "texte_simple",
    TexteAvance = "texte_avance",
    Image = "image",
    Agent = "agent",
    Video = "video",
}

export const AI_USAGE_LABELS: Record<AiUsage, string> = {
    [AiUsage.TexteSimple]: "Requête texte (modèle léger)",
    [AiUsage.TexteAvance]: "Requête texte (modèle avancé)",
    [AiUsage.Image]: "Génération d'image",
    [AiUsage.Agent]: "Agent conversationnel",
    [AiUsage.Video]: "Génération de vidéo",
}
