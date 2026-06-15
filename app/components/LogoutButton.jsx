"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="text-zinc-700 hover:text-zinc-900"
    >
      Esci
    </button>
  );
}