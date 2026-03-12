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
        <main className="relative overflow-hidden bg-white text-neutral-900">
            {/* background decoration (grid + soft gradient like homepage) */}
            <div className="pointer-events-none absolute inset-0">
                {/* soft blob */}
                <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-gradient-to-b from-violet-200/60 to-transparent blur-2xl" />
                {/* grid */}
                <div className="absolute inset-0 opacity-[0.08]" style={gridBgStyle} />
            </div>

            <div className="relative mx-auto flex min-h-[calc(100vh-72px)] max-w-6xl flex-col items-center px-4 pt-16">
                {/* badge */}
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-xs shadow-sm backdrop-blur">
          <span className="inline-flex h-6 items-center rounded-full bg-neutral-900 px-2 text-[11px] font-semibold text-white">
            AI
          </span>
                    <span className="text-neutral-700">Nahraj fotku a vytvoř výpisky, flashcards a kvíz</span>
                </div>

                {/* headline */}
                <h1 className="text-center text-4xl font-semibold tracking-tight sm:text-6xl">
                    Upload <span className="text-neutral-400">poznámek</span>
                </h1>

                <p className="mt-4 max-w-2xl text-center text-sm text-neutral-600 sm:text-base">
                    Nejlepší výsledky dostaneš z ostré fotky bez odlesků. Klidně vyfoť stránku ze sešitu nebo učebnice —
                    my z toho uděláme přehledné materiály k učení.
                </p>

                {/* primary content */}
                <div className="mt-10 grid w-full grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* upload card */}
                    <div className="rounded-2xl border border-black/10 bg-white/70 p-6 shadow-sm backdrop-blur">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold">Fotka</h2>
                            <span className="text-xs text-neutral-500">JPG/PNG/WEBP · max 8 MB</span>
                        </div>

                        <div
                            onDragOver={(e) => {
                                e.preventDefault();
                                setIsDragging(true);
                            }}
                            onDragLeave={() => setIsDragging(false)}
                            onDrop={onDrop}
                            className={[
                                "mt-4 rounded-2xl border border-dashed p-5 transition",
                                isDragging ? "border-neutral-900 bg-neutral-50" : "border-black/15 bg-white",
                            ].join(" ")}
                        >
                            {!previewUrl ? (
                                <div className="flex flex-col items-center gap-3 py-10 text-center">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-black/10 bg-white shadow-sm">
                                        <UploadIcon />
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold">Přetáhni sem fotku</div>
                                        <div className="mt-1 text-xs text-neutral-600">
                                            nebo ji vyber z počítače / vyfoť na mobilu
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => inputRef.current?.click()}
                                        className="mt-2 rounded-xl bg-neutral-900 px-5 py-3 text-sm font-medium text-white shadow-sm hover:opacity-95"
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
                                <div className="space-y-4">
                                    <div className="overflow-hidden rounded-2xl border border-black/10 bg-white">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={previewUrl} alt="Náhled" className="h-auto w-full object-contain" />
                                    </div>

                                    <div className="flex flex-wrap items-center justify-between gap-3">
                                        <div className="text-xs text-neutral-600">
                                            <span className="font-medium text-neutral-900">{file?.name}</span>
                                            {" · "}
                                            {file ? Math.round(file.size / 1024) : 0} KB
                                        </div>

                                        <div className="flex gap-2">
                                            <button
                                                type="button"
                                                onClick={() => inputRef.current?.click()}
                                                className="rounded-xl border border-black/10 bg-white px-4 py-2 text-sm font-medium text-neutral-900 shadow-sm hover:bg-neutral-50"
                                                disabled={isUploading}
                                            >
                                                Vybrat jinou
                                            </button>
                                            <button
                                                type="button"
                                                onClick={clearFile}
                                                className="rounded-xl border border-black/10 bg-white px-4 py-2 text-sm font-medium text-neutral-900 shadow-sm hover:bg-neutral-50"
                                                disabled={isUploading}
                                            >
                                                Vymazat
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

                        {/* actions */}
                        <div className="mt-5 flex flex-wrap items-center gap-3">
                            <button
                                type="button"
                                onClick={onSubmit}
                                disabled={!file || isUploading}
                                className="rounded-xl bg-neutral-900 px-6 py-3 text-sm font-medium text-white shadow-sm disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {isUploading ? "Zpracovávám..." : "Vytvořit výpisky a test"}
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    // quick demo: scroll to results after upload
                                    document.getElementById("results")?.scrollIntoView({ behavior: "smooth", block: "start" });
                                }}
                                className="rounded-xl border border-black/10 bg-white px-6 py-3 text-sm font-medium text-neutral-900 shadow-sm hover:bg-neutral-50"
                            >
                                Zobrazit výsledky
                            </button>

                            <div className="text-xs text-neutral-500">
                                Tip: foť kolmo shora a vyhni se odleskům.
                            </div>
                        </div>

                        {/* messages */}
                        {error && (
                            <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
                                {error}
                            </div>
                        )}
                    </div>

                    {/* info / steps card (like “features”) */}
                    <div className="rounded-2xl border border-black/10 bg-white/70 p-6 shadow-sm backdrop-blur">
                        <h2 className="text-lg font-semibold">Jak to funguje</h2>
                        <p className="mt-2 text-sm text-neutral-600">
                            Po nahrání fotky uděláme extrakci textu, seřadíme obsah a vygenerujeme materiály k učení.
                        </p>

                        <div className="mt-6 grid gap-3">
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

                        <div className="mt-6 rounded-2xl border border-black/10 bg-white p-5">
                            <div className="text-sm font-semibold">Doporučení pro nejlepší výsledky</div>
                            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-neutral-700">
                                <li>Ostrá fotka, dobré světlo, bez odlesků.</li>
                                <li>Celá stránka v záběru, ideálně rovně.</li>
                                <li>U ručně psaných poznámek záleží na čitelnosti písma.</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* results */}
                <div id="results" className="mt-10 w-full pb-16">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-xl font-semibold">Výsledky</h2>
                        <div className="text-xs text-neutral-500">Zobrazí se po zpracování</div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                        <Card title="Výpisky">
                            <p className="whitespace-pre-wrap text-sm text-neutral-700">
                                {result?.notes ?? "—"}
                            </p>
                        </Card>

                        <Card title="Flashcards">
                            {result?.flashcards?.length ? (
                                <ul className="space-y-3">
                                    {result.flashcards.slice(0, 8).map((c, idx) => (
                                        <li key={idx} className="rounded-xl border border-black/10 bg-white p-4">
                                            <div className="text-sm font-semibold">Q: {c.question}</div>
                                            <div className="mt-2 text-sm text-neutral-700">A: {c.answer}</div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="text-sm text-neutral-600">—</div>
                            )}
                        </Card>

                        <Card title="Kvíz">
                            {result?.quiz?.length ? (
                                <ol className="space-y-3">
                                    {result.quiz.slice(0, 6).map((q, idx) => (
                                        <li key={idx} className="rounded-xl border border-black/10 bg-white p-4">
                                            <div className="text-sm font-semibold">
                                                {idx + 1}. {q.question}
                                            </div>
                                            {q.options?.length ? (
                                                <ul className="mt-2 list-disc pl-5 text-sm text-neutral-700">
                                                    {q.options.map((opt, i) => (
                                                        <li key={i}>{opt}</li>
                                                    ))}
                                                </ul>
                                            ) : null}
                                            <div className="mt-2 text-sm text-neutral-700">
                                                <span className="font-medium">Správně:</span> {q.answer}
                                            </div>
                                        </li>
                                    ))}
                                </ol>
                            ) : (
                                <div className="text-sm text-neutral-600">—</div>
                            )}
                        </Card>
                    </div>
                </div>
            </div>
        </main>
    );
}

/* ----------------- small UI helpers ----------------- */

function Card({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="rounded-2xl border border-black/10 bg-white/70 p-5 shadow-sm backdrop-blur">
            <div className="text-sm font-semibold">{title}</div>
            <div className="mt-3">{children}</div>
        </div>
    );
}

function Step({ n, title, desc }: { n: string; title: string; desc: string }) {
    return (
        <div className="flex gap-3 rounded-2xl border border-black/10 bg-white p-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-neutral-900 text-sm font-semibold text-white">
                {n}
            </div>
            <div>
                <div className="text-sm font-semibold text-neutral-900">{title}</div>
                <div className="mt-1 text-sm text-neutral-600">{desc}</div>
            </div>
        </div>
    );
}

function UploadIcon() {
    return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
                d="M12 16V8m0 0 3 3m-3-3-3 3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M20 16.5a4.5 4.5 0 0 0-3.8-4.43A6 6 0 0 0 4 13.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
            <path
                d="M5 20h14a3 3 0 0 0 1-5.83"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    );
}

const gridBgStyle: React.CSSProperties = {
    backgroundImage:
        "linear-gradient(to right, rgba(0,0,0,0.25) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.25) 1px, transparent 1px)",
    backgroundSize: "48px 48px",
};