import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: "Chybí email nebo heslo." }, { status: 400 });
        }

        if (typeof password !== "string" || password.length < 6) {
            return NextResponse.json({ error: "Heslo musí mít aspoň 6 znaků." }, { status: 400 });
        }

        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing) {
            return NextResponse.json({ error: "Email už je zaregistrovaný." }, { status: 409 });
        }

        const hashed = await bcrypt.hash(password, 10);

        await prisma.user.create({
            data: { email, password: hashed },
        });

        return NextResponse.json({ ok: true }, { status: 201 });
    } catch (e) {
        return NextResponse.json({ error: "Server error." }, { status: 500 });
    }
}
