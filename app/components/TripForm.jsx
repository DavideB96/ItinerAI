"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function TripForm() {
  const searchParams = useSearchParams();
  const [form, setForm] = useState({
    destination: searchParams.get("destinazione") || "",
    days: 3,
    budget: "medio",
    interests: "",
    arrivo: "",
    partenza: "",
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError(null);

    const res = await fetch("/api/genera", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();

    if (res.ok) {
      setResult(data);
    } else {
      setError("Qualcosa è andato storto nella generazione. Riprova tra poco.");
    }
    setLoading(false);
  }

  const inputClass =
    "mt-1 w-full rounded-lg border border-amber-200 bg-surface px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-accent";
  const labelClass = "block text-sm font-semibold text-foreground";

  return (
    <>
      <form onSubmit={handleSubmit} className="mt-8 w-full max-w-md space-y-5 text-left">
        <div>
          <label htmlFor="destination" className={labelClass}>Destinazione</label>
          <input id="destination" name="destination" type="text" required placeholder="Es. Lisbona" value={form.destination} onChange={handleChange} className={inputClass} />
        </div>

        <div>
          <label htmlFor="days" className={labelClass}>Giorni: {form.days}</label>
          <input id="days" name="days" type="range" min="1" max="14" value={form.days} onChange={handleChange} className="mt-1 w-full accent-accent" />
        </div>

        <div>
          <label htmlFor="budget" className={labelClass}>Budget</label>
          <select id="budget" name="budget" value={form.budget} onChange={handleChange} className={inputClass}>
            <option value="basso">Basso</option>
            <option value="medio">Medio</option>
            <option value="alto">Alto</option>
          </select>
        </div>

        <div>
          <label htmlFor="interests" className={labelClass}>Interessi</label>
          <input id="interests" name="interests" type="text" placeholder="Es. cibo, musei, natura" value={form.interests} onChange={handleChange} className={inputClass} />
        </div>

        <div>
          <label htmlFor="arrivo" className={labelClass}>Orario di arrivo (primo giorno)</label>
          <input id="arrivo" name="arrivo" type="time" value={form.arrivo} onChange={handleChange} className={inputClass} />
        </div>

        <div>
          <label htmlFor="partenza" className={labelClass}>Orario di partenza (ultimo giorno)</label>
          <input id="partenza" name="partenza" type="time" value={form.partenza} onChange={handleChange} className={inputClass} />
        </div>

        <button type="submit" disabled={loading} className="w-full rounded-xl bg-accent py-3 font-semibold text-white transition-colors hover:bg-accent-hover disabled:opacity-50">
          {loading ? "Generazione in corso..." : "Genera itinerario ✨"}
        </button>
      </form>

      {error && (
        <p className="mt-6 w-full max-w-md rounded-lg bg-red-50 p-4 text-sm font-medium text-red-700">
          {error}
        </p>
      )}

      {result && (
        <section className="mt-10 w-full max-w-md text-left">
          {result.imageUrl && (
            <img src={result.imageUrl} alt={`Foto di ${result.destination}`} className="mb-4 w-full rounded-xl" />
          )}
          <h2 className="text-xl font-bold text-foreground">{result.summary}</h2>

          {result.tips && (
            <div className="mt-4 rounded-xl bg-amber-50 p-4">
              <h3 className="text-sm font-semibold text-accent-hover">Consigli utili</h3>
              <ul className="mt-2 space-y-1 text-sm text-muted">
                {result.tips.map((t, i) => (
                  <li key={i}>• {t}</li>
                ))}
              </ul>
            </div>
          )}

          {result.days.map((d) => (
            <div key={d.day} className="mt-4 rounded-xl border border-amber-100 bg-surface p-4">
              <h3 className="font-semibold text-foreground">{d.title}</h3>
              {d.tip && <p className="mt-1 text-xs font-medium text-accent">💡 {d.tip}</p>}
              <ul className="mt-2 space-y-1 text-sm text-muted">
                {d.activities.map((a, i) => (
                  <li key={i}>
                    <strong className="text-foreground">{a.time}:</strong> {a.name} — {a.description}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}
    </>
  );
}