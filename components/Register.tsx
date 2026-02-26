"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [msg, setMsg] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setMsg(null);

        if (password !== confirm) {
            setMsg("Hesla se neshodují.");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                setMsg(data?.error ?? "Registrace se nepovedla.");
                return;
            }

            router.push("/login");
        } catch {
            setMsg("Chyba připojení.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={onSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-1">
                <label className="text-xs font-medium text-neutral-700">Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="např. tomas@email.cz"
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
                    placeholder="min. 6–8 znaků"
                    className="w-full rounded-2xl border border-black/10 bg-white/70 px-4 py-3 text-sm text-neutral-900 shadow-sm outline-none placeholder:text-neutral-400 focus:border-black/20 focus:ring-4 focus:ring-black/5 transition"
                    required
                />
            </div>

            {/* Confirm */}
            <div className="space-y-1">
                <label className="text-xs font-medium text-neutral-700">Potvrdit heslo</label>
                <input
                    type="password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    placeholder="zopakuj heslo"
                    className="w-full rounded-2xl border border-black/10 bg-white/70 px-4 py-3 text-sm text-neutral-900 shadow-sm outline-none placeholder:text-neutral-400 focus:border-black/20 focus:ring-4 focus:ring-black/5 transition"
                    required
                />
            </div>

            {/* Message */}
            {msg && (
                <div className="rounded-2xl border border-black/10 bg-white/70 px-4 py-3 text-sm text-neutral-700 shadow-sm">
                    {msg}
                </div>
            )}

            {/* Button */}
            <button
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl bg-neutral-900 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-neutral-800 hover:shadow-md disabled:opacity-60 disabled:hover:bg-neutral-900 transition"
            >
                {loading ? "Registruji…" : "Registruj se"}
            </button>

            <p className="text-center text-xs text-neutral-500">
                Registrací souhlasíš s podmínkami používání.
            </p>
        </form>
    );
}
