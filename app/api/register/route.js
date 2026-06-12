import { prisma } from "../../../lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();

    if (!email || !password || password.length < 8) {
      return Response.json(
        { error: "Email obbligatoria e password di almeno 8 caratteri." },
        { status: 400 }
      );
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return Response.json({ error: "Email già registrata." }, { status: 409 });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashed },
    });

    return Response.json({ id: user.id, email: user.email }, { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Errore del server." }, { status: 500 });
  }
}