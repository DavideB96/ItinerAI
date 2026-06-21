"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfileForm({ nomeIniziale, interessiIniziali }) {
  const [form, setForm] = useState({
    name: nomeIniziale,
    interests: interessiIniziali,
  });
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const res = await fetch("/api/profilo", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setMessage({ type: "ok", text: "Profilo aggiornato!" });
      router.refresh();
    } else {
      setMessage({ type: "error", text: "Errore nel salvataggio. Riprova." });
    }
    setLoading(false);
  }

  const inputClass = "mt-1 w-full rounded-lg border border-amber-200 bg-surface px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-accent";
  const labelClass = "block text-sm font-semibold text-foreground";

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-5 text-left">
      <h2 className="text-xl font-bold text-foreground">Le tue informazioni</h2>

      <div>
        <label htmlFor="name" className={labelClass}>Nome</label>
        <input id="name" name="name" type="text" value={form.name} onChange={handleChange} className={inputClass} />
      </div>

      <div>
        <label htmlFor="interests" className={labelClass}>I tuoi interessi di viaggio</label>
        <input id="interests" name="interests" type="text" placeholder="Es. cibo, storia, natura" value={form.interests} onChange={handleChange} className={inputClass} />
        <p className="mt-1 text-xs text-muted">Verranno usati per personalizzare i tuoi itinerari.</p>
      </div>

      <button type="submit" disabled={loading} className="rounded-xl bg-accent px-6 py-2.5 font-semibold text-white transition-colors hover:bg-accent-hover disabled:opacity-50">
        {loading ? "Salvataggio..." : "Salva modifiche"}
      </button>

      {message && (
        <p className={`text-sm font-medium ${message.type === "ok" ? "text-green-700" : "text-red-700"}`}>
          {message.text}
        </p>
      )}
    </form>
  );
}