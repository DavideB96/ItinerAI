import Link from "next/link";
import { auth } from "../../auth";
import LogoutButton from "./LogoutButton";
import NavLink from "./NavLinks";

export default async function Navbar() {
  const session = await auth();

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-amber-100 bg-surface/80 px-6 py-4 backdrop-blur-md">
      <Link href="/" className="flex items-center gap-2 text-lg font-bold text-accent-hover">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 10h4a2 2 0 0 1 0 4h-4l-4 7h-3l2-7H6l-2 3H1l2-5-2-5h3l2 3h5l-2-7h3z" />
        </svg>
        ItinerAI
      </Link>

      <div className="flex items-center gap-5 text-sm font-medium">
        <NavLink href="/genera">Genera</NavLink>

        {session?.user ? (
          <>
            <NavLink href="/viaggi">I miei viaggi</NavLink>
            <span className="flex items-center gap-2 text-muted">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent text-xs font-semibold text-white">
                {session.user.name ? session.user.name[0].toUpperCase() : "?"}
              </span>
              <span className="hidden sm:inline">
                Ciao, {session.user.name || "viaggiatore"}
              </span>
            </span>
            <LogoutButton />
          </>
        ) : (
          <>
            <NavLink href="/accedi">Accedi</NavLink>
            <NavLink href="/registrati">Registrati</NavLink>
          </>
        )}
      </div>
    </nav>
  );
}