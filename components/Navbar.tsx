"use client";

import { useState } from "react"; // 1. Přidán useState
import Link from "next/link";
import useAuth from "../app/hooks/useAuth";

export default function Navbar() {
    const { user, loading } = useAuth();
    const [isOpen, setIsOpen] = useState(false); // 2. State pro mobilní menu

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <header className="sticky top-0 z-50 w-full">
            <div className="bg-white/60 backdrop-blur-xl supports-[backdrop-filter]:bg-white/50">
                {/* top hairline */}
                <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-black/10 to-transparent" />

                <nav className="mx-auto max-w-6xl px-6 py-4">
                    <div className="flex items-center justify-between">
                        {/* Brand */}
                        <Link
                            href="/"
                            className="group flex items-center gap-3 font-semibold tracking-tight text-neutral-900"
                        >
                            <span className="relative grid h-10 w-10 place-items-center rounded-2xl border border-black/10 bg-white/70 shadow-sm transition group-hover:shadow-md">
                                <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-gradient-to-br from-indigo-400 to-pink-400 opacity-80" />
                                <span className="text-sm font-extrabold">SC</span>
                            </span>
                            <span className="text-base sm:text-lg">
                                StudujChytře<span className="text-neutral-400">.cz</span>
                            </span>
                        </Link>

                        {/* Desktop Navigation (skryto na mobilu) */}
                        <div className="hidden items-center gap-3 md:flex">
                            <div className="flex items-center gap-1 rounded-2xl border border-black/10 bg-white/60 p-1 shadow-sm">
                                <Link href="/" className="rounded-xl px-3 py-2 text-sm text-neutral-700 hover:bg-black/5 transition">Úvod</Link>
                                <Link href="/learn" className="rounded-xl px-3 py-2 text-sm text-neutral-700 hover:bg-black/5 transition">Učení</Link>
                                <Link href="/about" className="rounded-xl px-3 py-2 text-sm text-neutral-700 hover:bg-black/5 transition">Kalendář</Link>
                                <Link href="/about" className="rounded-xl px-3 py-2 text-sm text-neutral-700 hover:bg-black/5 transition">O projektu</Link>
                            </div>

                            <div className="mx-1 h-6 w-px bg-black/10" />

                            {loading ? null : user ? (
                                <span className="inline-flex items-center justify-center rounded-2xl border border-black/10 bg-white/70 px-4 py-2 text-sm font-semibold text-neutral-900 shadow-sm">
                                    {user.email}
                                </span>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <Link href="/login" className="inline-flex items-center justify-center rounded-2xl border border-black/10 bg-white/70 px-4 py-2 text-sm font-semibold text-neutral-900 shadow-sm hover:bg-white transition">
                                        Přihlásit se
                                    </Link>
                                    <Link href="/register" className="inline-flex items-center justify-center rounded-2xl bg-neutral-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-neutral-800 transition">
                                        Začít zdarma <span className="ml-2 opacity-80">→</span>
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Mobile Controls (vždy viditelné na mobilu) */}
                        <div className="flex items-center gap-2 md:hidden">
                            {!user && (
                                <Link
                                    href="/register"
                                    className="inline-flex items-center justify-center rounded-2xl bg-neutral-900 px-4 py-2 text-sm font-semibold text-white shadow-sm"
                                >
                                    Začít
                                </Link>
                            )}

                            <button
                                onClick={toggleMenu} // 3. Přidána funkce přepnutí
                                type="button"
                                className="grid h-10 w-10 place-items-center rounded-2xl border border-black/10 bg-white/70 shadow-sm hover:bg-white transition"
                                aria-label="Menu"
                            >
                                <span className="text-xl leading-none">{isOpen ? "✕" : "≡"}</span>
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu Panel (zobrazí se při isOpen === true) */}
                    {isOpen && (
                        <div className="mt-4 flex flex-col gap-2 rounded-2xl border border-black/10 bg-white/80 p-4 shadow-lg md:hidden animate-in fade-in slide-in-from-top-2">
                            <Link href="/" className="px-2 py-2 text-sm font-medium" onClick={toggleMenu}>Úvod</Link>
                            <Link href="/learn" className="px-2 py-2 text-sm font-medium" onClick={toggleMenu}>Učení</Link>
                            <Link href="/about" className="px-2 py-2 text-sm font-medium" onClick={toggleMenu}>Kalendář</Link>
                            <Link href="/about" className="px-2 py-2 text-sm font-medium" onClick={toggleMenu}>O projektu</Link>
                            <hr className="my-2 border-black/5" />
                            {user ? (
                                <div className="px-2 py-2 text-sm font-semibold">{user.email}</div>
                            ) : (
                                <Link href="/login" className="px-2 py-2 text-sm font-semibold" onClick={toggleMenu}>Přihlásit se</Link>
                            )}
                        </div>
                    )}
                </nav>

                <div className="h-[1px] w-full bg-black/10" />
            </div>
        </header>
    );
}