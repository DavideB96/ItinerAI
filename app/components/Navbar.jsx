import Link from "next/link";
import { auth } from "../../auth";
import LogoutButton from "./LogoutButton";

export default async function Navbar() {
    const session = await auth();

    return (
        <nav className="flex items-center justify-between border-b border-zinc-200 bg-white px-6 py-4">
            <Link href="/" className="text-lg font-bold text-zinc-900">
                ItinerAI
            </Link>

            <div className="flex items-center gap-4 text-sm font-medium">
                <Link href="/genera" className="text-zinc-700 hover:text-zinc-900">
                    Genera
                </Link>

                {session?.user ? (
                    <>
                        <Link href="/viaggi" className="text-zinc-700 hover:text-zinc-900">
                            I miei viaggi
                        </Link>
                        <LogoutButton />
                    </>
                ) : (
                    <>
                        <Link href="/accedi" className="text-zinc-700 hover:text-zinc-900">
                            Accedi
                        </Link>
                        <Link href="/registrati" className="text-zinc-700 hover:text-zinc-900">
                            Registrati
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
}