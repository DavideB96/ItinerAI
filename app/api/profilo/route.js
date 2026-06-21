import { auth } from "../../../auth";
import { prisma } from "../../../lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
  }

  const { name, interests } = await request.json();

  const updated = await prisma.user.update({
    where: { id: session.user.id },
    data: { name, interests },
  });

  return NextResponse.json({ ok: true, user: { name: updated.name, city: updated.city, interests: updated.interests } });
}