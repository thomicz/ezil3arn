"use client";

import React, { useMemo, useRef, useState } from "react";

type ApiResult = {
    notes?: string;
    flashcards?: { question: string; answer: string }[];
    quiz?: { question: string; options?: string[]; answer: string }[];
};

export default function UploadPage() {
    const inputRef = useRef<HTMLInputElement | null>(null);

    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<ApiResult | null>(null);

    const maxSizeBytes = 8 * 1024 * 1024; // 8MB
    const allowedTypes = useMemo(() => new Set(["image/jpeg", "image/png", "image/webp"]), []);

    function resetOutput() {
        setError(null);
        setResult(null);
    }

    function clearFile() {
        resetOutput();
        setFile(null);
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
        if (inputRef.current) inputRef.current.value = "";
    }

    function setChosenFile(f: File | null) {
        resetOutput();

        if (!f) {
            clearFile();
            return;
        }

        if (!allowedTypes.has(f.type)) {
            setError("Nepodporovaný typ souboru. Použij JPG, PNG nebo WEBP.");
            return;
        }

        if (f.size > maxSizeBytes) {
            setError("Soubor je moc velký. Maximum je 8 MB.");
            return;
        }

        setFile(f);
        const url = URL.createObjectURL(f);
        setPreviewUrl(url);
    }

    function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const f = e.target.files?.[0] ?? null;
        setChosenFile(f);
    }

    function onDrop(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        setIsDragging(false);
        const f = e.dataTransfer.files?.[0] ?? null;
        setChosenFile(f);
    }

    async function onSubmit() {
        resetOutput();

        if (!file) {
            setError("Nejdřív vyber fotku.");
            return;
        }

        setIsUploading(true);
        try {
            const form = new FormData();
            form.append("file", file);

            const res = await fetch("/api/upload", { method: "POST", body: form });
            if (!res.ok) {
                const text = await res.text().catch(() => "");
                throw new Error(text || `Server vrátil chybu ${res.status}`);
            }
            const data = (await res.json()) as ApiResult;
            setResult(data);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Něco se pokazilo.");
        } finally {
            setIsUploading(false);
        }
    }

    return (
        <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-neutral-50 to-white text-neutral-900">
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

            <div className="relative mx-auto max-w-7xl px-6 pt-24 pb-20">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div className="max-w-2xl">
                        <div className="mb-6 flex animate-fade-in">
                            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-700 shadow-sm">
                                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                                AI Generátor materiálů
                            </span>
                        </div>
                        <h1 className="text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl md:text-6xl animate-fade-in [animation-delay:100ms] leading-[1.1]">
                            Upload <br className="hidden sm:block" />
                            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                                poznámek
                            </span>
                        </h1>
                        <p className="mt-4 text-lg text-neutral-600 leading-relaxed animate-fade-in [animation-delay:200ms]">
                            Nejlepší výsledky dostaneš z ostré fotky bez odlesků. Klidně vyfoť stránku ze sešitu nebo učebnice —
                            my z toho uděláme přehledné materiály k učení.
                        </p>
                    </div>
                </div>

                {/* Primary Content Grid */}
                <div className="mt-16 grid w-full grid-cols-1 gap-8 lg:grid-cols-2">

                    {/* Upload Card */}
                    <div className="rounded-3xl border border-neutral-200/80 bg-white p-8 shadow-sm animate-fade-in [animation-delay:300ms]">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-neutral-900">Vložte fotografii</h2>
                            <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600">JPG/PNG/WEBP · max 8 MB</span>
                        </div>

                        <div
                            onDragOver={(e) => {
                                e.preventDefault();
                                setIsDragging(true);
                            }}
                            onDragLeave={() => setIsDragging(false)}
                            onDrop={onDrop}
                            className={`mt-6 rounded-3xl border-2 border-dashed p-6 transition-all duration-200 ${
                                isDragging ? "border-emerald-500 bg-emerald-50/50" : "border-neutral-200 bg-neutral-50/50 hover:bg-neutral-50 hover:border-neutral-300"
                            }`}
                        >
                            {!previewUrl ? (
                                <div className="flex flex-col items-center gap-4 py-10 text-center">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm border border-neutral-100 text-neutral-600">
                                        <UploadIcon />
                                    </div>
                                    <div>
                                        <div className="text-base font-semibold text-neutral-900">Přetáhni sem fotku</div>
                                        <div className="mt-1.5 text-sm text-neutral-500">
                                            nebo ji vyber z počítače / vyfoť na mobilu
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => inputRef.current?.click()}
                                        className="mt-4 rounded-2xl bg-neutral-900 px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-neutral-800 hover:shadow-lg hover:scale-[1.02]"
                                    >
                                        Vybrat soubor
                                    </button>

                                    <input
                                        ref={inputRef}
                                        type="file"
                                        accept="image/*"
                                        capture="environment"
                                        className="hidden"
                                        onChange={onFileChange}
                                    />
                                </div>
                            ) : (
                                <div className="space-y-5">
                                    <div className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={previewUrl} alt="Náhled" className="h-auto w-full object-contain max-h-[300px]" />
                                    </div>

                                    <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-white p-4 border border-neutral-200 shadow-sm">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-semibold text-neutral-900 truncate max-w-[200px]">{file?.name}</span>
                                            <span className="text-xs text-neutral-500 mt-0.5">{file ? Math.round(file.size / 1024) : 0} KB</span>
                                        </div>

                                        <div className="flex gap-2">
                                            <button
                                                type="button"
                                                onClick={() => inputRef.current?.click()}
                                                className="rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm font-medium text-neutral-700 shadow-sm transition-colors hover:bg-neutral-50"
                                                disabled={isUploading}
                                            >
                                                Změnit
                                            </button>
                                            <button
                                                type="button"
                                                onClick={clearFile}
                                                className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-sm font-medium text-rose-700 shadow-sm transition-colors hover:bg-rose-100"
                                                disabled={isUploading}
                                            >
                                                Smazat
                                            </button>
                                        </div>

                                        <input
                                            ref={inputRef}
                                            type="file"
                                            accept="image/*"
                                            capture="environment"
                                            className="hidden"
                                            onChange={onFileChange}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
                            <button
                                type="button"
                                onClick={onSubmit}
                                disabled={!file || isUploading}
                                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-2xl bg-neutral-900 px-8 py-3.5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-neutral-800 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {isUploading ? (
                                    <>
                                        <svg className="h-4 w-4 animate-spin text-white/70" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Zpracovávám...
                                    </>
                                ) : "Vytvořit výpisky a test"}
                            </button>

                            {result && (
                                <button
                                    type="button"
                                    onClick={() => document.getElementById("results")?.scrollIntoView({ behavior: "smooth", block: "start" })}
                                    className="w-full sm:w-auto rounded-2xl border border-neutral-200 bg-white px-8 py-3.5 text-sm font-semibold text-neutral-700 shadow-sm transition-all duration-200 hover:bg-neutral-50 hover:border-neutral-300"
                                >
                                    Zobrazit výsledky
                                </button>
                            )}
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="mt-6 flex items-center gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800">
                                <svg className="h-5 w-5 shrink-0 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                                {error}
                            </div>
                        )}
                    </div>

                    {/* Info / Steps Card */}
                    <div className="rounded-3xl border border-neutral-200/80 bg-white p-8 shadow-sm animate-fade-in [animation-delay:400ms]">
                        <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-700">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-semibold text-neutral-900">Jak to funguje</h2>
                        <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
                            Po nahrání fotky uděláme extrakci textu, seřadíme obsah a vygenerujeme materiály k učení.
                        </p>

                        <div className="mt-8 grid gap-4">
                            <Step
                                n="1"
                                title="Zpracování obsahu"
                                desc="AI přečte fotku a vytáhne důležité části (nadpisy, definice, příklady)."
                            />
                            <Step
                                n="2"
                                title="Výpisky"
                                desc="Stručná osnova + vysvětlení, aby ses rychle zorientoval."
                            />
                            <Step
                                n="3"
                                title="Flashcards a kvíz"
                                desc="Otázka/odpověď + testové otázky pro procvičení."
                            />
                        </div>

                        <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-5">
                            <div className="flex items-center gap-2 text-sm font-semibold text-blue-900">
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Tipy pro nejlepší výsledek
                            </div>
                            <ul className="mt-3 list-none space-y-2 text-sm text-blue-800/80">
                                <li className="flex items-start gap-2">
                                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-blue-400" />
                                    Ostrá fotka, dobré světlo, bez odlesků.
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-blue-400" />
                                    Celá stránka v záběru, ideálně vyfocená rovně shora.
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-blue-400" />
                                    U ručně psaných poznámek velmi záleží na čitelnosti písma.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Results Section */}
                <div id="results" className="mt-16 w-full pb-16 animate-fade-in [animation-delay:500ms]">
                    <div className="mb-6 flex items-end justify-between border-b border-neutral-200 pb-4">
                        <h2 className="text-2xl font-semibold text-neutral-900">Vygenerované výsledky</h2>
                        {!result && <div className="text-sm font-medium text-neutral-400">Zobrazí se po zpracování</div>}
                    </div>

                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                        <Card title="Shrnutí a Výpisky">
                            <p className="whitespace-pre-wrap text-sm text-neutral-600 leading-relaxed">
                                {result?.notes ?? <span className="text-neutral-400 italic">Zatím nejsou k dispozici žádná data.</span>}
                            </p>
                        </Card>

                        <Card title="Flashcards">
                            {result?.flashcards?.length ? (
                                <ul className="space-y-4">
                                    {result.flashcards.slice(0, 8).map((c, idx) => (
                                        <li key={idx} className="rounded-2xl border border-neutral-200/80 bg-neutral-50/50 p-5 transition-colors hover:bg-neutral-50">
                                            <div className="flex gap-3">
                                                <span className="font-bold text-neutral-300">Q</span>
                                                <div className="text-sm font-semibold text-neutral-900">{c.question}</div>
                                            </div>
                                            <div className="mt-3 flex gap-3">
                                                <span className="font-bold text-emerald-300">A</span>
                                                <div className="text-sm text-neutral-600">{c.answer}</div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <span className="text-sm text-neutral-400 italic">Zatím nejsou k dispozici žádná data.</span>
                            )}
                        </Card>

                        <Card title="Cvičný Kvíz">
                            {result?.quiz?.length ? (
                                <ol className="space-y-4">
                                    {result.quiz.slice(0, 6).map((q, idx) => (
                                        <li key={idx} className="rounded-2xl border border-neutral-200/80 bg-neutral-50/50 p-5">
                                            <div className="text-sm font-semibold text-neutral-900">
                                                {idx + 1}. {q.question}
                                            </div>
                                            {q.options?.length ? (
                                                <div className="mt-3 space-y-2">
                                                    {q.options.map((opt, i) => (
                                                        <div key={i} className="rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-600">
                                                            {opt}
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : null}
                                            <div className="mt-4 inline-flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-800">
                                                <svg className="h-3.5 w-3.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                </svg>
                                                Odpověď: {q.answer}
                                            </div>
                                        </li>
                                    ))}
                                </ol>
                            ) : (
                                <span className="text-sm text-neutral-400 italic">Zatím nejsou k dispozici žádná data.</span>
                            )}
                        </Card>
                    </div>
                </div>
            </div>
        </main>
    );
}

/* ----------------- Small UI Helpers ----------------- */

function Card({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="rounded-3xl border border-neutral-200/80 bg-white p-6 shadow-sm">
            <div className="mb-4 text-lg font-semibold text-neutral-900">{title}</div>
            <div>{children}</div>
        </div>
    );
}

function Step({ n, title, desc }: { n: string; title: string; desc: string }) {
    return (
        <div className="flex gap-4 rounded-2xl border border-neutral-200/80 bg-neutral-50/50 p-4 transition-colors hover:bg-neutral-50">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-neutral-900 text-sm font-bold text-white shadow-sm">
                {n}
            </div>
            <div>
                <div className="text-sm font-semibold text-neutral-900">{title}</div>
                <div className="mt-1 text-sm text-neutral-600 leading-relaxed">{desc}</div>
            </div>
        </div>
    );
}

function UploadIcon() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
                d="M12 16V8m0 0 3 3m-3-3-3 3"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M20 16.5a4.5 4.5 0 0 0-3.8-4.43A6 6 0 0 0 4 13.5"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
            />
            <path
                d="M5 20h14a3 3 0 0 0 1-5.83"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
            />
        </svg>
    );
}