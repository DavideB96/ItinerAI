import TripForm from "../components/TripForm";

export default function GeneraPage() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-zinc-50 px-6 py-16">
      <h1 className="text-3xl font-bold text-zinc-900">Genera il tuo itinerario</h1>
      <p className="mt-2 text-zinc-600">Dicci che viaggio sogni, al resto pensa l'AI.</p>
      <TripForm />
    </main>
  );
}