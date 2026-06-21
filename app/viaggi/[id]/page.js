import { auth } from "../../../auth";
import { prisma } from "../../../lib/prisma";
import { notFound } from "next/navigation";
import DeleteButton from "../../components/DeleteButton";
import Image from "next/image";
import Link from "next/link";

export default async function DettaglioViaggio({ params }) {
  const { id } = await params;
  const session = await auth();

  const trip = await prisma.itinerary.findUnique({
    where: { id },
  });

  if (!trip || trip.userId !== session?.user?.id) {
    notFound();
  }

  const itinerary = trip.content;

  return (
    <main className="flex min-h-screen flex-col items-center bg-background px-6 py-16">
      <section className="w-full max-w-2xl">
        <Link href="/viaggi" className="mb-6 inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-accent">
          <span aria-hidden="true">←</span> Torna ai miei viaggi
        </Link>

        {itinerary.imageUrl && (
          <Image
            src={itinerary.imageUrl}
            alt={`Foto di ${trip.destination}`}
            width={1200}
            height={800}
            className="w-full rounded-2xl"
          />
        )}

        <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">{trip.destination}</h1>
            <p className="mt-1 text-muted">
              {trip.days} giorni · budget {trip.budget}
            </p>
          </div>
          <DeleteButton id={trip.id} />
        </div>

        <p className="mt-4 text-lg text-foreground">{itinerary.summary}</p>

        {itinerary.tips && (
          <div className="mt-6 rounded-2xl bg-amber-50 p-5">
            <h3 className="text-sm font-semibold text-accent-hover">Consigli utili</h3>
            <ul className="mt-2 space-y-1 text-sm text-muted">
              {itinerary.tips.map((t, i) => (
                <li key={i}>• {t}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-6 space-y-4">
          {itinerary.days.map((d) => (
            <div key={d.day} className="rounded-2xl border border-amber-100 bg-surface p-5">
              <h3 className="font-semibold text-foreground">{d.title}</h3>
              {d.tip && (
                <p className="mt-1 text-xs font-medium text-accent">💡 {d.tip}</p>
              )}
              <ul className="mt-3 space-y-2 text-sm text-muted">
                {d.activities.map((a, i) => (
                  <li key={i}>
                    <strong className="text-foreground">{a.time}:</strong> {a.name} — {a.description}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}