import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-6 text-center">
      <h1 className="text-5xl font-bold text-zinc-900">
        ItinerAI
      </h1>

      <p className="mt-4 max-w-xl text-lg text-zinc-600">
        Benvenuto su ItinerAI, la tua app per creare itinerari di viaggio
        personalizzati in modo semplice e intelligente.
      </p>
      <Link
        href="/genera"
        className="mt-6 inline-block rounded-lg bg-zinc-900 px-5 py-3 text-sm font-semibold text-white shadow-md hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2"
      >
        Inizia a pianificare
      </Link>
    </main>
  );
}