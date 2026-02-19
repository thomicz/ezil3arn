import Link from "next/link";
import RegisterForm from "@/components/Register";

export default function RegisterPage() {
    return (
        <section className="relative overflow-hidden bg-white text-neutral-900">
            {/* background decoration */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 blur-3xl opacity-40" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_55%,transparent_80%)]" />
            </div>

            <div className="relative mx-auto flex min-h-[calc(100vh-72px)] max-w-6xl items-center justify-center px-6 py-12">
                <div className="w-full max-w-md">
                    {/* header */}
                    <div className="mb-6 text-center">
                        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm text-neutral-700 shadow-sm backdrop-blur">
              <span className="inline-flex h-6 items-center rounded-full bg-neutral-900 px-2 text-xs font-semibold text-white">
                Register
              </span>
                            <span className="font-medium">Vytvoř si účet</span>
                        </div>

                        <h1 className="mt-5 text-3xl font-extrabold tracking-tight">
                            Registrace
                        </h1>

                        <p className="mt-2 text-sm text-neutral-600">
                            Začni zdarma a měj učení pod kontrolou.
                        </p>
                    </div>

                    {/* card */}
                    <div className="rounded-3xl border border-black/10 bg-white/70 p-6 shadow-sm backdrop-blur">
                        <RegisterForm />

                        <div className="mt-5 flex items-center justify-between text-sm">
                            <Link
                                href="/login"
                                className="text-neutral-700 hover:text-neutral-900 hover:underline"
                            >
                                Už máš účet? Přihlas se
                            </Link>

                            <Link
                                href="/"
                                className="text-neutral-500 hover:text-neutral-700 hover:underline"
                            >
                                Zpět na úvod
                            </Link>
                        </div>
                    </div>

                    <p className="mt-6 text-center text-xs text-neutral-500">
                        Registrací souhlasíš s podmínkami používání a zásadami soukromí.
                    </p>
                </div>
            </div>
        </section>
    );
}
