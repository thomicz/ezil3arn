import Link from "next/link";

export default function LearnPage() {
    return (
        <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-neutral-50 to-white">
            {/* Background gradient orbs - same as Hero */}
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
            <div className="relative mx-auto max-w-5xl px-6 pt-24 pb-20">
                {/* Page header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h1 className="text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl">
                            Začni se učit právě teď!
                        </h1>
                        <p className="mt-3 max-w-xl text-lg text-neutral-600 leading-relaxed">
                            Vyber si, co chces dnes delat. Flashcards z AI, nahrani materialu, kvizy a trenink.
                        </p>
                    </div>
                </div>

                {/* Main grid */}
                <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Left column - primary content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Hero card - Upload materials */}
                        <div className="group rounded-3xl border border-neutral-200/80 bg-white p-8 shadow-sm transition-all duration-300 hover:border-neutral-300 hover:shadow-lg">
                            <div className="flex items-start justify-between gap-6">
                                <div className="flex-1">
                  <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                    Nejrychlejsi start
                  </span>
                                    <h2 className="mt-4 text-2xl font-semibold text-neutral-900">
                                        Nahrat materialy AI vystup
                                    </h2>
                                    <p className="mt-3 text-neutral-600 leading-relaxed">
                                        Nahraj PDF/poznamky, AI z toho udela shrnuti, flashcards a navrh kvizu.
                                    </p>

                                    <div className="mt-6 flex flex-wrap gap-2">
                    <span className="rounded-full bg-neutral-100 px-4 py-1.5 text-sm font-medium text-neutral-700">
                      PDF
                    </span>
                                        <span className="rounded-full bg-neutral-100 px-4 py-1.5 text-sm font-medium text-neutral-700">
                      Text
                    </span>
                                        <span className="rounded-full bg-neutral-100 px-4 py-1.5 text-sm font-medium text-neutral-700">
                      Poznamky
                    </span>
                                    </div>
                                </div>

                                <Link
                                    href="/learn/upload"
                                    className="group/btn shrink-0 inline-flex items-center justify-center gap-2 rounded-2xl bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-neutral-800"
                                >
                                    Nahrat
                                    <svg
                                        className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-0.5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </Link>
                            </div>
                        </div>

                        {/* Two column cards */}
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            {/* Flashcards card */}
                            <div className="group rounded-3xl border border-neutral-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:border-neutral-300 hover:shadow-lg">
                                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-700 transition-colors group-hover:bg-neutral-900 group-hover:text-white">
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
                                    </svg>
                                </div>
                                <span className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Procvicovani
                </span>
                                <h3 className="mt-2 text-xl font-semibold text-neutral-900">
                                    AI flashcards
                                </h3>
                                <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                                    Vytvor balicek karticek z tematu a uc se ve stylu spaced repetition.
                                </p>
                                <Link
                                    href="/learn/flashcards"
                                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-900 transition-colors hover:text-neutral-600"
                                >
                                    Otevrit flashcards
                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </Link>
                            </div>

                            {/* Quizzes card */}
                            <div className="group rounded-3xl border border-neutral-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:border-neutral-300 hover:shadow-lg">
                                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-700 transition-colors group-hover:bg-neutral-900 group-hover:text-white">
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                                    </svg>
                                </div>
                                <span className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Testovani
                </span>
                                <h3 className="mt-2 text-xl font-semibold text-neutral-900">
                                    Kvizy
                                </h3>
                                <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                                    Rychle otazky podle tematu + vysvetleni odpovedi, aby sis odnesl logiku.
                                </p>
                                <Link
                                    href="/learn/quizzes"
                                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-900 transition-colors hover:text-neutral-600"
                                >
                                    Spustit kviz
                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Right column - sidebar */}
                    <div className="space-y-6">
                        {/* Recommended topics */}
                        <div className="rounded-3xl border border-neutral-200/80 bg-white p-6 shadow-sm">
                            <h3 className="text-lg font-semibold text-neutral-900">
                                Dnes doporucujeme
                            </h3>
                            <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                                Az budes mit statistiky, tady se ti budou ukazovat temata, ktera se vyplati procvicit.
                            </p>
                            <div className="mt-5 space-y-3">
                                <div className="rounded-2xl bg-neutral-50 px-4 py-3 transition-colors hover:bg-neutral-100">
                                    <p className="font-semibold text-neutral-900">Optika</p>
                                    <p className="mt-0.5 text-xs text-neutral-500">cocky - zrcadla - lom svetla</p>
                                </div>
                                <div className="rounded-2xl bg-neutral-50 px-4 py-3 transition-colors hover:bg-neutral-100">
                                    <p className="font-semibold text-neutral-900">SQL</p>
                                    <p className="mt-0.5 text-xs text-neutral-500">JOIN - views - prava</p>
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
                                    "Nahrajes material nebo zadas tema",
                                    "AI vytvori shrnuti + flashcards",
                                    "Procvicis se v kvizu",
                                    "Statistiky ti reknou, co zlepsit",
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
