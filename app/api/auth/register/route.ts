import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    try {
        //Zde uložím data z formuláře do proměnných
        const data = await req.json();

        const email = data.email;
        const password = data.password;

        //Zkontroluji, zda email, či heslo je vůbec zadané
        if (!email || !password) {
            return NextResponse.json({ error: "Chybí email nebo heslo." }, { status: 400 });
        }

        //Zkontroluji minimální délku hesla a zda je to string
        if (typeof password !== "string" || password.length < 6) {
            return NextResponse.json({ error: "Heslo musí mít aspoň 6 znaků." }, { status: 400 });
        }
        //Zjistím, zda uživatel již není zaregistrovaný v databázi
        const existing = await prisma.user.findUnique({ where: { email } });

        //Pokud je uživatel již zaregistrovaný, tak mu nepovolím registraci
        if (existing) {
            return NextResponse.json({ error: "Email už je zaregistrovaný." }, { status: 409 });
        }

        //Zahashuju heslo
        const hashed = await bcrypt.hash(password, 10);

        //Přidám  uživatele do databáze
        await prisma.user.create({
            data: { email, password: hashed },
        });

        //Pokud se vše podaří, tak vrátím 201
        return NextResponse.json({ ok: true }, { status: 201 });
    }
    catch (e) {
        //Pokud se něco pokazí, tak vrátím "Server error."
        return NextResponse.json({ error: "Server error." }, { status: 500 });
    }
}
