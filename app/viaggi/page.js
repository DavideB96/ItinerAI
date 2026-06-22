import { auth } from "../../auth";
import { prisma } from "../../lib/prisma";
import Link from "next/link";
import DeleteButton from "../components/DeleteButton";
import CoverImage from "../components/CoverImage";

export default async function ViaggiPage() {
  const session = await auth();

  const itineraries = await prisma.itinerary.findMany({
    where: { userId: session?.user?.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="flex min-h-screen flex-col items-center bg-background px-6 py-16">
      <h1 className="text-3xl font-bold text-foreground">I miei viaggi</h1>
      <p className="mt-2 text-muted">Qui ritrovi gli itinerari che hai salvato.</p>

      {itineraries.length === 0 ? (
        <div className="mt-12 flex flex-col items-center text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 text-3xl">
            🧳
          </div>
          <p className="text-muted">Non hai ancora salvato nessun viaggio.</p>
          <Link
            href="/genera"
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 font-semibold text-white transition-colors hover:bg-accent-hover"
          >
            Crea il tuo primo itinerario
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid w-full max-w-3xl gap-5 sm:grid-cols-2">
          {itineraries.map((trip) => (
            <Link
              key={trip.id}
              href={`/viaggi/${trip.id}`}
              className="group overflow-hidden rounded-2xl border border-amber-100 bg-surface shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <div className="relative h-44 bg-amber-100">
                <CoverImage src={trip.content?.imageUrl} alt={`Foto di ${trip.destination}`} nome={trip.destination} />
              </div>
              <div className="flex items-center justify-between gap-3 p-4">
                <div>
                  <h2 className="font-semibold text-foreground">{trip.destination}</h2>
                  <p className="text-sm text-muted">
                    {trip.days} giorni · budget {trip.budget}
                  </p>
                </div>
                <DeleteButton id={trip.id} />
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}