import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma"; // Ujisti se, že cesta k prismě je správná
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const { email, password } = data;

        if (!email || !password) {
            return NextResponse.json({ error: "Chybí email nebo heslo." }, { status: 400 });
        }

        if (typeof password !== "string" || password.length < 6) {
            return NextResponse.json({ error: "Heslo musí mít aspoň 6 znaků." }, { status: 400 });
        }

        const existing = await prisma.user.findUnique({ where: { email } });

        if (existing) {
            return NextResponse.json({ error: "Email už je zaregistrovaný." }, { status: 409 });
        }

        const hashed = await bcrypt.hash(password, 10);

        // Vytvoření uživatele - ID se vygeneruje automaticky (autoincrement)
        const newUser = await prisma.user.create({
            data: {
                email,
                password: hashed,
                // name vynecháme úplně, nebo pošleme null, Prisma to zvládne
            },
        });

        console.log("Registrace úspěšná, ID uživatele:", newUser.id);

        return NextResponse.json({ ok: true, userId: newUser.id }, { status: 201 });
    }
    catch (e: any) {
        // Tady vypíšeme skutečnou chybu do konzole serveru
        console.error("CHYBA PŘI REGISTRACI:", e);

        // Vrátíme detailnější chybu pro tebe na ladění
        return NextResponse.json({
            error: "Chyba při ukládání do DB.",
            details: e.message
        }, { status: 500 });
    }
}