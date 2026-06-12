export async function POST(request) {
  const { destination, days, budget, interests } = await request.json();

  // Itinerario finto: stessa forma che ci darà l'AI in futuro
  const itinerary = {
    destination,
    summary: `${days} giorni a ${destination} con budget ${budget}, all'insegna di: ${interests || "un po' di tutto"}.`,
    days: Array.from({ length: Number(days) }, (_, i) => ({
      day: i + 1,
      title: `Giorno ${i + 1} a ${destination}`,
      activities: [
        { time: "Mattina", name: "Colazione tipica", description: "Inizio in un locale storico del centro." },
        { time: "Pomeriggio", name: "Visita guidata", description: "Esplorazione dei luoghi principali." },
        { time: "Sera", name: "Cena locale", description: "Ristorante consigliato dagli abitanti." },
      ],
    })),
  };

  // Simuliamo la lentezza dell'AI (2 secondi) per testare il loading
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return Response.json(itinerary);
}