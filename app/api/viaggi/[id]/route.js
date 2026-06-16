import { auth } from "../../../../auth";
import { prisma } from "../../../../lib/prisma";

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const session = await auth();

    if (!session?.user?.id) {
      return Response.json({ error: "Non autorizzato" }, { status: 401 });
    }

    const trip = await prisma.itinerary.findUnique({ where: { id } });

    if (!trip || trip.userId !== session.user.id) {
      return Response.json({ error: "Non trovato" }, { status: 404 });
    }

    await prisma.itinerary.delete({ where: { id } });

    return Response.json({ success: true });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Errore del server" }, { status: 500 });
  }
}