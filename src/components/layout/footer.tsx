import Logo from "@/src/components/ui/Logo";

export default function Footer() {
    return (
        <footer
            className="mt-24 border-t px-6 py-12 md:px-12"
            style={{ borderColor: "var(--border)", background: "var(--bg-alt)" }}
        >
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start justify-between gap-8">
                <div>
                    <Logo size="sm" />
                    <p className="mt-3 text-sm max-w-xs" style={{ color: "var(--text-muted)" }}>
                        Estimez votre empreinte carbone et découvrez comment la réduire.
                    </p>
                </div>
                <div className="text-sm" style={{ color: "var(--text-muted)" }}>
                    <p>Facteurs d&apos;émission : Base Empreinte® ADEME 2024</p>
                    <p className="mt-1">Projet transversal EPSI — 2025–2026</p>
                </div>
            </div>
        </footer>
    );
}
