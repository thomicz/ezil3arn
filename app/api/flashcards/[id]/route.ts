import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

// Upravili jsme typ params na Promise
export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        // 0. V Next.js 15+ MUSÍŠ params "vybalit" pomocí await
        const { id } = await params;
        const quizIdFromUrl = id;

        // 1. Získání tokenu
        const token = req.cookies.get("session")?.value;
        if (!token) {
            return NextResponse.json({ error: "Neautorizovaný přístup" }, { status: 401 });
        }

        // 2. Ověření tokenu
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET!);
        } catch (error) {
            return NextResponse.json({ error: "Neplatný token" }, { status: 401 });
        }

        const userId = (decoded as any).sub;
        if (!userId) {
            return NextResponse.json({ error: "Token neobsahuje ID uživatele" }, { status: 400 });
        }

        // 3. Stáhneme uživatele a jeho kvízy
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { quizzes: true },
        });

        if (!user || !user.quizzes) {
            return NextResponse.json({ error: "Uživatel nebo kvízy nenalezeny" }, { status: 404 });
        }

        // 4. Filtrace v JSONu
        const allQuizzes = user.quizzes as any[];

        // Debugging: Tady uvidíš, co se s čím porovnává
        console.log("Hledám ID z URL:", quizIdFromUrl);

        const foundQuiz = allQuizzes.find((q: any) => q.id === quizIdFromUrl);

        if (!foundQuiz) {
            // Pokud to stále hází 404, koukni do konzole na log výše
            return NextResponse.json({ error: "Konkrétní kvíz nebyl nalezen" }, { status: 404 });
        }

        return NextResponse.json(foundQuiz);

    } catch (error) {
        console.error("Chyba při načítání kvízu z DB:", error);
        return NextResponse.json(
            { error: "Nepodařilo se načíst kvíz ze serveru" },
            { status: 500 }
        );
    }
}