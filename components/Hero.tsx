import Link from "next/link";
import Statistics from "@/components/Statistics";

export default function Hero() {
    return (
        <section className="relative pt-15 overflow-hidden bg-white text-neutral-900">
            {/* background decoration */}
            <div className="pointer-events-none absolute inset-0">
                {/* soft gradient */}
                <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 blur-3xl opacity-50" />
                {/* grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_55%,transparent_80%)]" />
            </div>

            <div className="relative mx-auto flex min-h-[calc(100vh-72px)] max-w-6xl flex-col items-center justify-center px-6 pb-20 pt-0 text-center">
                {/* badge */}
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm text-neutral-700 shadow-sm backdrop-blur">
          <span className="inline-flex h-6 items-center rounded-full bg-neutral-900 px-2 text-xs font-semibold text-white">
            AI
          </span>
                    <span className="font-medium">Učení rychleji, chytřeji, bez biflování</span>
                </div>

                {/* headline */}
                <h1 className="text-balance text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
                    StudujChytře<span className="text-neutral-400">.cz</span>
                </h1>

                {/* subheadline */}
                <p className="mt-5 max-w-2xl text-pretty text-base text-neutral-600 sm:text-lg">
                    Moderní vzdělávací platforma na bázi umělé inteligence, která ti pomůže s učením,
                    úkoly i přípravou na testy — jednoduše a přehledně.
                </p>

                {/* CTAs */}
                <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
                    <Link
                        href="/register"
                        className="inline-flex items-center justify-center rounded-2xl bg-neutral-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-neutral-800"
                    >
                        Začít zdarma
                        <span className="ml-2 opacity-80">→</span>
                    </Link>

                    <Link
                        href="/learn"
                        className="inline-flex items-center justify-center rounded-2xl border border-black/10 bg-white/70 px-6 py-3 text-sm font-semibold text-neutral-900 shadow-sm transition hover:bg-white"
                    >
                        Prozkoumat lekce
                    </Link>
                </div>

                {/* tiny trust row */}
                <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-neutral-500">
          <span className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Okamžité vysvětlení
          </span>
                    <span className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Příklady krok za krokem
          </span>
                    <span className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Přehledné statistiky
          </span>
                </div>

                {/* statistics */}
                <div className="mt-10 w-full max-w-xl">
                    <Statistics />
                </div>

                {/* scroll hint */}
                <div className="mt-12 flex flex-col items-center gap-2 text-xs text-neutral-400">
                    <span>Scrollni dolů</span>
                    <div className="h-8 w-5 rounded-full border border-black/10 bg-white/60 p-1">
                        <div className="h-2 w-2 animate-bounce rounded-full bg-neutral-400" />
                    </div>
                </div>
            </div>
        </section>
    );
}
