"use client";

import React, { useEffect, useMemo, useState } from "react";

export type Flashcard = {
    id?: string | number;
    question: string;
    answer: string;
};

type Props = {
    /** endpoint, který vrací JSON: Flashcard[] */
    endpoint?: string;
    /** fallback data (když nechceš fetch) */
    initialCards?: Flashcard[];
    /** title nad deckem */
    title?: string;
};

export default function FlashcardDeck({
                                          endpoint = "/api/flashcards",
                                          initialCards,
                                          title = "Flashcards",
                                      }: Props) {
    const [cards, setCards] = useState<Flashcard[]>(initialCards ?? []);
    const [idx, setIdx] = useState(0);
    const [flipped, setFlipped] = useState(false);

    const [loading, setLoading] = useState(!initialCards);
    const [error, setError] = useState<string | null>(null);

    const total = cards.length;
    const current = cards[idx];

    // fetch from backend (pokud nejsou initialCards)
    useEffect(() => {
        if (initialCards) return;

        let cancelled = false;
        (async () => {
            try {
                setLoading(true);
                setError(null);

                const res = await fetch(endpoint, { cache: "no-store" });
                if (!res.ok) throw new Error(`Server vrátil ${res.status}`);

                const data = (await res.json()) as Flashcard[];
                if (!Array.isArray(data)) throw new Error("Neplatný formát: čekám pole flashcards.");

                if (!cancelled) {
                    setCards(data);
                    setIdx(0);
                    setFlipped(false);
                }
            } catch (e: unknown) {
                if (!cancelled) setError(e instanceof Error ? e.message : "Něco se pokazilo.");
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();

        return () => {
            cancelled = true;
        };
    }, [endpoint, initialCards]);

    // klávesové zkratky
    useEffect(() => {
        function onKeyDown(e: KeyboardEvent) {
            if (e.key === " " || e.key === "Enter") {
                e.preventDefault();
                setFlipped((v) => !v);
            }
            if (e.key === "ArrowRight") next();
            if (e.key === "ArrowLeft") prev();
            if (e.key === "Escape") setFlipped(false);
        }
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [idx, total]);

    const progressLabel = useMemo(() => {
        if (!total) return "0 / 0";
        return `${idx + 1} / ${total}`;
    }, [idx, total]);

    function next() {
        if (!total) return;
        setIdx((i) => (i + 1) % total);
        setFlipped(false);
    }

    function prev() {
        if (!total) return;
        setIdx((i) => (i - 1 + total) % total);
        setFlipped(false);
    }

    function shuffle() {
        if (cards.length < 2) return;
        const copy = [...cards];
        for (let i = copy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        setCards(copy);
        setIdx(0);
        setFlipped(false);
    }

    return (
        <section className="relative overflow-hidden bg-white text-neutral-900">
            {/* background (jemná mřížka + blob jako ve zbytku) */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-gradient-to-b from-violet-200/60 to-transparent blur-2xl" />
                <div className="absolute inset-0 opacity-[0.08]" style={gridBgStyle} />
            </div>

            <div className="relative mx-auto max-w-4xl px-4 py-12">
                {/* badge */}
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-xs shadow-sm backdrop-blur">
          <span className="inline-flex h-6 items-center rounded-full bg-neutral-900 px-2 text-[11px] font-semibold text-white">
            AI
          </span>
                    <span className="text-neutral-700">Klikni pro otočení · mezerník/enter</span>
                </div>

                <div className="flex flex-wrap items-end justify-between gap-3">
                    <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">
                        {title} <span className="text-neutral-400">deck</span>
                    </h1>

                    <div className="rounded-full border border-black/10 bg-white/70 px-4 py-2 text-xs text-neutral-700 shadow-sm backdrop-blur">
                        {progressLabel}
                    </div>
                </div>

                <p className="mt-3 text-sm text-neutral-600">
                    Tip: ← / → pro navigaci, mezerník pro otočení, Esc vrátí na otázku.
                </p>

                <div className="mt-8 rounded-2xl border border-black/10 bg-white/70 p-6 shadow-sm backdrop-blur">
                    {loading ? (
                        <div className="text-sm text-neutral-600">Načítám flashcards…</div>
                    ) : error ? (
                        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
                            {error}
                        </div>
                    ) : !current ? (
                        <div className="text-sm text-neutral-600">Žádné flashcards.</div>
                    ) : (
                        <>
                            {/* FLIP CARD */}
                            <button
                                type="button"
                                onClick={() => setFlipped((v) => !v)}
                                className="group relative block w-full"
                                aria-label="Otočit kartičku"
                            >
                                <div className="perspective">
                                    <div className={`card3d ${flipped ? "flipped" : ""}`}>
                                        {/* front */}
                                        <div className="face front">
                                            <div className="mb-3 text-xs font-semibold text-neutral-500">OTÁZKA</div>
                                            <div className="text-balance text-xl font-semibold sm:text-2xl">
                                                {current.question}
                                            </div>
                                            <div className="mt-5 text-sm text-neutral-500">
                                                Klikni pro odpověď
                                            </div>
                                        </div>

                                        {/* back */}
                                        <div className="face back">
                                            <div className="mb-3 text-xs font-semibold text-neutral-500">ODPOVĚĎ</div>
                                            <div className="text-balance text-lg text-neutral-800 sm:text-xl">
                                                {current.answer}
                                            </div>
                                            <div className="mt-5 text-sm text-neutral-500">
                                                Klikni zpět na otázku
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </button>

                            {/* controls */}
                            <div className="mt-6 flex flex-wrap items-center gap-3">
                                <button
                                    type="button"
                                    onClick={prev}
                                    className="rounded-xl border border-black/10 bg-white px-5 py-3 text-sm font-medium text-neutral-900 shadow-sm hover:bg-neutral-50"
                                >
                                    ← Předchozí
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setFlipped((v) => !v)}
                                    className="rounded-xl border border-black/10 bg-white px-5 py-3 text-sm font-medium text-neutral-900 shadow-sm hover:bg-neutral-50"
                                >
                                    Otočit
                                </button>

                                <button
                                    type="button"
                                    onClick={next}
                                    className="rounded-xl bg-neutral-900 px-5 py-3 text-sm font-medium text-white shadow-sm hover:opacity-95"
                                >
                                    Další →
                                </button>

                                <div className="flex-1" />

                                <button
                                    type="button"
                                    onClick={shuffle}
                                    className="rounded-xl border border-black/10 bg-white px-5 py-3 text-sm font-medium text-neutral-900 shadow-sm hover:bg-neutral-50"
                                >
                                    Zamíchat
                                </button>
                            </div>
                        </>
                    )}
                </div>

                {/* CSS for 3D flip */}
                <style jsx>{`
          .perspective {
            perspective: 1100px;
          }
          .card3d {
            position: relative;
            width: 100%;
            min-height: 260px;
            transform-style: preserve-3d;
            transition: transform 550ms cubic-bezier(0.2, 0.8, 0.2, 1);
          }
          .card3d.flipped {
            transform: rotateY(180deg);
          }
          .face {
            position: absolute;
            inset: 0;
            backface-visibility: hidden;
            border-radius: 16px;
            border: 1px solid rgba(0, 0, 0, 0.10);
            background: rgba(255, 255, 255, 0.85);
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
            padding: 22px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            text-align: center;
          }
          .back {
            transform: rotateY(180deg);
          }
          @media (min-width: 640px) {
            .card3d {
              min-height: 320px;
            }
            .face {
              padding: 28px;
            }
          }
        `}</style>
            </div>
        </section>
    );
}

const gridBgStyle: React.CSSProperties = {
    backgroundImage:
       "linear-gradient(to right, rgba(0,0,0,0.25) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.25) 1px, transparent 1px)",
    backgroundSize: "48px 48px",
};