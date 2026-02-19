import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET() {
    try {
        const count = await prisma.user.count();
        console.log(count);
        console.log("ahofsdfh");

        return NextResponse.json({ count });
    } catch (e) {
        return NextResponse.json({ error: "DB error" }, { status: 500 });
    }
}
