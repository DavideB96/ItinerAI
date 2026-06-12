import LoginForm from "../components/LoginForm";

export default function AccediPage() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-zinc-50 px-6 py-16">
      <h1 className="text-3xl font-bold text-zinc-900">Bentornato</h1>
      <p className="mt-2 text-zinc-600">Accedi per ritrovare i tuoi itinerari.</p>
      <LoginForm />
    </main>
  );
}