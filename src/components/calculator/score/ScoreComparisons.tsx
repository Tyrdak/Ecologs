import { Car, Flame, Tv } from "lucide-react";

const KM_VOITURE = 0.218;
const STREAMING_H = 0.036;
const BOUGIE_H = 0.013;

interface Props {
    iaKg: number;
}

function fmt(n: number, unit: string) {
    if (n < 1) return `${(n * 1000).toFixed(0)} m${unit}`;
    return `${n.toFixed(1)} ${unit}`;
}

export default function ScoreComparisons({ iaKg }: Props) {
    const items = [
        {
            Icon: Car,
            label: "en voiture",
            value: fmt(iaKg / KM_VOITURE, "km"),
        },
        {
            Icon: Tv,
            label: "de streaming HD",
            value: fmt(iaKg / STREAMING_H, "h"),
        },
        {
            Icon: Flame,
            label: "de bougie allumée",
            value: fmt(iaKg / BOUGIE_H, "h"),
        },
    ];

    return (
        <div>
            <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "var(--text-muted)" }}>
                Votre requête IA équivaut à…
            </p>
            <div className="grid grid-cols-3 gap-3">
                {items.map(({ Icon, label, value }) => (
                    <div
                        key={label}
                        className="flex flex-col items-center gap-1.5 p-3 rounded-xl text-center"
                        style={{ background: "var(--bg-alt)", border: "1px solid var(--border)" }}
                    >
                        <Icon size={18} style={{ color: "var(--green-mid)" }} />
                        <span style={{ fontFamily: "Fraunces, serif", fontSize: "1rem", fontWeight: 700, color: "var(--text)" }}>
                            {value}
                        </span>
                        <span className="text-xs" style={{ color: "var(--text-muted)" }}>{label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
