"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const stats = [
    { value: 15000, suffix: "+", label: "Aktivních studentů" },
    { value: 98, suffix: "%", label: "Spokojenost" },
    { value: 4.9, suffix: "", label: "Hodnocení", decimals: 1 },
];

const logos = [
    "Gymnázium Praha",
    "ČVUT",
    "Masarykova",
    "Karlova",
    "Mendelu",
];

function AnimatedCounter({
                             value,
                             suffix = "",
                             decimals = 0
                         }: {
    value: number;
    suffix?: string;
    decimals?: number;
}) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true;
                    const duration = 2000;
                    const steps = 60;
                    const increment = value / steps;
                    let current = 0;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= value) {
                            setCount(value);
                            clearInterval(timer);
                        } else {
                            setCount(current);
                        }
                    }, duration / steps);
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [value]);

    return (
        <span ref={ref}>
      {decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}
            {suffix}
    </span>
    );
}

export default function Hero() {
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
            <div className="relative mx-auto max-w-5xl px-6 pt-32 pb-20">
                {/* Badge */}
                <div className="mb-10 flex justify-center animate-fade-in">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-700">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            Nové: AI Tutor 2.0
          </span>
                </div>

                {/* Headline */}
                <h1 className="text-center animate-fade-in [animation-delay:100ms]">
          <span className="block text-5xl font-semibold tracking-tight text-neutral-900 leading-[1.1] sm:text-6xl md:text-7xl">
            Nejrychlejší a nejvýkonnější
          </span>
                    <span className="mt-2 block text-5xl font-semibold tracking-tight leading-[1.1] sm:text-6xl md:text-7xl">
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
              platforma pro učení
            </span>
          </span>
                </h1>

                {/* Subheadline */}
                <p className="mx-auto mt-8 max-w-2xl text-center text-lg text-neutral-600 leading-relaxed animate-fade-in [animation-delay:200ms] sm:text-xl">
                    Vytvářej transformativní vzdělávací zkušenosti postavené na
                    prvotřídních AI modelech a nástrojích.
                </p>

                {/* CTAs */}
                <div className="mt-10 flex flex-col items-center justify-center gap-4 animate-fade-in [animation-delay:300ms] sm:flex-row">
                    <Link
                        href="/register"
                        className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-neutral-900 px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:bg-neutral-800 hover:shadow-xl hover:scale-[1.02]"
                    >
                        Začít zdarma
                        <svg
                            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                        </svg>
                    </Link>
                    <Link
                        href="/pricing"
                        className="group inline-flex items-center justify-center gap-2 rounded-2xl border border-neutral-200 bg-white px-7 py-3.5 text-sm font-semibold text-neutral-700 shadow-sm transition-all duration-200 hover:border-neutral-300 hover:bg-neutral-50 hover:shadow-md"
                    >
                        Zobrazit ceník
                        <svg
                            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>

                {/* Logo bar */}
                <div className="mt-20 animate-fade-in [animation-delay:400ms]">
                    <p className="mb-6 text-center text-sm font-medium text-neutral-400 uppercase tracking-widest">
                        Důvěřují nám studenti z
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
                        {logos.map((logo) => (
                            <span
                                key={logo}
                                className="text-sm font-medium text-neutral-500 tracking-wide sm:text-base"
                            >
                {logo}
              </span>
                        ))}
                    </div>
                </div>

                {/* Section divider */}
                <div className="mt-24 border-t border-neutral-200" />

                {/* Feature section */}
                <div className="mt-16 text-center animate-fade-in [animation-delay:500ms]">
                    <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
                        Funkce platformy
                    </h2>
                    <p className="mt-4 text-lg text-neutral-600">
                        Naše AI nástroje pro učení
                    </p>
                    <p className="mx-auto mt-2 max-w-xl text-neutral-500">
                        Výkonné a všestranné nástroje pro různé vzdělávací úkoly s nejnovějšími AI modely.
                    </p>
                </div>

                {/* Feature cards */}
                <div className="mt-12 grid gap-4 animate-fade-in [animation-delay:600ms] sm:grid-cols-2 lg:grid-cols-3">
                    {[
                        {
                            title: "AI Tutor",
                            description: "Nejchytřejší model pro složité úkoly a hlubší vysvětlení",
                            features: ["Personalizované odpovědi", "Neomezené dotazy"],
                            icon: (
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
                                </svg>
                            ),
                        },
                        {
                            title: "Procvičování",
                            description: "Cenově dostupný model vyvažující rychlost a inteligenci",
                            features: ["Krok za krokem", "Instant feedback"],
                            icon: (
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6z" />
                                </svg>
                            ),
                        },
                        {
                            title: "Statistiky",
                            description: "Nejrychlejší a nejefektivnější sledování pro nízkou latenci",
                            features: ["Realtime pokrok", "Analýza výsledků"],
                            icon: (
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                                </svg>
                            ),
                        },
                    ].map((feature) => (
                        <div
                            key={feature.title}
                            className="group rounded-3xl border border-neutral-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:border-neutral-300 hover:shadow-lg"
                        >
                            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-700 transition-colors group-hover:bg-neutral-900 group-hover:text-white">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-neutral-900">
                                {feature.title}
                            </h3>
                            <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                                {feature.description}
                            </p>
                            <ul className="mt-4 space-y-2">
                                {feature.features.map((item) => (
                                    <li key={item} className="flex items-center gap-2 text-sm text-neutral-500">
                                        <svg className="h-4 w-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Stats row */}
                <div className="mt-20 animate-fade-in [animation-delay:700ms]">
                    <div className="rounded-3xl border border-neutral-200/80 bg-white/60 p-8 shadow-sm backdrop-blur-sm">
                        <div className="grid grid-cols-3 gap-8">
                            {stats.map((stat) => (
                                <div key={stat.label} className="text-center">
                                    <div className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
                                        <AnimatedCounter value={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
                                    </div>
                                    <div className="mt-2 text-sm text-neutral-500">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
