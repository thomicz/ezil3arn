"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type ApiSubject = {
    id: number;
    name: string;
    color: string | null;
};

type ApiFlashcardItem = {
    question: string;
    answer: string;       // správná odpověď / přední/zadní strana
    options?: string[];   // ignorujeme — flashcards nepotřebují možnosti
    explanation?: string;
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

type FlashcardSetMeta = {
    id: string;
    title: string;
    notes: string;
    subjectId: number;
    subjectName: string;
    subjectColor: string;
    cardCount: number;
    createdAt: string;
};

function subjectColors(hex: string): { bg: string; text: string } {
    return { bg: `${hex}28`, text: hex };
}

function mapApiQuizToFlashcardSet(item: ApiQuiz): FlashcardSetMeta {
    const cardCount = Array.isArray(item.quizData) ? (item.quizData as ApiFlashcardItem[]).length : 0;
    const sub = item.subject ?? null;
    return {
        id: item.id,
        title: item.title,
        notes: item.notes ?? "",
        subjectId: sub?.id ?? item.subjectId,
        subjectName: sub?.name ?? `Předmět ${item.subjectId}`,
        subjectColor: sub?.color ?? "#737373",
        cardCount,
        createdAt: item.createdAt,
    };
}

// ---------------------------------------------------------------------------

export default function FlashcardsListPage() {
    const [activeSubject, setActiveSubject] = useState<number | null>(null);
    const [sets, setSets] = useState<FlashcardSetMeta[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        (async () => {
            try {
                setLoading(true);
                setError(null);

                // Flashcards jsou uloženy jako kvízy — stejný endpoint
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

                    setSets(raw.map(mapApiQuizToFlashcardSet));
                }
            } catch (e: unknown) {
                if (!cancelled) setError(e instanceof Error ? e.message : "Nepodařilo se načíst sety.");
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();

        return () => { cancelled = true; };
    }, []);

    const subjects = useMemo(() => {
        const seen = new Map<number, { id: number; name: string; color: string }>();
        for (const s of sets) {
            if (!seen.has(s.subjectId)) {
                seen.set(s.subjectId, { id: s.subjectId, name: s.subjectName, color: s.subjectColor });
            }
        }
        return Array.from(seen.values());
    }, [sets]);

    const filtered = useMemo(
        () =>
            activeSubject === null
                ? sets
                : sets.filter((s) => s.subjectId === activeSubject),
        [sets, activeSubject]
    );

    return (
        <main className="relative min-h-screen overflow-hidden bg-white text-neutral-900">
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-gradient-to-b from-sky-200/60 to-transparent blur-2xl" />
                <div className="absolute inset-0 opacity-[0.08]" style={gridBgStyle} />
            </div>

            <div className="relative mx-auto max-w-5xl px-4 py-12">
                {/* Badge */}
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-xs shadow-sm backdrop-blur">
                    <span className="inline-flex h-6 items-center rounded-full bg-neutral-900 px-2 text-[11px] font-semibold text-white">
                        FLASHCARDS
                    </span>
                    <span className="text-neutral-700">Procvič si pojmy — otočit a zkontrolovat</span>
                </div>

                {/* Header */}
                <div className="flex flex-wrap items-end justify-between gap-3">
                    <div>
                        <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">
                            Všechny sety <span className="text-neutral-400">mode</span>
                        </h1>
                        <p className="mt-2 text-sm text-neutral-600">
                            Tip: projdi každou kartu, než ji označíš jako naučenou — mozek potřebuje vybavování, ne jen čtení.
                        </p>
                    </div>

                    <div className="rounded-full border border-black/10 bg-white/70 px-4 py-2 text-xs text-neutral-700 shadow-sm backdrop-blur">
                        {loading ? "Načítám…" : `${sets.length} setů · ${subjects.length} předmětů`}
                    </div>
                </div>

                {/* Subject filters */}
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

                {/* Grid */}
                <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {loading ? (
                        <p className="col-span-full py-16 text-center text-sm text-neutral-500">
                            Načítám sety ze serveru…
                        </p>
                    ) : error ? (
                        <div className="col-span-full rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
                            {error}
                        </div>
                    ) : filtered.length === 0 ? (
                        <p className="col-span-full py-16 text-center text-sm text-neutral-500">
                            Žádné sety v tomto předmětu.
                        </p>
                    ) : (
                        filtered.map((set) => <FlashcardSetCard key={set.id} set={set} />)
                    )}
                </div>
            </div>
        </main>
    );
}

// ---------------------------------------------------------------------------

function FlashcardSetCard({ set }: { set: FlashcardSetMeta }) {
    const { bg, text } = subjectColors(set.subjectColor);
    const formattedDate = new Date(set.createdAt).toLocaleDateString("cs-CZ", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });

    // Odhadovaný čas: ~15 s na kartu
    const durationMin = Math.max(1, Math.round((set.cardCount * 15) / 60));

    return (
        <Link
            href={`flashcards/${set.id}`}
            className="group flex flex-col gap-3 rounded-2xl border border-black/10 bg-white/70 p-5 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:bg-white hover:shadow-md"
        >
            <div className="flex items-start justify-between gap-2">
                <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg"
                    style={{ background: bg }}
                >
                    🗂
                </div>
                <span
                    className="mt-0.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold"
                    style={{ background: bg, color: text }}
                >
                    {set.subjectName}
                </span>
            </div>

            <div>
                <div className="text-base font-semibold leading-tight tracking-tight">
                    {set.title}
                </div>
                {set.notes ? (
                    <div className="mt-1 line-clamp-2 text-xs text-neutral-500 leading-relaxed">
                        {set.notes}
                    </div>
                ) : null}
            </div>

            <div className="mt-auto flex items-center justify-between pt-1">
                <div className="flex items-center gap-3 text-[11px] text-neutral-400">
                    <span>🗂 {set.cardCount} karet</span>
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