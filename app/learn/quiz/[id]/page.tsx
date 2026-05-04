"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";

type QuizQuestion =
    | {
    id: string | number;
    type: "mcq";
    question: string;
    options: string[];
    answerIndex: number; // index do options
    explanation?: string;
}
    | {
    id: string | number;
    type: "tf";
    question: string;
    answer: boolean;
    explanation?: string;
}
    | {
    id: string | number;
    type: "short";
    question: string;
    answer: string; // očekávaná odpověď (pro jednoduché porovnání)
    explanation?: string;
};

type ApiResponse = {
    title?: string;
    questions: QuizQuestion[];
};

export default function QuizzesPage() {
    const params = useParams();
    const quizId = params.id as string;

    const [data, setData] = useState<ApiResponse | null>(null);
    const [idx, setIdx] = useState(0);

    // user answers
    const [answers, setAnswers] = useState<Record<string, number | boolean | string>>({});
    const [submitted, setSubmitted] = useState(false);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const total = data?.questions.length ?? 0;
    const q = data?.questions[idx];

    useEffect(() => {
        if (!quizId) return;

        let cancelled = false;

        (async () => {
            try {
                setLoading(true);
                setError(null);

                const res = await fetch(`/api/quizzes/${quizId}`, { cache: "no-store" });
                if (!res.ok) {
                    const errData = await res.json().catch(() => ({}));
                    throw new Error(errData.error || `Server vrátil ${res.status}`);
                }

                const json = await res.json();

                if (!cancelled) {
                    // Převod AI formátu na formát frontendu
                    const mappedQuestions: QuizQuestion[] = (json.quiz || []).map((item: any, index: number) => {
                        let correctIdx = item.options?.findIndex((opt: string) => opt === item.answer);
                        if (correctIdx === -1) correctIdx = 0; // fallback

                        return {
                            id: index,
                            type: "mcq",
                            question: item.question,
                            options: item.options || [],
                            answerIndex: correctIdx
                        };
                    });

                    setData({
                        title: json.title || "Kvíz",
                        questions: mappedQuestions
                    });

                    setIdx(0);
                    setAnswers({});
                    setSubmitted(false);
                }
            } catch (e: unknown) {
                if (!cancelled) setError(e instanceof Error ? e.message : "Něco se pokazilo při načítání kvízu.");
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();

        return () => {
            cancelled = true;
        };
    }, [quizId]);

    function goNext() {
        if (!total) return;
        setIdx((i) => Math.min(i + 1, total - 1));
    }
    function goPrev() {
        if (!total) return;
        setIdx((i) => Math.max(i - 1, 0));
    }

    function setAnswerFor(questionId: string | number, value: number | boolean | string) {
        setAnswers((prev) => ({ ...prev, [String(questionId)]: value }));
    }

    const answeredCount = useMemo(() => {
        if (!data) return 0;
        return data.questions.reduce((acc, qq) => {
            const v = answers[String(qq.id)];
            if (qq.type === "short") return acc + (typeof v === "string" && v.trim().length > 0 ? 1 : 0);
            return acc + (v !== undefined ? 1 : 0);
        }, 0);
    }, [answers, data]);

    const score = useMemo(() => {
        if (!data || !submitted) return null;

        let correct = 0;
        for (const qq of data.questions) {
            const v = answers[String(qq.id)];
            if (qq.type === "mcq") {
                if (typeof v === "number" && v === qq.answerIndex) correct++;
            } else if (qq.type === "tf") {
                if (typeof v === "boolean" && v === qq.answer) correct++;
            } else if (qq.type === "short") {
                if (typeof v === "string") {
                    const a = v.trim().toLowerCase();
                    const b = qq.answer.trim().toLowerCase();
                    if (a === b) correct++;
                }
            }
        }
        return { correct, total: data.questions.length };
    }, [answers, data, submitted]);

    function submit() {
        if (!data) return;
        setSubmitted(true);
        setTimeout(() => document.getElementById("results")?.scrollIntoView({ behavior: "smooth" }), 0);
    }

    function restart() {
        setIdx(0);
        setAnswers({});
        setSubmitted(false);
    }

    const progressLabel = total ? `${idx + 1} / ${total}` : "0 / 0";

    return (
        <main className="relative min-h-screen overflow-hidden bg-white text-neutral-900">
            {/* background decoration */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-gradient-to-b from-violet-200/60 to-transparent blur-2xl" />
                <div className="absolute inset-0 opacity-[0.08]" style={gridBgStyle} />
            </div>

            <div className="relative mx-auto max-w-5xl px-4 py-12">
                {/* badge */}
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-xs shadow-sm backdrop-blur">
                    <span className="inline-flex h-6 items-center rounded-full bg-neutral-900 px-2 text-[11px] font-semibold text-white">
                        TEST
                    </span>
                    <span className="text-neutral-700">Odpovídej a vyhodnoť si skóre</span>
                </div>

                <div className="flex flex-wrap items-end justify-between gap-3">
                    <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">
                        {data?.title ?? "AI Kvíz"} <span className="text-neutral-400">mode</span>
                    </h1>

                    <div className="rounded-full border border-black/10 bg-white/70 px-4 py-2 text-xs text-neutral-700 shadow-sm backdrop-blur">
                        {progressLabel} · vyplněno {answeredCount}/{total}
                    </div>
                </div>

                <p className="mt-3 text-sm text-neutral-600">
                    Tip: dělej to rychle. Když si nejsi jistý, tipni a pokračuj — pak se poučíš z vyhodnocení.
                </p>

                <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* MAIN QUESTION CARD */}
                    <div className="lg:col-span-2 rounded-2xl border border-black/10 bg-white/70 p-6 shadow-sm backdrop-blur">
                        {loading ? (
                            <div className="text-sm text-neutral-600">Načítám otázky ze serveru…</div>
                        ) : error ? (
                            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
                                {error}
                            </div>
                        ) : !q ? (
                            <div className="text-sm text-neutral-600">Zatím nebyly nalezeny žádné otázky.</div>
                        ) : (
                            <>
                                <div className="text-xs font-semibold text-neutral-500">
                                    {q.type === "mcq" ? "VÝBĚR" : q.type === "tf" ? "PRAVDA/LEŽ" : "KRÁTKÁ ODPOVĚĎ"}
                                </div>
                                <div className="mt-2 text-xl font-semibold sm:text-2xl">{q.question}</div>

                                <div className="mt-6 space-y-3">
                                    {q.type === "mcq" && (
                                        <Mcq
                                            q={q}
                                            value={answers[String(q.id)] as number | undefined}
                                            onChange={(v) => setAnswerFor(q.id, v)}
                                            disabled={submitted}
                                            showCorrect={submitted}
                                        />
                                    )}

                                    {q.type === "tf" && (
                                        <TrueFalse
                                            q={q}
                                            value={answers[String(q.id)] as boolean | undefined}
                                            onChange={(v) => setAnswerFor(q.id, v)}
                                            disabled={submitted}
                                            showCorrect={submitted}
                                        />
                                    )}

                                    {q.type === "short" && (
                                        <ShortAnswer
                                            q={q}
                                            value={(answers[String(q.id)] as string | undefined) ?? ""}
                                            onChange={(v) => setAnswerFor(q.id, v)}
                                            disabled={submitted}
                                            showCorrect={submitted}
                                        />
                                    )}

                                    {submitted && q.explanation ? (
                                        <div className="mt-4 rounded-xl border border-black/10 bg-white p-4 text-sm text-neutral-700">
                                            <div className="text-xs font-semibold text-neutral-500">Vysvětlení</div>
                                            <div className="mt-1">{q.explanation}</div>
                                        </div>
                                    ) : null}
                                </div>

                                {/* Controls */}
                                <div className="mt-8 flex flex-wrap items-center gap-3">
                                    <button
                                        type="button"
                                        onClick={goPrev}
                                        disabled={idx === 0}
                                        className="rounded-xl border border-black/10 bg-white px-5 py-3 text-sm font-medium text-neutral-900 shadow-sm hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        ← Předchozí
                                    </button>

                                    <button
                                        type="button"
                                        onClick={goNext}
                                        disabled={idx >= total - 1}
                                        className="rounded-xl bg-neutral-900 px-5 py-3 text-sm font-medium text-white shadow-sm hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        Další →
                                    </button>

                                    <div className="flex-1" />

                                    {!submitted ? (
                                        <button
                                            type="button"
                                            onClick={submit}
                                            disabled={!total}
                                            className="rounded-xl border border-black/10 bg-white px-5 py-3 text-sm font-medium text-neutral-900 shadow-sm hover:bg-neutral-50"
                                        >
                                            Vyhodnotit test
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={restart}
                                            className="rounded-xl border border-black/10 bg-white px-5 py-3 text-sm font-medium text-neutral-900 shadow-sm hover:bg-neutral-50"
                                        >
                                            Zkusit znovu
                                        </button>
                                    )}
                                </div>
                            </>
                        )}
                    </div>

                    {/* SIDE PANEL */}
                    <div className="rounded-2xl border border-black/10 bg-white/70 p-6 shadow-sm backdrop-blur h-fit">
                        <div className="text-sm font-semibold">Přehled</div>
                        <p className="mt-2 text-sm text-neutral-600">
                            Klikni na číslo otázky pro skok.
                        </p>

                        <div className="mt-4 grid grid-cols-6 gap-2">
                            {data?.questions?.map((qq, i) => {
                                const v = answers[String(qq.id)];
                                const isAnswered =
                                    qq.type === "short"
                                        ? typeof v === "string" && v.trim().length > 0
                                        : v !== undefined;

                                const isActive = i === idx;

                                let statusClass =
                                    "border-black/10 bg-white text-neutral-900 hover:bg-neutral-50";
                                if (submitted) {
                                    const ok = isCorrect(qq, v);
                                    statusClass = ok
                                        ? "border-green-200 bg-green-50 text-green-900"
                                        : "border-red-200 bg-red-50 text-red-900";
                                } else if (isAnswered) {
                                    statusClass = "border-black/10 bg-neutral-900 text-white hover:opacity-90";
                                }

                                return (
                                    <button
                                        key={String(qq.id)}
                                        type="button"
                                        onClick={() => setIdx(i)}
                                        className={[
                                            "h-10 rounded-xl border text-xs font-semibold shadow-sm transition",
                                            statusClass,
                                            isActive ? "ring-2 ring-neutral-900/20" : "",
                                        ].join(" ")}
                                    >
                                        {i + 1}
                                    </button>
                                );
                            })}
                        </div>

                        <div id="results" className="mt-6 rounded-2xl border border-black/10 bg-white p-5">
                            <div className="text-sm font-semibold">Výsledek</div>
                            {submitted && score ? (
                                <div className="mt-2 text-sm text-neutral-700">
                                    Správně: <span className="font-semibold">{score.correct}</span> /{" "}
                                    <span className="font-semibold">{score.total}</span>
                                </div>
                            ) : (
                                <div className="mt-2 text-sm text-neutral-600">Zatím nevyhodnoceno.</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

/* ----------------- question components ----------------- */

function Mcq({
                 q,
                 value,
                 onChange,
                 disabled,
                 showCorrect,
             }: {
    q: Extract<QuizQuestion, { type: "mcq" }>;
    value: number | undefined;
    onChange: (v: number) => void;
    disabled: boolean;
    showCorrect: boolean;
}) {
    return (
        <div className="space-y-2">
            {q.options.map((opt, i) => {
                const selected = value === i;
                const correct = i === q.answerIndex;

                const base =
                    "w-full rounded-xl border px-4 py-3 text-left text-sm shadow-sm transition";
                const normal = "border-black/10 bg-white hover:bg-neutral-50";
                const active = "border-neutral-900 bg-neutral-900 text-white";
                const right = "border-green-200 bg-green-50 text-green-900";
                const wrong = "border-red-200 bg-red-50 text-red-900";

                let cls = `${base} ${normal}`;
                if (selected) cls = `${base} ${active}`;

                if (showCorrect) {
                    if (correct) cls = `${base} ${right}`;
                    else if (selected && !correct) cls = `${base} ${wrong}`;
                    else cls = `${base} ${normal}`;
                }

                return (
                    <button
                        key={i}
                        type="button"
                        disabled={disabled}
                        onClick={() => onChange(i)}
                        className={cls + (disabled ? " opacity-90" : "")}
                    >
                        <span className="mr-2 font-semibold">{String.fromCharCode(65 + i)}.</span> {opt}
                    </button>
                );
            })}
        </div>
    );
}

function TrueFalse({
                       q,
                       value,
                       onChange,
                       disabled,
                       showCorrect,
                   }: {
    q: Extract<QuizQuestion, { type: "tf" }>;
    value: boolean | undefined;
    onChange: (v: boolean) => void;
    disabled: boolean;
    showCorrect: boolean;
}) {
    const btnClass = (picked: boolean) => {
        const base =
            "w-full rounded-xl border px-4 py-3 text-left text-sm shadow-sm transition";
        const normal = "border-black/10 bg-white hover:bg-neutral-50";
        const active = "border-neutral-900 bg-neutral-900 text-white";
        const right = "border-green-200 bg-green-50 text-green-900";
        const wrong = "border-red-200 bg-red-50 text-red-900";

        const selected = value === picked;
        let cls = `${base} ${selected ? active : normal}`;

        if (showCorrect) {
            if (picked === q.answer) cls = `${base} ${right}`;
            else if (selected && picked !== q.answer) cls = `${base} ${wrong}`;
            else cls = `${base} ${normal}`;
        }

        return cls + (disabled ? " opacity-90" : "");
    };

    return (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <button type="button" disabled={disabled} onClick={() => onChange(true)} className={btnClass(true)}>
                Pravda
            </button>
            <button type="button" disabled={disabled} onClick={() => onChange(false)} className={btnClass(false)}>
                Lež
            </button>
        </div>
    );
}

function ShortAnswer({
                         q,
                         value,
                         onChange,
                         disabled,
                         showCorrect,
                     }: {
    q: Extract<QuizQuestion, { type: "short" }>;
    value: string;
    onChange: (v: string) => void;
    disabled: boolean;
    showCorrect: boolean;
}) {
    const isCorrectNow =
        showCorrect && value.trim().toLowerCase() === q.answer.trim().toLowerCase();

    return (
        <div className="space-y-3">
            <input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                disabled={disabled}
                placeholder="Napiš odpověď…"
                className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm shadow-sm outline-none focus:border-neutral-900"
            />

            {showCorrect ? (
                <div
                    className={[
                        "rounded-xl border p-4 text-sm",
                        isCorrectNow ? "border-green-200 bg-green-50 text-green-900" : "border-red-200 bg-red-50 text-red-900",
                    ].join(" ")}
                >
                    <div className="text-xs font-semibold opacity-80">Správná odpověď</div>
                    <div className="mt-1 font-semibold text-neutral-900">{q.answer}</div>
                </div>
            ) : null}
        </div>
    );
}

function isCorrect(q: QuizQuestion, v: unknown) {
    if (q.type === "mcq") return typeof v === "number" && v === q.answerIndex;
    if (q.type === "tf") return typeof v === "boolean" && v === q.answer;
    if (q.type === "short") {
        if (typeof v !== "string") return false;
        return v.trim().toLowerCase() === q.answer.trim().toLowerCase();
    }
    return false;
}

const gridBgStyle: React.CSSProperties = {
    backgroundImage:
        "linear-gradient(to right, rgba(0,0,0,0.25) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.25) 1px, transparent 1px)",
    backgroundSize: "48px 48px",
};