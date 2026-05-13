import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    try {
        const token = req.cookies.get("session")?.value;

        if (!token) {
            return NextResponse.json(
                { error: "Neautorizovaný přístup" },
                { status: 401 }
            );
        }

        let decoded;

        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET!);
        } catch {
            return NextResponse.json(
                { error: "Neplatný token" },
                { status: 401 }
            );
        }

        const userId = (decoded as any).sub;

        if (!userId) {
            return NextResponse.json(
                { error: "Token neobsahuje ID uživatele" },
                { status: 400 }
            );
        }

        // 👇 query param
        const { searchParams } = new URL(req.url);
        const subjectIdParam = searchParams.get("subjectId");

        // 🔥 FIX: string -> number
        const subjectId = subjectIdParam
            ? Number(subjectIdParam)
            : undefined;

        const quizzes = await prisma.quiz.findMany({
            where: {
                userId,
                ...(subjectId !== undefined && !isNaN(subjectId)
                    ? { subjectId }
                    : {}),
            },
        });

        return NextResponse.json(quizzes);

    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json(
            { error: "Nepodařilo se načíst kvízy ze serveru" },
            { status: 500 }
        );
    }
}