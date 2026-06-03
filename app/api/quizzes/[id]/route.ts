// app/api/quizzes/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    // 1. Token z cookie
    const token = req.cookies.get("session")?.value;
    if (!token) {
        return NextResponse.json({ error: "Neautorizovaný přístup" }, { status: 401 });
    }

    // 2. Ověření JWT
    let decoded: jwt.JwtPayload;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload;
    } catch {
        return NextResponse.json({ error: "Neplatný token" }, { status: 401 });
    }

    const userId = Number(decoded.sub);
    if (!userId) {
        return NextResponse.json({ error: "Token neobsahuje ID uživatele" }, { status: 400 });
    }

    // 3. Vybalíme id z params (Next.js 15+)
    const { id } = await params;

    // 4. Načteme konkrétní kvíz — zároveň ověříme že patří přihlášenému uživateli
    try {
        const quiz = await prisma.quiz.findUnique({
            where: { id },
            include: { subject: true },
        });

        if (!quiz) {
            return NextResponse.json({ error: "Kvíz nenalezen" }, { status: 404 });
        }

        // Ochrana — kvíz patří jinému uživateli
        if (quiz.userId !== userId) {
            return NextResponse.json({ error: "Přístup odepřen" }, { status: 403 });
        }

        return NextResponse.json(quiz);
    } catch (error) {
        console.error("GET /api/quizzes/[id] error:", error);
        return NextResponse.json({ error: "Nepodařilo se načíst kvíz." }, { status: 500 });
    }
}