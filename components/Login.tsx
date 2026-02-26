"use client";

import { useState } from "react";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setMsg(null);
        setLoading(true);

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                setMsg(data.error ?? "Špatné přihlašovací údaje");
                return;
            }

            setMsg("Přihlášení proběhlo úspěšně ✅");
            // později: router.push("/dashboard")
        } catch {
            setMsg("Nepodařilo se připojit k serveru.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-1">
                <label className="text-xs font-medium text-neutral-700">Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="např. email@email.cz"
                    className="w-full rounded-2xl border border-black/10 bg-white/70 px-4 py-3 text-sm text-neutral-900 shadow-sm outline-none placeholder:text-neutral-400 focus:border-black/20 focus:ring-4 focus:ring-black/5 transition"
                    required
                />
            </div>

            {/* Password */}
            <div className="space-y-1">
                <label className="text-xs font-medium text-neutral-700">Heslo</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-2xl border border-black/10 bg-white/70 px-4 py-3 text-sm text-neutral-900 shadow-sm outline-none placeholder:text-neutral-400 focus:border-black/20 focus:ring-4 focus:ring-black/5 transition"
                    required
                />
            </div>

            {/* Button */}
            <button
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl bg-neutral-900 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-neutral-800 hover:shadow-md disabled:opacity-60 disabled:hover:bg-neutral-900 transition"
            >
                {loading ? "Přihlašuji…" : "Přihlásit se"}
            </button>

            {/* Message */}
            {msg && (
                <div className="rounded-2xl border border-black/10 bg-white/70 px-4 py-3 text-sm text-neutral-700 shadow-sm">
                    {msg}
                </div>
            )}
        </form>
    );
}
