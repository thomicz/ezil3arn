import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

// Prevence vzniku příliš mnoha instancí Prismy v Next.js vývojovém režimu
const globalForPrisma = global as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: NextRequest) {
    try {
        // 1. Kontrola API klíče
        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json({ error: "Chybí API klíč v .env" }, { status: 500 });
        }

        // 2. Autentizace uživatele přes JWT z cookies
        const token = req.cookies.get("session")?.value;
        if (!token) {
            return NextResponse.json({ error: "Nejsi přihlášený. Nelze uložit kvíz." }, { status: 401 });
        }

        let userId: number;
        try {
            // Dekódování tokenu (může obsahovat id, userId nebo sub)
            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;

            // Bezpečné získání ID uživatele a převod na číslo (Prisma vyžaduje Int)
            userId = Number(decoded.id || decoded.userId || decoded.sub);

            if (!userId || isNaN(userId)) {
                return NextResponse.json({
                    error: "V tokenu chybí platné ID uživatele.",
                    obsah_tokenu: decoded
                }, { status: 400 });
            }
        } catch (err) {
            return NextResponse.json({ error: "Neplatná session. Přihlas se znovu." }, { status: 401 });
        }

        // 3. Načtení nahraného souboru
        const formData = await req.formData();
        const file = formData.get("file") as File | null;
        if (!file) {
            return NextResponse.json({ error: "Nebyl nahrán žádný soubor." }, { status: 400 });
        }

        // Převod obrázku na Base64 pro AI
        const bytes = await file.arrayBuffer();
        const base64Data = Buffer.from(bytes).toString("base64");

        // 4. Volání Google Gemini (používáme stabilní flash-lite pro lepší dostupnost)
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

        const prompt = `
        Jsi expert na vzdělávání. Přečti text z přiloženého obrázku.
        Vytvoř výukové materiály a odpověz POUZE ve formátu JSON v češtině. 
        Nepiš žádný text okolo, jen čistý objekt.
        
        Struktura musí být PŘESNĚ tato:
        {
          "notes": "Jeden dlouhý textový řetězec (string) obsahující stručné shrnutí v odrážkách. NEPOUŽÍVEJ OBJEKTY ANI POLE.",
          "flashcards": [
            { "question": "Otázka", "answer": "Odpověď" }
          ],
          "quiz": [
            { 
              "question": "Otázka?", 
              "options": ["A", "B", "C", "D"], 
              "answer": "Správná možnost" 
            }
          ]
        }
        `;

        const result = await model.generateContent([
            prompt,
            { inlineData: { data: base64Data, mimeType: file.type } }
        ]);

        const responseText = result.response.text();

        // Robustní parsování JSONu
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        const cleanJson = jsonMatch ? jsonMatch[0] : responseText;

        let parsedData;
        try {
            parsedData = JSON.parse(cleanJson);
        } catch (e) {
            console.error("Chyba JSON parsování:", responseText);
            return NextResponse.json({ error: "AI vrátilo data v nečitelném formátu." }, { status: 500 });
        }

        // 5. Uložení do databáze k přihlášenému uživateli
        console.log(`DB: Ukládám data pro uživatele s ID ${userId}...`);

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { quizzes: true }
        });

        if (!user) {
            return NextResponse.json({ error: `Uživatel s ID ${userId} nebyl v databázi nalezen.` }, { status: 404 });
        }

        // Zajištění, že máme pole, i když bylo v DB zatím prázdné
        const currentQuizzes = Array.isArray(user.quizzes) ? user.quizzes : [];

        const newQuizEntry = {
            id: crypto.randomUUID(),
            title: "Kvíz ze dne " + new Date().toLocaleDateString("cs-CZ"),
            createdAt: new Date().toISOString(),
            notes: parsedData.notes,
            flashcards: parsedData.flashcards,
            quiz: parsedData.quiz
        };

        await prisma.user.update({
            where: { id: userId },
            data: {
                quizzes: [...currentQuizzes, newQuizEntry]
            }
        });

        console.log("DB: Úspěšně uloženo.");

        // Odeslání dat na frontend
        return NextResponse.json(parsedData);

    } catch (error: any) {
        console.error("SERVER ERROR:", error);
        return NextResponse.json({
            error: "Nastala chyba při zpracování.",
            message: error.message
        }, { status: 500 });
    }
}