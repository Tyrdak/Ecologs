import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { articleImpactIa } from "@/src/content/articles/impact-ia";
import Navbar from "@/src/components/layout/navbar";
import Footer from "@/src/components/layout/footer";

export const metadata: Metadata = {
    title: "Blog EcoLogs — Impact carbone & Intelligence Artificielle",
    description: "Articles sur l'empreinte carbone du numérique, l'impact environnemental de l'IA et les bonnes pratiques pour réduire son impact.",
    keywords: ["blog empreinte carbone", "impact IA environnement", "numérique responsable", "green IT"],
};

const ARTICLES = [articleImpactIa];

export default function BlogPage() {
    return (
        <>
            <Navbar />
            <main id="main-content" className="pt-16 min-h-screen" style={{ background: "var(--bg)" }}>
                <header className="py-20 px-6 text-center" style={{ background: "var(--green-deep)", color: "white" }}>
                    <p className="text-xs font-semibold uppercase tracking-widest mb-3 opacity-70">Ressources</p>
                    <h1 style={{ fontFamily: "Fraunces, serif", fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 700 }}>
                        Blog EcoLogs
                    </h1>
                </header>
                <section className="max-w-3xl mx-auto px-6 py-16" aria-label="Liste des articles">
                    {ARTICLES.map(a => (
                        <article key={a.slug} className="rounded-2xl p-7 mb-6" style={{ background: "var(--bg-card)", border: "1.5px solid var(--border)" }}>
                            <div className="flex items-center gap-4 text-xs mb-3" style={{ color: "var(--text-muted)" }}>
                                <span className="flex items-center gap-1"><Calendar size={12} aria-hidden="true" />{a.publishedAt}</span>
                                <span className="flex items-center gap-1"><Clock size={12} aria-hidden="true" />{a.minutesRead} min de lecture</span>
                            </div>
                            <h2 style={{ fontFamily: "Fraunces, serif", fontSize: "1.5rem", fontWeight: 700, color: "var(--green-deep)", marginBottom: "0.75rem" }}>
                                {a.title}
                            </h2>
                            <p className="text-sm mb-5" style={{ color: "var(--text-muted)", lineHeight: 1.7 }}>{a.description}</p>
                            <div className="flex flex-wrap gap-2 mb-5">
                                {a.keywords.slice(0, 3).map(k => (
                                    <span key={k} className="text-xs px-2.5 py-1 rounded-full" style={{ background: "var(--bg-alt)", color: "var(--green-mid)", border: "1px solid var(--border)" }}>
                                        {k}
                                    </span>
                                ))}
                            </div>
                            <Link
                                href={`/blog/${a.slug}`}
                                className="inline-flex items-center gap-1.5 text-sm font-semibold"
                                style={{ color: "var(--green-deep)" }}
                                aria-label={`Lire l'article : ${a.title}`}
                            >
                                Lire l'article <ArrowRight size={14} aria-hidden="true" />
                            </Link>
                        </article>
                    ))}
                </section>
            </main>
            <Footer />
        </>
    );
}
