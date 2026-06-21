"use client";

import { useState } from "react";
import NavLink from "./NavLinks";
import LogoutButton from "./LogoutButton";

export default function MobileMenu({ isLoggedIn, userName }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="sm:hidden">
      <button
        onClick={() => setOpen(!open)}
        aria-label="Apri menu"
        className="relative flex h-10 w-10 items-center justify-center rounded-lg text-accent-hover transition-colors hover:bg-amber-100"
      >
        <span className={`absolute h-0.5 w-6 rounded-full bg-current transition-all duration-300 ${open ? "rotate-45" : "-translate-y-2"}`} />
        <span className={`absolute h-0.5 w-6 rounded-full bg-current transition-all duration-300 ${open ? "opacity-0" : "opacity-100"}`} />
        <span className={`absolute h-0.5 w-6 rounded-full bg-current transition-all duration-300 ${open ? "-rotate-45" : "translate-y-2"}`} />
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-full border-b border-amber-100 bg-surface px-6 py-4 shadow-md">
          <div className="flex flex-col gap-4 text-sm font-medium" onClick={() => setOpen(false)}>
            <NavLink href="/genera">Genera</NavLink>
            {isLoggedIn ? (
              <>
                <NavLink href="/viaggi">I miei viaggi</NavLink>
                <span className="text-muted">Ciao, {userName || "viaggiatore"}</span>
                <LogoutButton />
              </>
            ) : (
              <>
                <NavLink href="/accedi">Accedi</NavLink>
                <NavLink href="/registrati">Registrati</NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}