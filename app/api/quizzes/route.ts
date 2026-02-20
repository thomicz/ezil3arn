import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // ať se to nechová jako cache

export async function GET() {
    return NextResponse.json({
        title: "Test – TypeScript & Next.js",
        questions: [
            {
                id: 1,
                type: "mcq",
                question: "Jaký je hlavní rozdíl mezi .ts a .tsx?",
                options: [
                    ".ts je jen pro CSS",
                    ".tsx podporuje JSX, .ts ne",
                    ".tsx je jen pro backend",
                    "Není mezi nimi rozdíl",
                ],
                answerIndex: 1,
                explanation: ".tsx soubory dovolují psát JSX (typicky React).",
            },
            {
                id: 2,
                type: "tf",
                question: "V Next.js App Routeru vytvoříš route pro /api/foo jako app/api/foo/route.ts.",
                answer: true,
                explanation: "Přesně tak – v App Routeru se API routy dělají přes route.ts.",
            },
            {
                id: 3,
                type: "mcq",
                question: "Kdy potřebuješ v komponentě použít 'use client'?",
                options: [
                    "Vždy, ve všech souborech",
                    "Jen když chceš Tailwind",
                    "Když používáš React hooky nebo DOM eventy",
                    "Jen v route.ts",
                ],
                answerIndex: 2,
                explanation: "Hooky (useState/useEffect) a eventy jsou na clientu.",
            },
            {
                id: 4,
                type: "short",
                question: "Jak se jmenuje soubor stránky v Next.js App Routeru (např. /learn/upload)?",
                answer: "page.tsx",
                explanation: "Stránky jsou v App Routeru definované přes page.tsx.",
            },
            {
                id: 5,
                type: "tf",
                question: "API klíč pro OpenAI je bezpečné uložit do frontendu (např. do Reactu).",
                answer: false,
                explanation: "Ne – klíč musí být na backendu, jinak ho někdo vytáhne z bundle.",
            },
        ],
    });
}