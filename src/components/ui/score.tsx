"use client";

interface ScoreGaugeProps {
    value: number;       // kgCO2e/an
    moyenne: number;     // 9900
    objectif: number;    // 2000
}

function scoreColor(kg: number): string {
    if (kg <= 2000)  return "#74B49B";
    if (kg <= 5000)  return "#C5975A";
    if (kg <= 9900)  return "#D97706";
    return "#DC2626";
}

function scoreLabel(kg: number): string {
    if (kg <= 2000)  return "Compatible 2°C";
    if (kg <= 5000)  return "Sous la moyenne";
    if (kg <= 9900)  return "Dans la moyenne";
    return "Au-dessus de la moyenne";
}

export default function ScoreGauge({ value, moyenne, objectif }: ScoreGaugeProps) {
    const max = Math.max(value * 1.2, moyenne * 1.1, 12000);
    const pctValue   = Math.min(100, (value   / max) * 100);
    const pctObjectif = (objectif / max) * 100;
    const pctMoyenne  = (moyenne  / max) * 100;
    const color = scoreColor(value);

    return (
        <div
            className="rounded-2xl p-8"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
        >
            {/* Big number */}
            <div className="text-center mb-8">
                <div
                    style={{
                        fontFamily: "Fraunces, Georgia, serif",
                        fontSize: "clamp(3rem, 8vw, 5rem)",
                        fontWeight: 700,
                        color,
                        lineHeight: 1,
                    }}
                >
                    {(value / 1000).toFixed(1)}
                </div>
                <div className="mt-1 text-sm font-medium" style={{ color: "var(--text-muted)" }}>
                    tCO₂e / an
                </div>
                <div
                    className="mt-2 inline-block px-3 py-1 rounded-full text-xs font-semibold"
                    style={{ background: `${color}20`, color }}
                >
                    {scoreLabel(value)}
                </div>
            </div>

            {/* Bar chart */}
            <div className="space-y-4">
                {/* User */}
                <div>
                    <div className="flex justify-between text-xs mb-1" style={{ color: "var(--text-muted)" }}>
                        <span className="font-medium" style={{ color: "var(--text)" }}>Votre empreinte</span>
                        <span>{(value / 1000).toFixed(1)} t</span>
                    </div>
                    <div className="h-3 rounded-full overflow-hidden" style={{ background: "var(--bg-alt)" }}>
                        <div
                            className="h-full rounded-full anim-bar"
                            style={{ width: `${pctValue}%`, background: color }}
                        />
                    </div>
                </div>

                {/* Moyenne */}
                <div>
                    <div className="flex justify-between text-xs mb-1" style={{ color: "var(--text-muted)" }}>
                        <span>Moyenne française</span>
                        <span>{(moyenne / 1000).toFixed(1)} t</span>
                    </div>
                    <div className="h-3 rounded-full overflow-hidden" style={{ background: "var(--bg-alt)" }}>
                        <div
                            className="h-full rounded-full anim-bar d2"
                            style={{ width: `${pctMoyenne}%`, background: "var(--text-muted)" }}
                        />
                    </div>
                </div>

                {/* Objectif */}
                <div>
                    <div className="flex justify-between text-xs mb-1" style={{ color: "var(--text-muted)" }}>
                        <span>Objectif 2°C (Accord de Paris)</span>
                        <span>{(objectif / 1000).toFixed(1)} t</span>
                    </div>
                    <div className="h-3 rounded-full overflow-hidden" style={{ background: "var(--bg-alt)" }}>
                        <div
                            className="h-full rounded-full anim-bar d3"
                            style={{ width: `${pctObjectif}%`, background: "var(--green-light)" }}
                        />
                    </div>
                </div>
            </div>

            {/* Delta */}
            {value > objectif && (
                <p
                    className="mt-6 text-sm text-center"
                    style={{ color: "var(--text-muted)" }}
                >
                    À réduire de{" "}
                    <span className="font-semibold" style={{ color: "var(--text)" }}>
                        {((value - objectif) / 1000).toFixed(1)} t
                    </span>{" "}
                    pour atteindre l&apos;objectif 2°C.
                </p>
            )}
        </div>
    );
}
