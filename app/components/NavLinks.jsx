"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({ href, children }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={
        isActive
          ? "border-b-2 border-accent pb-0.5 font-semibold text-accent"
          : "text-muted transition-colors hover:text-accent"
      }
    >
      {children}
    </Link>
  );
}