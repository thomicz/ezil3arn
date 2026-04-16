import Link from "next/link";

const subjects = [
    {
        id: "matematika",
        label: "Matematika",
        description: "Algebra, geometrie, statistika a pokročilé výpočty.",
        href: "/learn/matika",
        color: "from-blue-500 to-blue-700",
        accent: "bg-blue-50 text-blue-700 border-blue-100",
        icon: (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.598 4.5 4.698V18a2.25 2.25 0 002.25 2.25h10.5A2.25 2.25 0 0019.5 18V4.698c0-1.1-.807-1.998-1.907-2.126A48.602 48.602 0 0012 2.25z" />
            </svg>
        ),
    },
    {
        id: "dejepis",
        label: "Dějepis",
        description: "Světové události, civilizace a historické milníky.",
        href: "/learn/dejepis",
        color: "from-amber-500 to-orange-600",
        accent: "bg-amber-50 text-amber-700 border-amber-100",
        icon: (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
            </svg>
        ),
    },
    {
        id: "fyzika",
        label: "Fyzika",
        description: "Mechanika, elektřina, optika a moderní fyzika.",
        href: "/learn/fyzika",
        color: "from-violet-500 to-purple-700",
        accent: "bg-violet-50 text-violet-700 border-violet-100",
        icon: (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
            </svg>
        ),
    },
    {
        id: "chemie",
        label: "Chemie",
        description: "Prvky, reakce, organická a anorganická chemie.",
        href: "/learn/chemie",
        color: "from-emerald-500 to-teal-600",
        accent: "bg-emerald-50 text-emerald-700 border-emerald-100",
        icon: (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
            </svg>
        ),
    },
    {
        id: "biologie",
        label: "Biologie",
        description: "Buňky, ekosystémy, genetika a anatomie.",
        href: "/learn/biologie",
        color: "from-lime-500 to-green-600",
        accent: "bg-lime-50 text-lime-700 border-lime-100",
        icon: (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
            </svg>
        ),
    },
    {
        id: "cesky-jazyk",
        label: "Český jazyk",
        description: "Gramatika, literatura, sloh a jazykový rozbor.",
        href: "/learn/cestina",
        color: "from-rose-500 to-red-600",
        accent: "bg-rose-50 text-rose-700 border-rose-100",
        icon: (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
        ),
    },
    {
        id: "anglicky-jazyk",
        label: "Anglický jazyk",
        description: "Slovíčka, gramatika, konverzace a psaní.",
        href: "/learn/anglictina",
        color: "from-sky-500 to-cyan-600",
        accent: "bg-sky-50 text-sky-700 border-sky-100",
        icon: (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" />
            </svg>
        ),
    },
    {
        id: "zeměpis",
        label: "Zeměpis",
        description: "Kontinenty, podnebí, státy a přírodní jevy.",
        href: "/learn/zemepis",
        color: "from-indigo-500 to-blue-700",
        accent: "bg-indigo-50 text-indigo-700 border-indigo-100",
        icon: (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
            </svg>
        ),
    },
];

const stats = [
    { label: "Předmětů", value: "8" },
    { label: "Aktivních žáků", value: "2 400+" },
    { label: "Otázek v databázi", value: "15 000+" },
];

export default function SubjectsPage() {
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
                <div className="mb-14 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <div className="mb-6 flex animate-fade-in">
                            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-700">
                                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                                Připraveno ke studiu
                            </span>
                        </div>
                        <h1 className="text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl md:text-6xl animate-fade-in [animation-delay:100ms] leading-[1.1]">
                            Vyber si, co se <br className="hidden sm:block" />
                            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                                dnes naučíš.
                            </span>
                        </h1>
                        <p className="mt-4 max-w-xl text-lg text-neutral-600 leading-relaxed animate-fade-in [animation-delay:200ms] sm:text-xl">
                            Přehledné materiály, kvízy a procvičování pro každý předmět. Začni okamžitě, bez registrace.
                        </p>
                    </div>

                    {/* Stats row */}
                    <div className="flex gap-8 sm:gap-6 shrink-0 animate-fade-in [animation-delay:300ms]">
                        {stats.map((s) => (
                            <div key={s.label} className="text-right">
                                <div className="text-2xl font-bold tracking-tight text-neutral-900">{s.value}</div>
                                <div className="text-xs text-neutral-500 mt-0.5">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Divider */}
                <div className="mb-10 h-px bg-neutral-200 animate-fade-in [animation-delay:400ms]" />

                {/* Subject grid */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 animate-fade-in [animation-delay:500ms]">
                    {subjects.map((subject, i) => (
                        <Link
                            key={subject.id}
                            href={subject.href}
                            className="group relative flex flex-col rounded-3xl border border-neutral-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-neutral-300 hover:shadow-lg overflow-hidden"
                            style={{ animationDelay: `${500 + (i * 50)}ms` }}
                        >
                            {/* Top color bar */}
                            <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${subject.color} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />

                            {/* Icon */}
                            <div className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl border ${subject.accent} transition-transform duration-200 group-hover:scale-110`}>
                                {subject.icon}
                            </div>

                            {/* Content */}
                            <div className="flex-1">
                                <p className="text-[11px] font-semibold uppercase tracking-widest text-neutral-400 mb-1">
                                    {subject.label}
                                </p>
                                <h3 className="text-xl font-semibold text-neutral-900 leading-snug">
                                    {subject.label}
                                </h3>
                                <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                                    {subject.description}
                                </p>
                            </div>

                            {/* CTA */}
                            <div className="mt-6 flex items-center justify-between">
                                <span className="text-sm font-semibold text-neutral-900 transition-colors group-hover:text-neutral-600">
                                    Začít studovat
                                </span>
                                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 bg-neutral-50 text-neutral-500 transition-all duration-200 group-hover:border-neutral-900 group-hover:bg-neutral-900 group-hover:text-white">
                                    <svg className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Bottom CTA / helper */}
                <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-between rounded-3xl border border-neutral-200/80 bg-white p-6 shadow-sm animate-fade-in [animation-delay:700ms]">
                    <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-neutral-900 text-white shadow-sm">
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-base font-semibold text-neutral-900">Chybí ti předmět?</p>
                            <p className="text-sm text-neutral-600">Dej nám vědět a přidáme ho co nejdříve.</p>
                        </div>
                    </div>
                    <Link
                        href="/feedback"
                        className="shrink-0 rounded-2xl border border-neutral-200 bg-neutral-50 px-6 py-2.5 text-sm font-semibold text-neutral-700 transition-colors hover:bg-neutral-100 hover:border-neutral-300"
                    >
                        Navrhnout předmět →
                    </Link>
                </div>

            </div>
        </section>
    );
}