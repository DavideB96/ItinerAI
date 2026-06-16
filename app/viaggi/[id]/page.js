import { auth } from "../../../auth";
import { prisma } from "../../../lib/prisma";
import { notFound } from "next/navigation";
import DeleteButton from "../../components/DeleteButton";
import Image from "next/image";

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
    <main className="flex min-h-screen flex-col items-center bg-zinc-50 px-6 py-16">
      <h1 className="text-3xl font-bold text-zinc-900">{trip.destination}</h1>
      <p className="mt-2 text-zinc-600">
        {trip.days} giorni · budget {trip.budget}
      </p>
      <div className="mt-4">
        <DeleteButton id={trip.id} />
      </div>

      <section className="mt-8 w-full max-w-md text-left">
        {itinerary.imageUrl && (
          <Image
            src={itinerary.imageUrl}
            alt={`Foto di ${trip.destination}`}
            width={400}
            height={192}
            className="mb-4 h-48 w-full rounded-lg object-cover"
          />
        )}
        <h2 className="text-lg font-semibold text-zinc-900">{itinerary.summary}</h2>
        {itinerary.tips && (
          <div className="mt-4 rounded-lg bg-amber-50 p-4">
            <h3 className="text-sm font-semibold text-amber-900">Consigli utili</h3>
            <ul className="mt-2 space-y-1 text-sm text-amber-800">
              {itinerary.tips.map((t, i) => (
                <li key={i}>• {t}</li>
              ))}
            </ul>
          </div>
        )}
        {itinerary.days.map((d) => (
          <div key={d.day} className="mt-4 rounded-lg border border-zinc-200 bg-white p-4">
            <h3 className="font-semibold text-zinc-800">{d.title}</h3>
            {d.tip && (
              <p className="mt-1 text-xs font-medium text-amber-700">💡 {d.tip}</p>
            )}
            <ul className="mt-2 space-y-1 text-sm text-zinc-600">
              {d.activities.map((a, i) => (
                <li key={i}>
                  <strong>{a.time}:</strong> {a.name} — {a.description}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </main>
  );
}