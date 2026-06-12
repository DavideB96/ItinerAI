"use client";

import { useState } from "react";

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

  return (
    <form onSubmit={handleSubmit} className="mt-8 w-full max-w-md space-y-5 text-left">
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-zinc-700">
          Nome
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          className="mt-1 w-full rounded-lg border border-zinc-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-zinc-500"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-zinc-700">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={form.email}
          onChange={handleChange}
          className="mt-1 w-full rounded-lg border border-zinc-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-zinc-500"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-semibold text-zinc-700">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          minLength={8}
          value={form.password}
          onChange={handleChange}
          className="mt-1 w-full rounded-lg border border-zinc-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-zinc-500"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-zinc-900 py-3 font-semibold text-white hover:bg-zinc-700 disabled:opacity-50"
      >
        {loading ? "Registrazione..." : "Registrati"}
      </button>

      {message && (
        <p
          className={`text-sm font-medium ${
            message.type === "ok" ? "text-green-700" : "text-red-700"
          }`}
        >
          {message.text}
        </p>
      )}
    </form>
  );
}