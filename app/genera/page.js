import TripForm from "../components/TripForm";
import { auth } from "../../auth";
import { prisma } from "../../lib/prisma";

export default async function GeneraPage() {
  const session = await auth();

  let interessiProfilo = "";
  if (session?.user?.id) {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });
    interessiProfilo = user?.interests || "";
  }

  return (
    <main className="flex min-h-screen flex-col items-center bg-background px-6 py-16">
      <div className="mb-2 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ba7517" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 10h4a2 2 0 0 1 0 4h-4l-4 7h-3l2-7H6l-2 3H1l2-5-2-5h3l2 3h5l-2-7h3z" />
        </svg>
      </div>
      <h1 className="text-3xl font-bold text-foreground">Genera il tuo itinerario</h1>
      <p className="mt-2 text-muted">Dicci che viaggio sogni, al resto pensa l'AI.</p>
      <TripForm interessiProfilo={interessiProfilo} />
    </main>
  );
}