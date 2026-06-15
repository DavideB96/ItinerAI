import { auth } from "../../auth";
import { prisma } from "../../lib/prisma";

export default async function ViaggiPage() {
  const session = await auth();

  const itineraries = await prisma.itinerary.findMany({
    where: { userId: session?.user?.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="flex min-h-screen flex-col items-center bg-zinc-50 px-6 py-16">
      <h1 className="text-3xl font-bold text-zinc-900">I miei viaggi</h1>
      <p className="mt-2 text-zinc-600">Qui ritrovi gli itinerari che hai salvato.</p>

      <div className="mt-8 w-full max-w-md space-y-4">
        {itineraries.map((trip) => (
          <div key={trip.id} className="rounded-lg border border-zinc-200 bg-white p-4">
            <h2 className="font-semibold text-zinc-900">{trip.destination}</h2>
            <p className="text-sm text-zinc-600">
              {trip.days} giorni · budget {trip.budget}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}