import { User } from "lucide-react";

interface Props {
    name: string;
    role: string;
    publishedAt: string;
    minutesRead: number;
}

export default function AuthorCard({ name, role, publishedAt, minutesRead }: Props) {
    return (
        <div className="flex items-center gap-4 py-5 my-6" style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
            <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: "var(--green-deep)", color: "white" }}>
                <User size={18} aria-hidden="true" />
            </div>
            <div>
                <p className="font-medium text-sm" style={{ color: "var(--text)" }}>{name}</p>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>{role}</p>
            </div>
            <div className="ml-auto text-right text-xs" style={{ color: "var(--text-muted)" }}>
                <p>{publishedAt}</p>
                <p>{minutesRead} min de lecture</p>
            </div>
        </div>
    );
}
