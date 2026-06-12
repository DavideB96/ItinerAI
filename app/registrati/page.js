import RegisterForm from "../components/RegisterForm";

export default function RegistratiPage() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-zinc-50 px-6 py-16">
      <h1 className="text-3xl font-bold text-zinc-900">Crea il tuo account</h1>
      <p className="mt-2 text-zinc-600">Salva i tuoi itinerari e ritrovali quando vuoi.</p>
      <RegisterForm />
    </main>
  );
}