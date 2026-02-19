import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request)
{
    const { email, password } = await req.json();

    //Zkontroluji, zda je vůbec email nebo heslo vyplněné
    if (!email || !password)
    {
        return NextResponse.json({ error: "Chybí email nebo heslo." }, { status: 400 });
    }

    //Hledám v databázi, zda uživatel vůbec existuje a uložím ho do user
    const user = await prisma.user.findUnique({
        where: { email },
        select: { id: true, email: true, password: true },
    });

    //Pokud uživatel neexistuje, vrátím chybu
    if (!user)
    {
        return NextResponse.json({ error: "Špatný email nebo heslo." }, { status: 401 });
    }

    //Zjistím, zda se shoduje zadané heslo s heslem v databázi
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    //Pokud se heslo neshoduje, tak vrátím chybu
    if (!isPasswordCorrect)
    {
        return NextResponse.json({ error: "Špatný email nebo heslo." }, { status: 401 });
    }

    // JWT token (obsahuje jen minimum)
    const token = jwt.sign(
        { sub: user.id, email: user.email },
        process.env.JWT_SECRET!,
        { expiresIn: "7d" }
    );

    const res = NextResponse.json({ ok: true });

    res.cookies.set({
        name: "session",
        value: token,
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 dní
    });

    return res;
}
