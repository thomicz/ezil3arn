"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";

// ---------------------------------------------------------------------------
// Typy odpovídají Prisma schématu:
//   Quiz  { id, title, notes, quizData (Json), createdAt, subjectId, subject?: Subject }
//   Subject { id, name, color }
// subject může chybět pokud API neincluduje relation — mapApiQuiz to ošetří
// ---------------------------------------------------------------------------
type ApiSubject = {
    id: number;
    name: string;
    color: string | null;
};

type ApiQuiz = {
    id: string;
    title: string;
    notes: string | null;
    quizData: unknown;
    createdAt: string;
    subjectId: number;
    subject?: ApiSubject | null;
};

type QuizMeta = {
    id: string;
    title: string;
    notes: string;
    subjectId: number;
    subjectName: string;
    subjectColor: string;
    questionCount: number;
    createdAt: string;
};

function subjectColors(hex: string): { bg: string; text: string } {
    return { bg: `${hex}28`, text: hex };
}

function mapApiQuiz(item: ApiQuiz): QuizMeta {
    const questionCount = Array.isArray(item.quizData) ? item.quizData.length : 0;
    // subject může být undefined když API neudělá include — fallback na subjectId
    const sub = item.subject ?? null;
    return {
        id: item.id,
        title: item.title,
        notes: item.notes ?? "",
        subjectId: sub?.id ?? item.subjectId,
        subjectName: sub?.name ?? `Předmět ${item.subjectId}`,
        subjectColor: sub?.color ?? "#737373",
        questionCount,
        createdAt: item.createdAt,
    };
}

// ---------------------------------------------------------------------------

export default function QuizzesListPage() {
    const [activeSubject, setActiveSubject] = useState<number | null>(null);
    const [quizzes, setQuizzes] = useState<QuizMeta[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        (async () => {
            try {
                setLoading(true);
                setError(null);

                const res = await fetch("../../api/quizzes", { cache: "no-store" });
                if (!res.ok) {
                    const errData = await res.json().catch(() => ({}));
                    throw new Error((errData as { error?: string }).error ?? `Server vrátil ${res.status}`);
                }

                const json: unknown = await res.json();

                if (!cancelled) {
                    const raw: ApiQuiz[] = Array.isArray(json)
                        ? (json as ApiQuiz[])
                        : Array.isArray((json as { quizzes?: ApiQuiz[] }).quizzes)
                            ? (json as { quizzes: ApiQuiz[] }).quizzes
                            : [];

                    setQuizzes(raw.map(mapApiQuiz));
                }
            } catch (e: unknown) {
                if (!cancelled) setError(e instanceof Error ? e.message : "Nepodařilo se načíst kvízy.");
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();

        return () => { cancelled = true; };
    }, []);

    const subjects = useMemo(() => {
        const seen = new Map<number, { id: number; name: string; color: string }>();
        for (const q of quizzes) {
            if (!seen.has(q.subjectId)) {
                seen.set(q.subjectId, { id: q.subjectId, name: q.subjectName, color: q.subjectColor });
            }
        }
        return Array.from(seen.values());
    }, [quizzes]);

    const filtered = useMemo(
        () =>
            activeSubject === null
                ? quizzes
                : quizzes.filter((q) => q.subjectId === activeSubject),
        [quizzes, activeSubject]
    );

    return (
        <main className="relative min-h-screen overflow-hidden bg-white text-neutral-900">
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-gradient-to-b from-violet-200/60 to-transparent blur-2xl" />
                <div className="absolute inset-0 opacity-[0.08]" style={gridBgStyle} />
            </div>

            <div className="relative mx-auto max-w-5xl px-4 py-12">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-xs shadow-sm backdrop-blur">
                    <span className="inline-flex h-6 items-center rounded-full bg-neutral-900 px-2 text-[11px] font-semibold text-white">
                        KVÍZY
                    </span>
                    <span className="text-neutral-700">Procvič si znalosti, sleduj postup</span>
                </div>

                <div className="flex flex-wrap items-end justify-between gap-3">
                    <div>
                        <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">
                            Všechny kvízy <span className="text-neutral-400">mode</span>
                        </h1>
                        <p className="mt-2 text-sm text-neutral-600">
                            Tip: začni tím, co jsi se právě naučil — opakování funguje nejlépe hned po učení.
                        </p>
                    </div>

                    <div className="rounded-full border border-black/10 bg-white/70 px-4 py-2 text-xs text-neutral-700 shadow-sm backdrop-blur">
                        {loading ? "Načítám…" : `${quizzes.length} kvízů · ${subjects.length} předmětů`}
                    </div>
                </div>

                {!loading && !error && subjects.length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-2">
                        <button
                            type="button"
                            onClick={() => setActiveSubject(null)}
                            className={[
                                "rounded-full border px-4 py-1.5 text-xs font-medium transition",
                                activeSubject === null
                                    ? "border-neutral-900 bg-neutral-900 text-white"
                                    : "border-black/10 bg-white text-neutral-600 hover:bg-neutral-50",
                            ].join(" ")}
                        >
                            Vše
                        </button>
                        {subjects.map((s) => (
                            <button
                                key={s.id}
                                type="button"
                                onClick={() => setActiveSubject(activeSubject === s.id ? null : s.id)}
                                className={[
                                    "rounded-full border px-4 py-1.5 text-xs font-medium transition",
                                    activeSubject === s.id
                                        ? "border-neutral-900 bg-neutral-900 text-white"
                                        : "border-black/10 bg-white text-neutral-600 hover:bg-neutral-50",
                                ].join(" ")}
                            >
                                {s.name}
                            </button>
                        ))}
                    </div>
                )}

                <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {loading ? (
                        <p className="col-span-full py-16 text-center text-sm text-neutral-500">
                            Načítám kvízy ze serveru…
                        </p>
                    ) : error ? (
                        <div className="col-span-full rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
                            {error}
                        </div>
                    ) : filtered.length === 0 ? (
                        <p className="col-span-full py-16 text-center text-sm text-neutral-500">
                            Žádné kvízy v tomto předmětu.
                        </p>
                    ) : (
                        filtered.map((quiz) => <QuizCard key={quiz.id} quiz={quiz} />)
                    )}
                </div>
            </div>
        </main>
    );
}

// ---------------------------------------------------------------------------

function QuizCard({ quiz }: { quiz: QuizMeta }) {
    const { bg, text } = subjectColors(quiz.subjectColor);
    const durationMin = Math.max(1, Math.round(quiz.questionCount * 0.7));
    const formattedDate = new Date(quiz.createdAt).toLocaleDateString("cs-CZ", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });

    return (
        <Link
            href={`quiz/${quiz.id}`}
            className="group flex flex-col gap-3 rounded-2xl border border-black/10 bg-white/70 p-5 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:bg-white hover:shadow-md"
        >
            <div className="flex items-start justify-between gap-2">
                <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg"
                    style={{ background: bg }}
                >
                    📝
                </div>
                <span
                    className="mt-0.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold"
                    style={{ background: bg, color: text }}
                >
                    {quiz.subjectName}
                </span>
            </div>

            <div>
                <div className="text-base font-semibold leading-tight tracking-tight">
                    {quiz.title}
                </div>
                {quiz.notes ? (
                    <div className="mt-1 line-clamp-2 text-xs text-neutral-500 leading-relaxed">
                        {quiz.notes}
                    </div>
                ) : null}
            </div>

            <div className="mt-auto flex items-center justify-between pt-1">
                <div className="flex items-center gap-3 text-[11px] text-neutral-400">
                    <span>📝 {quiz.questionCount} otázek</span>
                    <span>⏱ {durationMin} min</span>
                    <span>{formattedDate}</span>
                </div>
                <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-black/10 bg-white text-xs text-neutral-500 transition group-hover:border-neutral-900 group-hover:bg-neutral-900 group-hover:text-white">
                    →
                </div>
            </div>
        </Link>
    );
}

// ---------------------------------------------------------------------------

const gridBgStyle: React.CSSProperties = {
    backgroundImage:
        "linear-gradient(to right, rgba(0,0,0,0.25) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.25) 1px, transparent 1px)",
    backgroundSize: "48px 48px",
};