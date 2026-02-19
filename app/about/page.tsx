export default function AboutPage() {
    return (
        <section className="relative overflow-hidden bg-white text-neutral-900">
            {/* background decoration */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 blur-3xl opacity-40" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_55%,transparent_80%)]" />
            </div>

            <div className="relative mx-auto max-w-6xl px-6 py-14">
                {/* header */}
                <div className="max-w-2xl">
                    <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm text-neutral-700 shadow-sm backdrop-blur">
            <span className="inline-flex h-6 items-center rounded-full bg-neutral-900 px-2 text-xs font-semibold text-white">
              O
            </span>
                        <span className="font-medium">Co je StudujChytře.cz</span>
                    </div>

                    <h1 className="mt-6 text-balance text-4xl font-extrabold tracking-tight sm:text-5xl">
                        O aplikaci
                    </h1>

                    <p className="mt-4 text-pretty text-base text-neutral-600 sm:text-lg">
                        StudujChytře.cz je moderní platforma, která ti pomůže pochopit látku, ne ji jen
                        memorovat. Zaměřuje se na vysvětlení krok za krokem, příklady a rychlou přípravu na testy.
                    </p>
                </div>

                {/* cards */}
                <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="rounded-2xl border border-black/10 bg-white/70 p-5 shadow-sm backdrop-blur">
                        <p className="text-sm font-semibold text-neutral-900">Vysvětlení krok za krokem</p>
                        <p className="mt-2 text-sm text-neutral-600">
                            Dostaneš postup a logiku řešení, aby sis to uměl zopakovat i bez nápovědy.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-black/10 bg-white/70 p-5 shadow-sm backdrop-blur">
                        <p className="text-sm font-semibold text-neutral-900">Chytré procvičování</p>
                        <p className="mt-2 text-sm text-neutral-600">
                            Procvičování podle témat a úrovní — od základů až po těžší úlohy.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-black/10 bg-white/70 p-5 shadow-sm backdrop-blur">
                        <p className="text-sm font-semibold text-neutral-900">Přehled a statistiky</p>
                        <p className="mt-2 text-sm text-neutral-600">
                            Uvidíš, jak se zlepšuješ a na čem má smysl ještě zapracovat.
                        </p>
                    </div>
                </div>

                {/* info block */}
                <div className="mt-10 rounded-2xl border border-black/10 bg-white/70 p-6 shadow-sm backdrop-blur">
                    <h2 className="text-lg font-bold">Pro koho to je?</h2>
                    <p className="mt-2 text-sm text-neutral-600">
                        Pro studenty, kteří chtějí pochopit látku rychleji a efektivněji — ať už jde o
                        domácí úkoly, přípravu na test nebo opakování před zkoušením.
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2 text-xs text-neutral-600">
                        <span className="rounded-full border border-black/10 bg-white/60 px-3 py-1">ZŠ</span>
                        <span className="rounded-full border border-black/10 bg-white/60 px-3 py-1">SŠ</span>
                        <span className="rounded-full border border-black/10 bg-white/60 px-3 py-1">Maturita</span>
                        <span className="rounded-full border border-black/10 bg-white/60 px-3 py-1">Přijímačky</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
