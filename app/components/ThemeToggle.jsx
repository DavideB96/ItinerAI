"use client";

import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const salvato = localStorage.getItem("tema");
    if (salvato === "dark") {
      document.documentElement.classList.add("dark");
      setDark(true);
    }
  }, []);

  function toggle() {
    const nuovo = !dark;
    setDark(nuovo);
    if (nuovo) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("tema", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("tema", "light");
    }
  }

  return (
    <button
      onClick={toggle}
      aria-label="Cambia tema"
      className={`relative flex h-7 w-12 items-center rounded-full px-1 transition-colors duration-300 ${dark ? "bg-accent" : "bg-amber-200"}`}
    >
      <span className={`flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-md transition-transform duration-300 ${dark ? "translate-x-5" : "translate-x-0"}`}>
        {dark ? (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#854f0b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        ) : (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ba7517" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
          </svg>
        )}
      </span>
    </button>
  );
}