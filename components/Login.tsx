"use client";

import { useState } from "react";

export default function LoginForm() {

    const state = useState("");
    const email = state[0];
    const setEmail = state[1];

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

            setMsg("Přihlášení proběhlo úspěšně");
            // později: router.push("/dashboard")
        }
        catch {
            setMsg("Nepodařilo se připojit k serveru");
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm mb-1">Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@example.com"
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                    required
                />
            </div>

            <div>
                <label className="block text-sm mb-1">Heslo</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                    required
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white rounded py-2 disabled:opacity-60"
            >
                {loading ? "Přihlašuji…" : "Přihlásit se"}
            </button>

            {msg && <p className="text-sm">{msg}</p>}
        </form>
    );
}
