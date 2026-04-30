import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function isAuthenticated(req: NextRequest): number | null {
    const token = req.cookies.get("session")?.value;

    if (!token) {
        return null;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
        const userId = Number(decoded.id || decoded.userId || decoded.sub);

        if (!userId || isNaN(userId)) {
            return null;
        }

        return userId;
    }
    catch (error) {
        console.error("JWT Auth Error:", error);
        return null;
    }
}