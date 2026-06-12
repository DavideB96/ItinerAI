"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

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
      router.push("/genera");
      router.refresh();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 w-full max-w-md space-y-5 text-left">
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
        {loading ? "Accesso..." : "Accedi"}
      </button>

      {error && <p className="text-sm font-medium text-red-700">{error}</p>}
    </form>
  );
}