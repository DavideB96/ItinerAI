"use client";

import { useState } from "react";
import Link from "next/link";

export default function RegisterForm() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();

    if (res.ok) {
      setMessage({ type: "ok", text: "Registrazione completata! Ora puoi accedere." });
    } else {
      setMessage({ type: "error", text: data.error });
    }
    setLoading(false);
  }

  const inputClass = "mt-1 w-full rounded-lg border border-amber-200 bg-surface px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-accent";
  const labelClass = "block text-sm font-semibold text-foreground";

  return (
    <form onSubmit={handleSubmit} className="mt-8 w-full max-w-sm space-y-5 text-left">
      <div>
        <label htmlFor="name" className={labelClass}>Nome</label>
        <input id="name" name="name" type="text" value={form.name} onChange={handleChange} className={inputClass} />
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>Email</label>
        <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} className={inputClass} />
      </div>

      <div>
        <label htmlFor="password" className={labelClass}>Password</label>
        <input id="password" name="password" type="password" required minLength={8} value={form.password} onChange={handleChange} className={inputClass} />
      </div>

      <button type="submit" disabled={loading} className="w-full rounded-xl bg-accent py-3 font-semibold text-white transition-colors hover:bg-accent-hover disabled:opacity-50">
        {loading ? "Registrazione..." : "Registrati"}
      </button>

      {message && (
        <p className={`text-sm font-medium ${message.type === "ok" ? "text-green-700" : "text-red-700"}`}>
          {message.text}
        </p>
      )}

      <p className="text-center text-sm text-muted">
        Hai già un account?{" "}
        <Link href="/accedi" className="font-semibold text-accent transition-colors hover:text-accent-hover">
          Accedi
        </Link>
      </p>
    </form>
  );
}