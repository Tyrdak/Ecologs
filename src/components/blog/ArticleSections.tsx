import type { Section } from "@/src/content/articles/impact-ia";

interface Props { sections: Section[] }

export default function ArticleSections({ sections }: Props) {
    return (
        <article className="prose-custom">
            {sections.map(s => (
                <section key={s.id} id={s.id} className="mb-12" aria-labelledby={`heading-${s.id}`}>
                    <h2
                        id={`heading-${s.id}`}
                        style={{ fontFamily: "Fraunces, serif", fontSize: "1.5rem", fontWeight: 700, color: "var(--green-deep)", marginBottom: "1rem" }}
                    >
                        {s.title}
                    </h2>
                    <p style={{ color: "var(--text)", lineHeight: 1.8, marginBottom: s.table ? "1.25rem" : 0 }}>
                        {s.content}
                    </p>
                    {s.table && (
                        <div className="overflow-x-auto mt-4" role="region" aria-label={`Tableau : ${s.title}`}>
                            <table className="w-full text-sm border-collapse">
                                <thead>
                                    <tr style={{ background: "var(--green-deep)", color: "white" }}>
                                        {s.table.headers.map(h => (
                                            <th key={h} className="text-left px-4 py-2.5 font-medium" scope="col">{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {s.table.rows.map((row, i) => (
                                        <tr key={i} style={{ background: i % 2 === 0 ? "var(--bg-card)" : "var(--bg-alt)", borderBottom: "1px solid var(--border)" }}>
                                            {row.map((cell, j) => (
                                                <td key={j} className="px-4 py-2.5" style={{ color: "var(--text)" }}>{cell}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </section>
            ))}
        </article>
    );
}
