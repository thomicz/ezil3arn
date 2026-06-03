"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useAuth from "../app/hooks/useAuth";

// ---------------------------------------------------------------------------
// UserDropdown — přihlášený uživatel s rozbalovacím menu
// ---------------------------------------------------------------------------
function UserDropdown({
                          email,
                          onSignOut
                      }: {
    email: string;
    onSignOut: () => void;
}) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const router = useRouter();

    // Zavřít při kliknutí mimo
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const initials = email.slice(0, 2).toUpperCase();

    return (
        <div ref={ref} className="relative">
            <button
                onClick={() => setOpen((v) => !v)}
                className="user-btn group flex items-center gap-2 rounded-2xl border border-black/10 bg-white/70 px-3 py-2 shadow-sm transition hover:bg-white hover:shadow-md"
            >
                {/* Avatar */}
                <span className="avatar grid h-7 w-7 place-items-center rounded-xl bg-linear-to-br from-indigo-500 to-violet-500 text-xs font-bold text-white shadow-inner">
                    {initials}
                </span>

                <span className="max-w-35 truncate text-sm font-semibold text-neutral-800">
                    {email}
                </span>

                {/* Chevron */}
                <svg
                    className={`ml-0.5 h-3.5 w-3.5 text-neutral-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                    viewBox="0 0 12 12"
                    fill="none"
                >
                    <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>

            {/* Dropdown panel */}
            {open && (
                <div className="dropdown absolute right-0 top-[calc(100%+8px)] z-50 w-52 origin-top-right animate-dropdown overflow-hidden rounded-2xl border border-black/10 bg-white/95 shadow-xl backdrop-blur-xl">
                    {/* Header */}
                    <div className="border-b border-black/5 px-4 py-3">
                        <p className="text-[11px] font-medium uppercase tracking-widest text-neutral-400">Přihlášen jako</p>
                        <p className="mt-0.5 truncate text-sm font-semibold text-neutral-800">{email}</p>
                    </div>

                    {/* Items */}
                    <div className="p-1.5">
                        <Link
                            href="/profile"
                            onClick={() => setOpen(false)}
                            className="dropdown-item flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-neutral-700 transition hover:bg-neutral-50"
                        >
                            <span className="grid h-7 w-7 place-items-center rounded-lg bg-neutral-100 text-neutral-500">
                                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none">
                                    <circle cx="8" cy="5.5" r="2.5" stroke="currentColor" strokeWidth="1.4" />
                                    <path d="M2.5 13c0-2.485 2.462-4.5 5.5-4.5s5.5 2.015 5.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                                </svg>
                            </span>
                            Profil
                        </Link>

                        <Link
                            href="/settings"
                            onClick={() => setOpen(false)}
                            className="dropdown-item flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-neutral-700 transition hover:bg-neutral-50"
                        >
                            <span className="grid h-7 w-7 place-items-center rounded-lg bg-neutral-100 text-neutral-500">
                                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none">
                                    <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.4" />
                                    <path d="M8 1v1.5M8 13.5V15M1 8h1.5M13.5 8H15M2.929 2.929l1.06 1.06M12.01 12.01l1.06 1.06M2.929 13.071l1.06-1.06M12.01 3.99l1.06-1.06" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                                </svg>
                            </span>
                            Nastavení
                        </Link>
                    </div>

                    {/* Sign out */}
                    <div className="border-t border-black/5 p-1.5">
                        <button
                            onClick={onSignOut}
                            className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50"
                        >
                            <span className="grid h-7 w-7 place-items-center rounded-lg bg-red-50 text-red-400">
                                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none">
                                    <path d="M6 2H3a1 1 0 00-1 1v10a1 1 0 001 1h3M10 11l3-3-3-3M13 8H6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </span>
                            Odhlásit se
                        </button>
                    </div>
                </div>
            )}

            <style jsx>{`
                @keyframes dropdown {
                    from { opacity: 0; transform: scale(0.96) translateY(-4px); }
                    to   { opacity: 1; transform: scale(1)    translateY(0); }
                }
                .animate-dropdown { animation: dropdown 0.15s cubic-bezier(0.16,1,0.3,1) both; }
            `}</style>
        </div>
    );
}

// ---------------------------------------------------------------------------
// Navbar
// ---------------------------------------------------------------------------
export default function Navbar() {
    const router = useRouter();

    const handleSignOut = async () => {
        await fetch('..//api/auth/logout', {
            method: 'POST'
        });

        router.push('/');
        router.refresh();
    };

    const { user, loading } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const toggleMenu = () => setIsOpen((v) => !v);

    // Přidáme stín při scrollování
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const navLinks = [
        { href: "/",        label: "Úvod" },
        { href: "/learn",   label: "Učení" },
        { href: "/calendar",label: "Kalendář" },
        { href: "/about",   label: "O projektu" },
    ];

    return (
        <header className={`sticky top-0 z-50 w-full transition-shadow duration-300 ${scrolled ? "shadow-[0_2px_24px_rgba(0,0,0,0.06)]" : ""}`}>
            <div className="bg-white/65 backdrop-blur-2xl supports-backdrop-filter:bg-white/55">
                {/* top accent line */}
                <div className="h-[1.5px] w-full bg-gradient-to-r from-indigo-400 via-violet-400 to-pink-400 opacity-70" />

                <nav className="mx-auto max-w-6xl px-5 py-3.5">
                    <div className="flex items-center justify-between">

                        {/* ── Brand ── */}
                        <Link href="/" className="group flex items-center gap-3">
                            <span className="relative grid h-9 w-9 place-items-center rounded-xl border border-black/10 bg-white/80 shadow-sm transition duration-200 group-hover:shadow-[0_0_0_3px_rgba(99,102,241,0.15)]">
                                <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-linear-to-br from-indigo-400 to-pink-400" />
                                <span className="text-[13px] font-black tracking-tight text-neutral-900">SC</span>
                            </span>
                            <span className="text-[15px] font-bold tracking-tight text-neutral-900 sm:text-base">
                                StudujChytře<span className="font-medium text-neutral-400">.cz</span>
                            </span>
                        </Link>

                        {/* ── Desktop nav ── */}
                        <div className="hidden items-center gap-2.5 md:flex">
                            {/* Links pill */}
                            <div className="flex items-center gap-0.5 rounded-2xl border border-black/8 bg-white/60 p-1 shadow-sm">
                                {navLinks.map(({ href, label }) => (
                                    <Link
                                        key={href + label}
                                        href={href}
                                        className="rounded-xl px-3.5 py-1.5 text-[13px] font-medium text-neutral-600 transition hover:bg-black/5 hover:text-neutral-900"
                                    >
                                        {label}
                                    </Link>
                                ))}
                            </div>

                            <div className="h-5 w-px bg-black/10" />

                            {/* Auth area */}
                            {loading ? (
                                <div className="h-9 w-24 animate-pulse rounded-2xl bg-black/5" />
                            ) : user ? (
                                <UserDropdown
                                    email={user.email ?? ""}
                                    onSignOut={handleSignOut}
                                />
                            ) : (
                                <div className="flex items-center gap-2">
                                    <Link
                                        href="/login"
                                        className="rounded-2xl border border-black/10 bg-white/70 px-4 py-2 text-[13px] font-semibold text-neutral-800 shadow-sm transition hover:bg-white hover:shadow-md"
                                    >
                                        Přihlásit se
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="group flex items-center gap-1.5 rounded-2xl bg-neutral-900 px-4 py-2 text-[13px] font-semibold text-white shadow-sm transition hover:bg-neutral-800"
                                    >
                                        Začít zdarma
                                        <span className="transition-transform group-hover:translate-x-0.5">→</span>
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* ── Mobile controls ── */}
                        <div className="flex items-center gap-2 md:hidden">
                            {!loading && !user && (
                                <Link
                                    href="/register"
                                    className="rounded-xl bg-neutral-900 px-3.5 py-2 text-[13px] font-semibold text-white"
                                >
                                    Začít
                                </Link>
                            )}
                            <button
                                onClick={toggleMenu}
                                type="button"
                                aria-label="Přepnout menu"
                                className="grid h-9 w-9 place-items-center rounded-xl border border-black/10 bg-white/70 shadow-sm transition hover:bg-white"
                            >
                                {isOpen ? (
                                    <svg viewBox="0 0 14 14" className="h-3.5 w-3.5" fill="none">
                                        <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                                    </svg>
                                ) : (
                                    <svg viewBox="0 0 14 14" className="h-3.5 w-3.5" fill="none">
                                        <path d="M1 3.5h12M1 7h12M1 10.5h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* ── Mobile menu panel ── */}
                    {isOpen && (
                        <div className="mt-3 overflow-hidden rounded-2xl border border-black/8 bg-white/90 shadow-xl backdrop-blur-xl md:hidden">
                            <div className="p-2">
                                {navLinks.map(({ href, label }) => (
                                    <Link
                                        key={href + label}
                                        href={href}
                                        onClick={toggleMenu}
                                        className="flex items-center rounded-xl px-3 py-2.5 text-[14px] font-medium text-neutral-700 transition hover:bg-black/5"
                                    >
                                        {label}
                                    </Link>
                                ))}
                            </div>

                            <div className="border-t border-black/5 p-2">
                                {loading ? null : user ? (
                                    <>
                                        <div className="flex items-center gap-3 px-3 py-2.5">
                                            <span className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 text-xs font-bold text-white">
                                                {user.email?.slice(0, 2).toUpperCase()}
                                            </span>
                                            <span className="truncate text-sm font-semibold text-neutral-800">{user.email}</span>
                                        </div>
                                        <Link
                                            href="/profile"
                                            onClick={toggleMenu}
                                            className="flex items-center rounded-xl px-3 py-2.5 text-[14px] font-medium text-neutral-700 transition hover:bg-black/5"
                                        >
                                            Profil
                                        </Link>
                                        <button
                                            onClick={handleSignOut}
                                            className="flex w-full items-center rounded-xl px-3 py-2.5 text-[14px] font-medium text-red-500 transition hover:bg-red-50"
                                        >
                                            Odhlásit se
                                        </button>
                                    </>
                                ) : (
                                    <Link
                                        href="/login"
                                        onClick={toggleMenu}
                                        className="flex items-center rounded-xl px-3 py-2.5 text-[14px] font-semibold text-neutral-800 transition hover:bg-black/5"
                                    >
                                        Přihlásit se
                                    </Link>
                                )}
                            </div>
                        </div>
                    )}
                </nav>

                <div className="h-px w-full bg-black/8" />
            </div>
        </header>
    );
}