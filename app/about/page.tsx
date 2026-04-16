export default function AboutPage() {
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

                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div className="max-w-2xl">
                        <div className="mb-6 flex animate-fade-in">
                            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-700">
                                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                                Co je StudujChytře.cz
                            </span>
                        </div>
                        <h1 className="text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl md:text-6xl animate-fade-in [animation-delay:100ms] leading-[1.1]">
                            O naší <br className="hidden sm:block" />
                            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                                platformě
                            </span>
                        </h1>
                        <p className="mt-4 max-w-xl text-lg text-neutral-600 leading-relaxed animate-fade-in [animation-delay:200ms] sm:text-xl">
                            StudujChytře.cz je moderní platforma, která ti pomůže pochopit látku, ne ji jen
                            memorovat. Zaměřuje se na vysvětlení krok za krokem, příklady a rychlou přípravu na testy.
                        </p>
                    </div>
                </div>

                {/* Cards */}
                <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 animate-fade-in [animation-delay:300ms]">

                    {/* Card 1 */}
                    <div className="group rounded-3xl border border-neutral-200/80 bg-white p-8 shadow-sm transition-all duration-300 hover:border-neutral-300 hover:shadow-lg hover:-translate-y-1">
                        <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-700 transition-colors group-hover:bg-neutral-900 group-hover:text-white">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.82 1.508-2.316a7.5 7.5 0 10-7.516 0c.85.496 1.508 1.333 1.508 2.316V18" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-neutral-900">
                            Vysvětlení krok za krokem
                        </h3>
                        <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
                            Dostaneš postup a logiku řešení, aby sis to uměl zopakovat i bez nápovědy.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="group rounded-3xl border border-neutral-200/80 bg-white p-8 shadow-sm transition-all duration-300 hover:border-neutral-300 hover:shadow-lg hover:-translate-y-1">
                        <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-700 transition-colors group-hover:bg-neutral-900 group-hover:text-white">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-neutral-900">
                            Chytré procvičování
                        </h3>
                        <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
                            Procvičování podle témat a úrovní — od základů až po těžší úlohy.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="group rounded-3xl border border-neutral-200/80 bg-white p-8 shadow-sm transition-all duration-300 hover:border-neutral-300 hover:shadow-lg hover:-translate-y-1">
                        <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-700 transition-colors group-hover:bg-neutral-900 group-hover:text-white">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-neutral-900">
                            Přehled a statistiky
                        </h3>
                        <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
                            Uvidíš, jak se zlepšuješ a na čem má smysl ještě zapracovat.
                        </p>
                    </div>
                </div>

                {/* Info block */}
                <div className="mt-10 rounded-3xl border border-neutral-200/80 bg-white p-8 shadow-sm animate-fade-in [animation-delay:400ms]">
                    <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex-1">
                            <h2 className="text-2xl font-semibold text-neutral-900">
                                Pro koho to je?
                            </h2>
                            <p className="mt-3 text-base text-neutral-600 leading-relaxed max-w-3xl">
                                Pro studenty, kteří chtějí pochopit látku rychleji a efektivněji — ať už jde o
                                domácí úkoly, přípravu na test nebo opakování před zkoušením.
                            </p>

                            <div className="mt-6 flex flex-wrap gap-2">
                                <span className="rounded-full bg-neutral-100 px-4 py-1.5 text-sm font-medium text-neutral-700">
                                    ZŠ
                                </span>
                                <span className="rounded-full bg-neutral-100 px-4 py-1.5 text-sm font-medium text-neutral-700">
                                    SŠ
                                </span>
                                <span className="rounded-full bg-neutral-100 px-4 py-1.5 text-sm font-medium text-neutral-700">
                                    Maturita
                                </span>
                                <span className="rounded-full bg-neutral-100 px-4 py-1.5 text-sm font-medium text-neutral-700">
                                    Přijímačky
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}