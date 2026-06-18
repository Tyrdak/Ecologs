import { scoreColor } from "./scoreUtils";

interface Props {
    score: number;
    label: string;
    sublabel?: string;
    size?: "lg" | "sm";
}

export default function ScoreRing({ score, label, sublabel, size = "sm" }: Props) {
    const r = size === "lg" ? 52 : 34;
    const stroke = size === "lg" ? 7 : 5;
    const circ = 2 * Math.PI * r;
    const fill = circ * (score / 100);
    const dim = (r + stroke) * 2;
    const color = scoreColor(score);

    return (
        <div className="flex flex-col items-center gap-1">
            <div style={{ position: "relative", width: dim, height: dim }}>
                <svg width={dim} height={dim} style={{ transform: "rotate(-90deg)" }}>
                    <circle
                        cx={dim / 2} cy={dim / 2} r={r}
                        fill="none" stroke="var(--border)" strokeWidth={stroke}
                    />
                    <circle
                        cx={dim / 2} cy={dim / 2} r={r}
                        fill="none" stroke={color} strokeWidth={stroke}
                        strokeDasharray={`${fill} ${circ}`}
                        strokeLinecap="round"
                        style={{ transition: "stroke-dasharray 0.8s ease" }}
                    />
                </svg>
                <div
                    style={{
                        position: "absolute", inset: 0,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontFamily: "Fraunces, serif",
                        fontSize: size === "lg" ? "1.7rem" : "1.05rem",
                        fontWeight: 700,
                        color,
                    }}
                >
                    {score}
                </div>
            </div>
            <span className="text-xs font-medium text-center" style={{ color: "var(--text)" }}>{label}</span>
            {sublabel && <span className="text-xs" style={{ color: "var(--text-muted)" }}>{sublabel}</span>}
        </div>
    );
}
