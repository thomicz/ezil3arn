import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { prisma } from "../../../lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET!;
if (!JWT_SECRET) throw new Error("Chybí JWT_SECRET v .env");

export async function GET() {
    const token = (await cookies()).get("session")?.value; // ✅ await
    if (!token) return NextResponse.json({ loggedIn: false });

    try {
        const payload = jwt.verify(token, JWT_SECRET) as { sub: number | string };
        const userId = Number(payload.sub);
        if (!userId) return NextResponse.json({ loggedIn: false });

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { id: true, email: true, name: true },
        });

        if (!user) return NextResponse.json({ loggedIn: false }); // ✅ správně

        return NextResponse.json({ loggedIn: true, user });
    } catch {
        return NextResponse.json({ loggedIn: false });
    }
}
