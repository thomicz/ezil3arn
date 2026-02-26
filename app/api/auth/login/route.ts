import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Hlavní endpoint pro přihlášení
export async function POST(req: Request) {

    // Získám data z requestu (email a heslo)
    const data = await req.json();

    const email = data.email;
    const password = data.password;

    // Zkontroluji, zda je vůbec email nebo heslo vyplněné
    if (!email || !password) {
        return NextResponse.json({ error: "Chybí email nebo heslo." }, { status: 400 });
    }

    // Hledám v databázi, zda uživatel vůbec existuje a uložím ho do user
    const user = await prisma.user.findUnique({
        where: { email },
        select: { id: true, email: true, password: true },
    });

    // Pokud uživatel neexistuje, vrátím chybu
    if (!user){
        return NextResponse.json({ error: "Špatný email nebo heslo." }, { status: 401 });
    }

    // Zjistím, zda se shoduje zadané heslo s heslem v databázi
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    // Pokud se heslo neshoduje, tak vrátím chybu
    if (!isPasswordCorrect) {
        return NextResponse.json({ error: "Špatný email nebo heslo." }, { status: 401 });
    }

    // JWT token (obsahuje jen minimum - id a email)
    const token = jwt.sign(
        { sub: user.id, email: user.email },
        process.env.JWT_SECRET!,   // tajný klíč musí být v .env
        { expiresIn: "7d" }        // token platný 7 dní
    );

    // Vytvořím response a nastavím cookie s tokenem
    const res = NextResponse.json({ ok: true, message: "Přihlášení úspěšné" });

    res.cookies.set({
        name: "session",                   // název cookie
        value: token,                       // JWT token
        httpOnly: true,                     // nelze číst z JS
        sameSite: "lax",                    // ochrana proti CSRF
        secure: process.env.NODE_ENV === "production", // https v produkci
        path: "/",                          // cookie platí pro celou doménu
        maxAge: 60 * 60 * 24 * 7,           // 7 dní
    });

    // Vrátím response uživateli
    return res;
}