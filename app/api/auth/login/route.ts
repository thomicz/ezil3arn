import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function POST(req: Request) {
    const { email, password } = await req.json();

    if (!email || !password) {
        return NextResponse.json(
            { error: "Chybí email nebo heslo." },
            { status: 400 }
        );
    }

    const user = await prisma.user.findUnique({
        where: { email },
        select: { id: true, email: true, password: true },
    });

    if (!user || user.password !== password) {
        return NextResponse.json(
            { error: "Špatný email nebo heslo." },
            { status: 401 }
        );
    }

    // zatím jen “funguje login” – bez session/cookies
    return NextResponse.json({ ok: true, user: { id: user.id, email: user.email } });
}
