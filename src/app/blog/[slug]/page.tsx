import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { articleImpactIa } from "@/src/content/articles/impact-ia";
import Navbar from "@/src/components/layout/navbar";
import Footer from "@/src/components/layout/footer";
import TableOfContents from "@/src/components/blog/TableOfContents";
import AuthorCard from "@/src/components/blog/AuthorCard";
import ArticleSections from "@/src/components/blog/ArticleSections";

const ARTICLES = [articleImpactIa];

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const article = ARTICLES.find(a => a.slug === slug);
    if (!article) return {};
    return {
        title: `${article.title} | Blog EcoLogs`,
        description: article.description,
        keywords: article.keywords,
        authors: [{ name: article.author.name }],
        openGraph: {
            title: article.title,
            description: article.description,
            type: "article",
            publishedTime: article.publishedAt,
        },
    };
}

export function generateStaticParams() {
    return ARTICLES.map(a => ({ slug: a.slug }));
}

export default async function ArticlePage({ params }: Props) {
    const { slug } = await params;
    const article = ARTICLES.find(a => a.slug === slug);
    if (!article) notFound();

    return (
        <>
            <Navbar />
            <main id="main-content" className="pt-16" style={{ background: "var(--bg)" }}>
                <header className="py-16 px-6 text-center max-w-3xl mx-auto">
                    <div className="flex justify-center gap-2 flex-wrap mb-4">
                        {article.keywords.slice(0, 3).map(k => (
                            <span key={k} className="text-xs px-2.5 py-1 rounded-full" style={{ background: "var(--bg-alt)", color: "var(--green-mid)", border: "1px solid var(--border)" }}>
                                {k}
                            </span>
                        ))}
                    </div>
                    <h1 style={{ fontFamily: "Fraunces, serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 700, color: "var(--green-deep)", lineHeight: 1.2 }}>
                        {article.title}
                    </h1>
                    <AuthorCard {...article.author} publishedAt={article.publishedAt} minutesRead={article.minutesRead} />
                </header>

                <div className="max-w-6xl mx-auto px-6 pb-20 lg:grid lg:grid-cols-[1fr_260px] lg:gap-16">
                    <ArticleSections sections={article.sections} />
                    <aside aria-label="Navigation dans l'article">
                        <TableOfContents sections={article.sections} />
                    </aside>
                </div>
            </main>
            <Footer />
        </>
    );
}
