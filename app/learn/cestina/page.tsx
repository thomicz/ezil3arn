"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

// Types for quiz data
interface Quiz {
    id: string;
    title: string;
    description: string;
    questionCount: number;
    completedCount: number;
    difficulty: "easy" | "medium" | "hard";
    topic: string;
}

// Reálný fetch na API routu
async function fetchQuizzes(): Promise<Quiz[]> {
    try {
        const response = await fetch('../../../api/quizzes');

        if (!response.ok) {
            throw new Error('Chyba při načítání kvízů ze serveru');
        }

        return await response.json();
    } catch (error) {
        console.error('Chyba API:', error);
        return []; // V případě chyby vrátíme prázdné pole
    }
}

function QuizSidebar() {
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        fetchQuizzes()
            .then((data) => {
                if (isMounted) setQuizzes(data);
            })
            .finally(() => {
                if (isMounted) setIsLoading(false);
            });

        return () => {
            isMounted = false; // Cleanup funkce zamezující memory leaks
        };
    }, []);

    const getDifficultyColor = (difficulty: Quiz["difficulty"]) => {
        switch (difficulty) {
            case "easy":
                return "bg-emerald-100 text-emerald-700";
            case "medium":
                return "bg-amber-100 text-amber-700";
            case "hard":
                return "bg-rose-100 text-rose-700";
        }
    };

    const getDifficultyLabel = (difficulty: Quiz["difficulty"]) => {
        switch (difficulty) {
            case "easy":
                return "Lehké";
            case "medium":
                return "Střední";
            case "hard":
                return "Těžké";
        }
    };

    if (isLoading) {
        return (
            <div className="rounded-3xl border border-neutral-200/80 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-neutral-900">Moje kvízy</h3>
                </div>
                <div className="mt-5 space-y-3">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="animate-pulse rounded-2xl bg-neutral-100 p-4">
                            <div className="h-4 w-3/4 rounded bg-neutral-200" />
                            <div className="mt-2 h-3 w-1/2 rounded bg-neutral-200" />
                            <div className="mt-3 h-2 w-full rounded bg-neutral-200" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (quizzes.length === 0) {
        return (
            <div className="rounded-3xl border border-neutral-200/80 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-neutral-900">Moje kvízy</h3>
                <div className="mt-6 flex flex-col items-center justify-center py-8 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-400">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                        </svg>
                    </div>
                    <p className="mt-4 text-sm font-medium text-neutral-900">Zatím žádné kvízy</p>
                    <p className="mt-1 text-xs text-neutral-500">Nahraj materiály a vytvoř svůj první kvíz</p>
                </div>
            </div>
        );
    }

    return (
        <div className="rounded-3xl border border-neutral-200/80 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-neutral-900">Moje kvízy</h3>
                <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-600">
                    {quizzes.length}
                </span>
            </div>

            <div className="mt-5 max-h-[calc(100vh-280px)] space-y-3 overflow-y-auto pr-1">
                {quizzes.map((quiz) => {
                    const progress = Math.round((quiz.completedCount / quiz.questionCount) * 100);
                    const isCompleted = progress === 100;

                    return (
                        <Link
                            key={quiz.id}
                            href={`/learn/quiz/${quiz.id}`}
                            className="group block rounded-2xl border border-transparent bg-neutral-50 p-4 transition-all duration-200 hover:border-neutral-200 hover:bg-white hover:shadow-sm"
                        >
                            <div className="flex items-start justify-between gap-2">
                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-neutral-900 truncate group-hover:text-neutral-700">
                                        {quiz.title}
                                    </p>
                                    <p className="mt-0.5 text-xs text-neutral-500 truncate">
                                        {quiz.description}
                                    </p>
                                </div>
                                <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium ${getDifficultyColor(quiz.difficulty)}`}>
                                    {getDifficultyLabel(quiz.difficulty)}
                                </span>
                            </div>

                            <div className="mt-3 flex items-center gap-3">
                                <div className="flex-1 h-1.5 rounded-full bg-neutral-200 overflow-hidden">
                                    <div
                                        className={`h-full rounded-full transition-all duration-300 ${isCompleted ? "bg-emerald-500" : "bg-neutral-900"}`}
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                                <span className="shrink-0 text-[10px] font-medium text-neutral-500">
                                    {quiz.completedCount}/{quiz.questionCount}
                                </span>
                            </div>

                            <div className="mt-2 flex items-center justify-between">
                                <span className="text-[10px] text-neutral-400 font-medium uppercase tracking-wider">{quiz.topic}</span>
                                <svg
                                    className="h-3.5 w-3.5 text-neutral-400 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-neutral-600"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2.5}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </div>
                        </Link>
                    );
                })}
            </div>

            <Link
                href="/learn/quizzes"
                className="mt-4 flex items-center justify-center gap-1.5 rounded-2xl border border-neutral-200 bg-white py-2.5 text-sm font-medium text-neutral-700 transition-all duration-200 hover:bg-neutral-50 hover:border-neutral-300"
            >
                Zobrazit vše
                <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
            </Link>
        </div>
    );
}

export default function LearnPage() {
    return (
        <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-neutral-50 to-white">
            {/* Background gradient orbs */}
            <div
                className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
                style={{
                    background: "radial-gradient(circle, rgba(59,130,246,0.3) 0%, rgba(99,102,241,0.2) 50%, transparent 70%)",
                }}
                aria-hidden="true"
            />
            <div
                className="pointer-events-none absolute -right-40 top-1/3 h-[400px] w-[400px] rounded-full opacity-30 blur-3xl"
                style={{
                    background: "radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)",
                }}
                aria-hidden="true"
            />
            <div
                className="pointer-events-none absolute -left-40 top-2/3 h-[300px] w-[300px] rounded-full opacity-25 blur-3xl"
                style={{
                    background: "radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%)",
                }}
                aria-hidden="true"
            />

            {/* Grid pattern overlay */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
                aria-hidden="true"
            />

            {/* Main content */}
            <div className="relative mx-auto max-w-7xl px-6 pt-24 pb-20">

                {/* Page header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <div className="mb-6 flex animate-fade-in">
                            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-700">
                                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                                Tvoje studijní zóna
                            </span>
                        </div>
                        <h1 className="text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl md:text-6xl animate-fade-in [animation-delay:100ms] leading-[1.1]">
                            Začni se učit <br className="hidden sm:block" />
                            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                                právě teď!
                            </span>
                        </h1>
                        <p className="mt-4 max-w-xl text-lg text-neutral-600 leading-relaxed animate-fade-in [animation-delay:200ms] sm:text-xl">
                            Vyber si, co chceš dnes dělat. Flashcards z AI, nahrání materiálu, kvízy a trénink.
                        </p>
                    </div>
                </div>

                {/* Main grid - 4 columns on lg */}
                <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-4">

                    {/* Left sidebar - Quiz list */}
                    <div className="order-2 lg:order-1 lg:col-span-1 animate-fade-in [animation-delay:300ms]">
                        <QuizSidebar />
                    </div>

                    {/* Middle column - primary content */}
                    <div className="order-1 lg:order-2 lg:col-span-2 space-y-6 animate-fade-in [animation-delay:400ms]">

                        {/* Hero card - Upload materials */}
                        <div className="group rounded-3xl border border-neutral-200/80 bg-white p-8 shadow-sm transition-all duration-300 hover:border-neutral-300 hover:shadow-lg hover:-translate-y-0.5">
                            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                                <div className="flex-1">
                                    <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                                        Nejrychlejší start
                                    </span>
                                    <h2 className="mt-4 text-2xl font-semibold text-neutral-900">
                                        Nahrajte podklady pro kvíz nebo kartičky
                                    </h2>
                                    <p className="mt-3 text-neutral-600 leading-relaxed">
                                        Nahraj PDF nebo poznámky, AI z toho udělá shrnutí, flashcards a návrh kvízu.
                                    </p>

                                    <div className="mt-6 flex flex-wrap gap-2">
                                        <span className="rounded-full bg-neutral-100 px-4 py-1.5 text-sm font-medium text-neutral-700">
                                          PDF
                                        </span>
                                        <span className="rounded-full bg-neutral-100 px-4 py-1.5 text-sm font-medium text-neutral-700">
                                          Text
                                        </span>
                                        <span className="rounded-full bg-neutral-100 px-4 py-1.5 text-sm font-medium text-neutral-700">
                                          Poznámky
                                        </span>
                                    </div>
                                </div>

                                <Link
                                    href="/learn/upload?id=2"
                                    className="group/btn shrink-0 inline-flex items-center justify-center gap-2 rounded-2xl bg-neutral-900 px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:bg-neutral-800 hover:shadow-xl hover:scale-[1.02]"
                                >
                                    Nahrát
                                    <svg
                                        className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                                    </svg>
                                </Link>
                            </div>
                        </div>

                        {/* Two column cards */}
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            {/* Flashcards card */}
                            <div className="group rounded-3xl border border-neutral-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:border-neutral-300 hover:shadow-lg hover:-translate-y-0.5">
                                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-700 transition-colors group-hover:bg-neutral-900 group-hover:text-white">
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
                                    </svg>
                                </div>
                                <h3 className="mt-2 text-xl font-semibold text-neutral-900">
                                    AI flashcards
                                </h3>
                                <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                                    Vytvoř balíček kartiček z tématu a uč se ve stylu spaced repetition.
                                </p>
                                <Link
                                    href="/learn/flashcards"
                                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-900 transition-colors hover:text-neutral-600"
                                >
                                    Otevřít flashcards
                                    <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </Link>
                            </div>

                            {/* Quizzes card */}
                            <div className="group rounded-3xl border border-neutral-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:border-neutral-300 hover:shadow-lg hover:-translate-y-0.5">
                                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-700 transition-colors group-hover:bg-neutral-900 group-hover:text-white">
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                                    </svg>
                                </div>
                                <h3 className="mt-2 text-xl font-semibold text-neutral-900">
                                    Kvízy
                                </h3>
                                <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                                    Rychlé otázky podle tématu + vysvětlení odpovědí, aby sis odnesl logiku.
                                </p>
                                <Link
                                    href="/learn/quizzes"
                                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-900 transition-colors hover:text-neutral-600"
                                >
                                    Spustit kvíz
                                    <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Right column - sidebar */}
                    <div className="order-3 lg:col-span-1 space-y-6 animate-fade-in [animation-delay:500ms]">
                        {/* Recommended topics */}
                        <div className="rounded-3xl border border-neutral-200/80 bg-white p-6 shadow-sm">
                            <h3 className="text-lg font-semibold text-neutral-900">
                                Dnes doporučujeme
                            </h3>
                            <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                                Až budeš mít statistiky, tady se ti budou ukazovat témata, která se vyplatí procvičit.
                            </p>
                            <div className="mt-5 space-y-3">
                                <div className="rounded-2xl bg-neutral-50 px-4 py-3 transition-colors hover:bg-neutral-100 cursor-pointer">
                                    <p className="font-semibold text-neutral-900">Optika</p>
                                    <p className="mt-0.5 text-xs text-neutral-500">čočky - zrcadla - lom světla</p>
                                </div>
                                <div className="rounded-2xl bg-neutral-50 px-4 py-3 transition-colors hover:bg-neutral-100 cursor-pointer">
                                    <p className="font-semibold text-neutral-900">SQL</p>
                                    <p className="mt-0.5 text-xs text-neutral-500">JOIN - views - práva</p>
                                </div>
                            </div>
                        </div>

                        {/* How it works */}
                        <div className="rounded-3xl border border-neutral-200/80 bg-white p-6 shadow-sm">
                            <h3 className="text-lg font-semibold text-neutral-900">
                                Jak to bude fungovat
                            </h3>
                            <ol className="mt-5 space-y-4">
                                {[
                                    "Nahraješ materiál nebo zadáš téma",
                                    "AI vytvoří shrnutí + flashcards",
                                    "Procvičíš se v kvízu",
                                    "Statistiky ti řeknou, co zlepšit",
                                ].map((step, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-xs font-semibold text-white">
                                          {index + 1}
                                        </span>
                                        <span className="text-sm text-neutral-600 leading-relaxed pt-0.5">
                                          {step}
                                        </span>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}