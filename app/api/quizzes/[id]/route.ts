import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

// Všimni si, že používám NextRequest místo Request.
// NextRequest má super pomocné metody pro práci s cookies.
export async function GET(req: NextRequest) {
    try {
        // 1. Získání tokenu (NextRequest nám to dost usnadňuje)
        const token = req.cookies.get("session")?.value;

        if (!token) {
            return NextResponse.json({ error: "Neautorizovaný přístup" }, { status: 401 });
        }

        // 2. Ověření tokenu
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET!);
        } catch (error) {
            // Pokud token vypršel nebo je upravený

            return NextResponse.json({ error: "Neplatný token" }, { status: 401 });
        }

        // 3. Získání ID uživatele z tokenu
        // POZOR: Tady záleží na tom, jak přesně jsi token vytvořil při přihlašování!
        // Předpokládám, že jsi do payloadu uložil 'id' (např. jwt.sign({ id: user.id }, secret))
        const userId = (decoded as any).sub;

        if (!userId) {
            return NextResponse.json({ error: "Token neobsahuje ID uživatele" }, { status: 400 });
        }

        // 4. Teď už víme, kdo je přihlášený -> stáhneme jeho kvízy z DB
        const user = await prisma.user.findUnique({
            where: {
                id: userId, // Zde použijeme dynamické ID z tokenu
            },
            select: {
                quizzes: true,
            },
        });

        if (!user) {
            return NextResponse.json({ error: "Uživatel nenalezen" }, { status: 404 });
        }

        // Vrátíme kvízy konkrétního uživatele
        return NextResponse.json(user.quizzes);

    } catch (error) {
        console.error("Chyba při načítání kvízů z DB:", error);
        return NextResponse.json(
            { error: "Nepodařilo se načíst kvízy ze serveru" },
            { status: 500 }
        );
    }
}