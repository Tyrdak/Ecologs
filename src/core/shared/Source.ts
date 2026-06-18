// Référence bibliographique d'un facteur d'émission

export interface Source {
    readonly label: string;
    readonly organisation: string;
    readonly database?: string;
    readonly year: number;
    readonly url?: string;
    readonly note?: string;
}