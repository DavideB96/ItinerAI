import Link from "next/link";
import Image from "next/image";
import { getDestinazioniCasuali } from "../lib/destinazioni";

export default async function Home() {
  const destinazioni = await getDestinazioniCasuali(4);

  return (
    <main className="relative overflow-hidden bg-background px-6 py-16 md:py-24">
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 1000 500"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <path d="M-50 330 Q 300 200 540 280 T 1050 170" stroke="#EF9F27" strokeWidth="2.5" strokeDasharray="8 11" fill="none" opacity="0.55" />
        <path d="M-50 90 Q 280 170 520 110 T 1050 250" stroke="#BA7517" strokeWidth="2" strokeDasharray="5 10" fill="none" opacity="0.3" />

        <g opacity="0.5">
          <circle cx="540" cy="255" r="7" fill="none" stroke="#BA7517" strokeWidth="2.5" />
          <circle cx="540" cy="255" r="2.5" fill="#BA7517" />
        </g>
        <g opacity="0.45">
          <circle cx="520" cy="110" r="6" fill="none" stroke="#BA7517" strokeWidth="2.5" />
          <circle cx="520" cy="110" r="2" fill="#BA7517" />
        </g>
        <g opacity="0.4">
          <circle cx="150" cy="300" r="6" fill="none" stroke="#BA7517" strokeWidth="2.5" />
          <circle cx="150" cy="300" r="2" fill="#BA7517" />
        </g>

        <circle cx="280" cy="145" r="3" fill="#FAC775" />
        <circle cx="850" cy="380" r="3" fill="#FAC775" />
      </svg>

      <svg
        className="pointer-events-none absolute right-[8%] top-[3%] rotate-45"
        width="38" height="38" viewBox="0 0 24 24" fill="none"
        stroke="#BA7517" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M16 10h4a2 2 0 0 1 0 4h-4l-4 7h-3l2-7H6l-2 3H1l2-5-2-5h3l2 3h5l-2-7h3z" />
      </svg>

      <div className="relative z-10 mx-auto grid max-w-5xl items-center gap-12 md:grid-cols-2">

        <div className="text-center md:text-left">
          <span className="inline-block rounded-full bg-amber-200 px-4 py-1.5 text-xs font-semibold text-amber-900">
            Itinerari su misura con l'AI
          </span>
          <h1 className="mt-4 break-words text-3xl font-bold leading-tight text-foreground sm:text-4xl md:text-5xl">
            Dove ti porta il prossimo viaggio?
          </h1>
          <p className="mt-4 max-w-md text-lg text-muted">
            Raccontaci la meta dei tuoi sogni. Al resto pensa ItinerAI: giorni, attività, consigli e foto.
          </p>
          <Link
            href="/genera"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-accent-hover focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2"
          >
            Inizia a pianificare
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {destinazioni.map((dest) => (
            <Link
              key={dest.nome}
              href={`/genera?destinazione=${encodeURIComponent(dest.nome)}`}
              className="group relative h-32 overflow-hidden rounded-xl bg-amber-100 shadow-sm transition-transform hover:scale-105"
            >
              {dest.imageUrl && (
                <Image
                  src={dest.imageUrl}
                  alt={`Foto di ${dest.nome}`}
                  fill
                  className="object-cover"
                />
              )}
              <div className="absolute inset-0 bg-black/25" />
              <span className="absolute bottom-2 left-3 z-10 font-semibold text-white">
                {dest.nome}
              </span>
            </Link>
          ))}
        </div>

      </div>

      <section className="relative z-10 mx-auto mt-20 max-w-5xl md:mt-28">
        <p className="text-center text-sm font-semibold uppercase tracking-wider text-accent">
          Come funziona
        </p>
        <h2 className="mt-1 text-center text-3xl font-bold text-foreground">
          Il tuo viaggio in tre passi
        </h2>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl bg-surface p-6 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-2xl">
              🗺️
            </div>
            <h3 className="text-lg font-semibold text-foreground">1. Scegli la meta</h3>
            <p className="mt-2 text-sm text-muted">
              Dicci dove vuoi andare, per quanti giorni e cosa ti piace.
            </p>
          </div>

          <div className="rounded-2xl bg-surface p-6 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-2xl">
              ✨
            </div>
            <h3 className="text-lg font-semibold text-foreground">2. L'AI crea il piano</h3>
            <p className="mt-2 text-sm text-muted">
              Itinerario giorno per giorno, con consigli e foto.
            </p>
          </div>

          <div className="rounded-2xl bg-surface p-6 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-2xl">
              🛫
            </div>
            <h3 className="text-lg font-semibold text-foreground">3. Parti!</h3>
            <p className="mt-2 text-sm text-muted">
              Salva l'itinerario e ritrovalo quando vuoi.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}