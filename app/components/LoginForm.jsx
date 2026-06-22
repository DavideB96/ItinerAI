"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginForm() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    if (res?.error) {
      setError("Email o password non corretti.");
      setLoading(false);
    } else {
      window.location.href = "/genera";
    }
  }

  const inputClass = "mt-1 w-full rounded-lg border border-amber-200 bg-surface px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-accent";
  const labelClass = "block text-sm font-semibold text-foreground";

  return (
    <form onSubmit={handleSubmit} className="mt-8 w-full max-w-sm space-y-5 text-left">
      <div>
        <label htmlFor="email" className={labelClass}>Email</label>
        <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} className={inputClass} />
      </div>

      <div>
        <label htmlFor="password" className={labelClass}>Password</label>
        <input id="password" name="password" type="password" required value={form.password} onChange={handleChange} className={inputClass} />
      </div>

      <button type="submit" disabled={loading} className="w-full rounded-xl bg-accent py-3 font-semibold text-white transition-colors hover:bg-accent-hover disabled:opacity-50">
        {loading ? "Accesso..." : "Accedi"}
      </button>

      {error && <p className="text-sm font-medium text-red-700">{error}</p>}

      <p className="text-center text-sm text-muted">
        Non hai un account?{" "}
        <Link href="/registrati" className="font-semibold text-accent transition-colors hover:text-accent-hover">
          Registrati
        </Link>
      </p>
    </form>
  );
}