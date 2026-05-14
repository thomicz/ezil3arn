"use client"

import * as React from "react"
import { Calendar } from "@/components/ui/calendar"

const studyTips = [
    {
        label: "Naplánuj si týden",
        description: "Rozvrhni si studium na konkrétní dny — držet se plánu je snazší než improvizovat.",
    },
    {
        label: "Krátké bloky",
        description: "25–45 minut s krátkou přestávkou. Mozek se nepřehřeje a látka utkví déle.",
    },
    {
        label: "Opakuj pravidelně",
        description: "Vrať se k probrané látce po dni, týdnu a měsíci. Tak se z ní stane dlouhodobá paměť.",
    },
]

function formatCzechDate(date: Date | undefined) {
    if (!date) return "Žádný den vybrán"
    return new Intl.DateTimeFormat("cs-CZ", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(date)
}

export default function CalendarPage() {
    const [date, setDate] = React.useState<Date | undefined>(new Date())

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
                <div className="mb-14 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
                    <div className="max-w-2xl">
                        <div className="mb-6 flex animate-fade-in">
                            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-700">
                                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                                Naplánuj si studium
                            </span>
                        </div>
                        <h1 className="text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl md:text-6xl animate-fade-in [animation-delay:100ms] leading-[1.1]">
                            Tvůj studijní <br className="hidden sm:block" />
                            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                                kalendář.
                            </span>
                        </h1>
                        <p className="mt-4 max-w-xl text-lg text-neutral-600 leading-relaxed animate-fade-in [animation-delay:200ms] sm:text-xl">
                            Zvol si den, naplánuj si učení a sleduj svůj postup. Pravidelnost je klíč k úspěchu.
                        </p>
                    </div>
                </div>

                {/* Divider */}
                <div className="mb-10 h-px bg-neutral-200 animate-fade-in [animation-delay:300ms]" />

                {/* Calendar + side panel */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 animate-fade-in [animation-delay:400ms]">
                    {/* Calendar card */}
                    <div className="lg:col-span-2 rounded-3xl border border-neutral-200/80 bg-white p-6 shadow-sm sm:p-8">
                        <div className="mb-6 flex items-center justify-between">
                            <div>
                                <p className="text-[11px] font-semibold uppercase tracking-widest text-neutral-400">
                                    Plánovač
                                </p>
                                <h2 className="mt-1 text-xl font-semibold text-neutral-900">
                                    Vyber si den
                                </h2>
                            </div>
                            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-neutral-900 text-white shadow-sm">
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                                </svg>
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                className="w-full rounded-2xl border border-neutral-200 bg-white p-4 [--cell-size:3rem] sm:[--cell-size:3.5rem] lg:[--cell-size:3.25rem] xl:[--cell-size:3.75rem]"
                                classNames={{
                                    root: "w-full",
                                    months: "w-full",
                                    month: "w-full",
                                    caption_label: "text-base font-semibold",
                                }}
                            />
                        </div>
                    </div>

                    {/* Side panel: selected day */}
                    <div className="flex flex-col gap-6">
                        <div className="rounded-3xl border border-neutral-200/80 bg-white p-6 shadow-sm">
                            <p className="text-[11px] font-semibold uppercase tracking-widest text-neutral-400">
                                Vybraný den
                            </p>
                            <p className="mt-2 text-2xl font-semibold tracking-tight text-neutral-900 first-letter:uppercase">
                                {formatCzechDate(date)}
                            </p>
                            <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
                                Žádné naplánované učení. Začni jednoduchým 30minutovým blokem oblíbeného předmětu.
                            </p>
                            <button
                                type="button"
                                className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-neutral-800"
                            >
                                Přidat blok studia
                                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </button>
                        </div>

                        <div className="rounded-3xl border border-neutral-200/80 bg-white p-6 shadow-sm">
                            <p className="text-[11px] font-semibold uppercase tracking-widest text-neutral-400">
                                Tipy pro studium
                            </p>
                            <ul className="mt-4 flex flex-col gap-4">
                                {studyTips.map((tip) => (
                                    <li key={tip.label} className="flex gap-3">
                                        <span className="mt-1 inline-flex h-2 w-2 shrink-0 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600" />
                                        <div>
                                            <p className="text-sm font-semibold text-neutral-900">{tip.label}</p>
                                            <p className="mt-0.5 text-sm text-neutral-600 leading-relaxed">{tip.description}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
