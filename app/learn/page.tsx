import Link from "next/link";

export default function LearnPage() {
    return (
        <section className="relative min-h-[calc(100vh-72px)] overflow-hidden bg-white text-neutral-900">
            {/* Lehká dekorace pozadí*/}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -top-32 right-[-120px] h-[420px] w-[420px] rounded-full bg-gradient-to-br from-emerald-200 via-sky-200 to-indigo-200 blur-3xl opacity-35" />
                <div className="absolute -bottom-40 left-[-140px] h-[520px] w-[520px] rounded-full bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-200 blur-3xl opacity-25" />
            </div>

            <div className="relative mx-auto max-w-6xl px-6 py-10">
                {/* top bar */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                            Učení
                        </h1>
                        <p className="mt-2 max-w-2xl text-sm text-neutral-600 sm:text-base">
                            Vyber si, co chceš dnes dělat. Flashcards z AI, nahrání materiálů, kvízy a trénink.
                        </p>
                    </div>


                </div>

                {/* main modules */}
                <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
                    {/* left: primary */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="rounded-3xl border border-black/10 bg-white/70 p-6 shadow-sm backdrop-blur">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <p className="text-xs font-semibold text-neutral-500">Nejrychlejší start</p>
                                    <h2 className="mt-1 text-xl font-bold">Nahrát materiály → AI výstup</h2>
                                    <p className="mt-2 text-sm text-neutral-600">
                                        Nahraj PDF/poznámky, AI z toho udělá shrnutí, flashcards a návrh kvízu.
                                    </p>

                                    <div className="mt-4 flex flex-wrap gap-2 text-xs text-neutral-700">
                                        <span className="rounded-full border border-black/10 bg-white/60 px-3 py-1">PDF</span>
                                        <span className="rounded-full border border-black/10 bg-white/60 px-3 py-1">Text</span>
                                        <span className="rounded-full border border-black/10 bg-white/60 px-3 py-1">Poznámky</span>
                                    </div>
                                </div>

                                <Link
                                    href="/learn/upload"
                                    className="shrink-0 inline-flex items-center justify-center rounded-2xl bg-neutral-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-neutral-800 transition"
                                >
                                    Nahrát <span className="ml-2 opacity-80">→</span>
                                </Link>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="rounded-3xl border border-black/10 bg-white/70 p-6 shadow-sm backdrop-blur">
                                <p className="text-xs font-semibold text-neutral-500">Procvičování</p>
                                <h3 className="mt-1 text-lg font-bold">AI flashcards</h3>
                                <p className="mt-2 text-sm text-neutral-600">
                                    Vytvoř balíček kartiček z tématu a uč se ve stylu “spaced repetition”.
                                </p>
                                <Link
                                    href="/learn/flashcards"
                                    className="mt-4 inline-flex items-center text-sm font-semibold text-neutral-900 hover:underline"
                                >
                                    Otevřít flashcards →
                                </Link>
                            </div>

                            <div className="rounded-3xl border border-black/10 bg-white/70 p-6 shadow-sm backdrop-blur">
                                <p className="text-xs font-semibold text-neutral-500">Testování</p>
                                <h3 className="mt-1 text-lg font-bold">Kvízy</h3>
                                <p className="mt-2 text-sm text-neutral-600">
                                    Rychlé otázky podle tématu + vysvětlení odpovědí, aby sis odnesl logiku.
                                </p>
                                <Link
                                    href="/learn/quizzes"
                                    className="mt-4 inline-flex items-center text-sm font-semibold text-neutral-900 hover:underline"
                                >
                                    Spustit kvíz →
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* right: sidebar cards */}
                    <div className="space-y-4">
                        <div className="rounded-3xl border border-black/10 bg-white/70 p-6 shadow-sm backdrop-blur">
                            <h3 className="text-lg font-bold">Dnes doporučujeme</h3>
                            <p className="mt-2 text-sm text-neutral-600">
                                Až budeš mít statistiky, tady se ti budou ukazovat témata, která se vyplatí procvičit.
                            </p>
                            <div className="mt-4 space-y-2 text-sm">
                                <div className="rounded-2xl border border-black/10 bg-white/60 px-4 py-3">
                                    <p className="font-semibold">Optika</p>
                                    <p className="text-xs text-neutral-500">čočky • zrcadla • lom světla</p>
                                </div>
                                <div className="rounded-2xl border border-black/10 bg-white/60 px-4 py-3">
                                    <p className="font-semibold">SQL</p>
                                    <p className="text-xs text-neutral-500">JOIN • views • práva</p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-3xl border border-black/10 bg-white/70 p-6 shadow-sm backdrop-blur">
                            <h3 className="text-lg font-bold">Jak to bude fungovat</h3>
                            <ol className="mt-3 space-y-2 text-sm text-neutral-600">
                                <li><span className="font-semibold text-neutral-900">1.</span> Nahraješ materiál nebo zadáš téma</li>
                                <li><span className="font-semibold text-neutral-900">2.</span> AI vytvoří shrnutí + flashcards</li>
                                <li><span className="font-semibold text-neutral-900">3.</span> Procvičíš se v kvízu</li>
                                <li><span className="font-semibold text-neutral-900">4.</span> Statistiky ti řeknou, co zlepšit</li>
                            </ol>
                        </div>
                    </div>
                </div>

                {/* bottom note */}
                <div className="mt-10 rounded-3xl border border-black/10 bg-white/70 p-6 shadow-sm backdrop-blur">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="text-lg font-bold">Další krok ve vývoji</h2>
                            <p className="mt-1 text-sm text-neutral-600">
                                Nejprve uděláme upload → extrakci textu → generování flashcards. Pak kvízy a progres.
                            </p>
                        </div>

                        <Link
                            href="/learn/upload"
                            className="inline-flex items-center justify-center rounded-2xl border border-black/10 bg-white/70 px-5 py-3 text-sm font-semibold text-neutral-900 shadow-sm hover:bg-white transition"
                        >
                            Začít s uploadem
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
