import { auth } from "../../auth";
import { prisma } from "../../lib/prisma";
import { redirect } from "next/navigation";
import ProfileForm from "../components/ProfileForm";

export default async function ProfiloPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/accedi");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  const itineraries = await prisma.itinerary.findMany({
    where: { userId: session.user.id },
  });

  const totaleViaggi = itineraries.length;
  const destinazioniUniche = new Set(itineraries.map((t) => t.destination)).size;
  const totaleGiorni = itineraries.reduce((somma, t) => somma + t.days, 0);

  const iniziale = user.name ? user.name[0].toUpperCase() : "?";

  return (
    <main className="flex min-h-screen flex-col items-center bg-background px-6 py-16">
      <div className="w-full max-w-2xl">

        <div className="flex items-center gap-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-accent text-3xl font-bold text-white">
            {iniziale}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{user.name || "Viaggiatore"}</h1>
            <p className="text-muted">{user.email}</p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-4">
          <div className="rounded-2xl border border-amber-100 bg-surface p-5 text-center">
            <p className="text-3xl font-bold text-accent">{totaleViaggi}</p>
            <p className="mt-1 text-sm text-muted">Itinerari creati</p>
          </div>
          <div className="rounded-2xl border border-amber-100 bg-surface p-5 text-center">
            <p className="text-3xl font-bold text-accent">{destinazioniUniche}</p>
            <p className="mt-1 text-sm text-muted">Mete diverse</p>
          </div>
          <div className="rounded-2xl border border-amber-100 bg-surface p-5 text-center">
            <p className="text-3xl font-bold text-accent">{totaleGiorni}</p>
            <p className="mt-1 text-sm text-muted">Giorni in viaggio</p>
          </div>
        </div>

        <ProfileForm
          nomeIniziale={user.name || ""}
          interessiIniziali={user.interests || ""}
        />
      </div>
    </main>
  );
}