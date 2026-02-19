import { prisma } from "../../lib/prisma";


export async function GET() {
    const users = await prisma.user.findMany({
        orderBy: { id: "asc" },
    });
    return Response.json(users);
}

export async function POST(req: Request) {
    const body = await req.json();
    const { email, name } = body;

    if (!email) {
        return new Response("email is required", { status: 400 });
    }

    const user = await prisma.user.create({
        data: {
            email,
            name,
            password: "", // jen dočasně, pokud zatím nehashuješ
        },
    });


    return Response.json(user, { status: 201 });
}
