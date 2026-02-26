import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: Request) {
    //Zíkám cookie
    const cookie = req.headers.get("cookie");

    //Vyextrahuju si samotný token
    const token = cookie?.split("; ").find(c => c.startsWith("session="))?.split("=")[1];

    //Pokud token neexstuje, tak vratím false
    if (!token){
        return NextResponse.json({ loggedIn: false });
    }

    //Zkontroluje, zda je token platný
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        return NextResponse.json({ loggedIn: true, user: decoded });
    }
    catch {
        return NextResponse.json({ loggedIn: false });
    }
}