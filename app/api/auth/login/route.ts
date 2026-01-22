import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { email, password } = await req.json();

    if (email === "test@test.cz" && password === "1234") {
        return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ error: "Špatný email nebo heslo." }, { status: 401 });
}
