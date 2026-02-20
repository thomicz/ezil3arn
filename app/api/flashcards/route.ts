import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // aby se to v dev/prod nechovalo jako cache

export async function GET() {
    // Testovací data – později nahradíš tím, co budeš generovat z backendu
    const cards = [
        {
            id: 1,
            question: "Jaký je rozdíl mezi .ts a .tsx?",
            answer: ".tsx dovoluje JSX (např. React), .ts je TypeScript bez JSX.",
        },
        {
            id: 2,
            question: "Kdy v Next.js potřebuju 'use client'?",
            answer: "Když používáš React hooky (useState/useEffect) nebo DOM eventy v komponentě.",
        },
        {
            id: 3,
            question: "Jak vytvořím stránku /learn/upload v App Routeru?",
            answer: "Vytvoř app/learn/upload/page.tsx.",
        },
        {
            id: 4,
            question: "Co je API route v Next.js App Routeru?",
            answer: "Soubor app/api/<nazev>/route.ts, který exportuje funkce jako GET/POST.",
        },
        {
            id: 5,
            question: "Jaký JSON formát očekává FlashcardDeck?",
            answer: "Pole objektů: [{ question: string, answer: string }].",
        },
    ];

    return NextResponse.json(cards);
}