import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { PrismaClient } from "@prisma/client";
import { isAuthenticated } from "@/lib/auth";
import {Int} from "effect/Schema";

// Prevence vzniku příliš mnoha instancí Prismy v Next.js vývojovém režimu
const globalForPrisma = global as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: NextRequest) {
    try {
        let userID = isAuthenticated(req);

        //Pokud je uživatel přihlášený
        if (userID != null) {

            const { searchParams } = new URL(req.url);
            const subjectIdRaw = searchParams.get("id");

            if (!subjectIdRaw) {
                return NextResponse.json({ error: "Chybí ID předmětu v URL." }, { status: 400 });
            }

            const subjectId = parseInt(subjectIdRaw);

            if (!process.env.GEMINI_API_KEY) {
                return NextResponse.json({error: "Chybí API klíč v .env"}, {status: 500});
            }

            // Načtení nahraného souboru
            const formData = await req.formData();
            const file = formData.get("file") as File | null;

            if (!file) {
                return NextResponse.json({error: "Nebyl nahrán žádný soubor."}, {status: 400});
            }

            // Převod obrázku na Base64 pro AI
            const bytes = await file.arrayBuffer();
            const base64Data = Buffer.from(bytes).toString("base64");

            // Volání Google Gemini
            const model = genAI.getGenerativeModel({model: "gemini-2.5-flash-lite"});

            const prompt = `
        Jsi expert na vzdělávání. Přečti text z přiloženého obrázku.
        Vytvoř výukové materiály a odpověz POUZE ve formátu JSON v češtině. 
        Nepiš žádný text okolo, jen čistý objekt.
        
        Struktura musí být PŘESNĚ tato:
        {
          "title": "Stručný název, který popisuje obsah",
          "notes": "Jeden dlouhý textový řetězec (string) obsahující stručné shrnutí v odrážkách. NEPOUŽÍVEJ OBJEKTY ANI POLE.",
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
                {inlineData: {data: base64Data, mimeType: file.type}}
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
                return NextResponse.json({error: "AI vrátilo data v nečitelném formátu."}, {status: 500});
            }

            console.log(`DB: Ukládám kvíz pro uživatele ${userID} do předmětu ${subjectId}...`);

            const newQuiz = await prisma.quiz.create({
                data: {
                    title: parsedData.title,
                    notes: parsedData.notes,
                    quizData: parsedData.quiz,
                    userId: userID,
                    subjectId: subjectId
                }
            });

            console.log("DB: Úspěšně uloženo do tabulky Quiz.");

            // Odeslání dat na frontend
            return NextResponse.json(parsedData);
        } else {
            // Případ, kdy isAuthenticated vrátí null
            return NextResponse.json({error: "Neautorizovaný přístup."}, {status: 401});
        }
    } catch (error: any) {
        console.error("SERVER ERROR:", error);
        return NextResponse.json({
            error: "Nastala chyba při zpracování.",
            message: error.message
        }, {status: 500});
    }
}