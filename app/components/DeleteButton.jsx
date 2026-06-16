"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteButton({ id }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleDelete(e) {
    e.preventDefault();
    e.stopPropagation();

    const conferma = window.confirm("Vuoi davvero eliminare questo itinerario?");
    if (!conferma) return;

    setLoading(true);

    const res = await fetch(`/api/viaggi/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      router.push("/viaggi");
      router.refresh();
    } else {
      alert("Errore durante l'eliminazione. Riprova.");
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="cursor-pointer rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-700 disabled:opacity-50"
    >
      {loading ? "Eliminazione..." : "Elimina"}
    </button>
  );
}