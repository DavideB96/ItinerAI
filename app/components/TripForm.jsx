"use client";

import { useState } from "react";

export default function TripForm() {
  const [form, setForm] = useState({
    destination: "",
    days: 3,
    budget: "medio",
    interests: "",
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

  return (
    <>
      <form onSubmit={handleSubmit} className="mt-8 w-full max-w-md space-y-5 text-left">
        <div>
          <label htmlFor="destination" className="block text-sm font-semibold text-zinc-700">
            Destinazione
          </label>
          <input
            id="destination"
            name="destination"
            type="text"
            required
            placeholder="Es. Lisbona"
            value={form.destination}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-zinc-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-zinc-500"
          />
        </div>

        <div>
          <label htmlFor="days" className="block text-sm font-semibold text-zinc-700">
            Giorni: {form.days}
          </label>
          <input
            id="days"
            name="days"
            type="range"
            min="1"
            max="14"
            value={form.days}
            onChange={handleChange}
            className="mt-1 w-full"
          />
        </div>

        <div>
          <label htmlFor="budget" className="block text-sm font-semibold text-zinc-700">
            Budget
          </label>
          <select
            id="budget"
            name="budget"
            value={form.budget}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-zinc-300 px-4 py-2.5"
          >
            <option value="basso">Basso</option>
            <option value="medio">Medio</option>
            <option value="alto">Alto</option>
          </select>
        </div>

        <div>
          <label htmlFor="interests" className="block text-sm font-semibold text-zinc-700">
            Interessi
          </label>
          <input
            id="interests"
            name="interests"
            type="text"
            placeholder="Es. cibo, musei, natura"
            value={form.interests}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-zinc-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-zinc-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-zinc-900 py-3 font-semibold text-white hover:bg-zinc-700 disabled:opacity-50"
        >
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
          <h2 className="text-xl font-bold text-zinc-900">{result.summary}</h2>
          {result.days.map((d) => (
            <div key={d.day} className="mt-4 rounded-lg border border-zinc-200 bg-white p-4">
              <h3 className="font-semibold text-zinc-800">{d.title}</h3>
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
      )}
    </>
  );
}