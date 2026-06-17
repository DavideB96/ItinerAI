import Link from "next/link";
import { auth } from "../../auth";
import LogoutButton from "./LogoutButton";

export default async function Navbar() {
    const session = await auth();

    return (
        <nav className="flex items-center justify-between border-b border-amber-100 bg-surface px-6 py-4">
            <Link href="/" className="flex items-center gap-2 text-lg font-bold text-accent-hover">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 10h4a2 2 0 0 1 0 4h-4l-4 7h-3l2-7H6l-2 3H1l2-5-2-5h3l2 3h5l-2-7h3z" />
                </svg>
                ItinerAI
            </Link>

            <div className="flex items-center gap-5 text-sm font-medium">
                <Link href="/genera" className="text-muted transition-colors hover:text-accent">
                    Genera
                </Link>

                {session?.user ? (
                    <>
                        <Link href="/viaggi" className="text-muted transition-colors hover:text-accent">
                            I miei viaggi
                        </Link>
                        <LogoutButton />
                    </>
                ) : (
                    <>
                        <Link href="/accedi" className="text-muted transition-colors hover:text-accent">
                            Accedi
                        </Link>
                        <Link
                            href="/registrati"
                            className="rounded-lg bg-accent px-4 py-2 text-white transition-colors hover:bg-accent-hover"
                        >
                            Registrati
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
}