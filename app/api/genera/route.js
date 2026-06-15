import { auth } from "../../../auth";
import { prisma } from "../../../lib/prisma";

export async function POST(request) {
  try {
    const { destination, days, budget, interests } = await request.json();

    const prompt = `Sei un esperto pianificatore di viaggi. Crea un itinerario di ${days} giorni a ${destination}, con budget ${budget} e questi interessi: ${interests || "un po' di tutto"}.

Rispondi SOLO con un JSON valido, senza alcun testo prima o dopo, con esattamente questa struttura:
{
  "destination": "${destination}",
  "summary": "riassunto del viaggio in 1-2 frasi",
  "days": [
    {
      "day": 1,
      "title": "titolo breve della giornata",
      "activities": [
        { "time": "Mattina", "name": "nome attività", "description": "descrizione in 1 frase" },
        { "time": "Pomeriggio", "name": "...", "description": "..." },
        { "time": "Sera", "name": "...", "description": "..." }
      ]
    }
  ]
}

Regole: tutto in italiano, luoghi e locali reali e specifici di ${destination}, attività coerenti col budget ${budget}.`;

    const res = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY,
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: "application/json" },
        }),
      }
    );

    if (!res.ok) {
      console.error("Errore Gemini:", await res.text());
      return Response.json({ error: "Errore nella generazione" }, { status: 500 });
    }

    const data = await res.json();
    const text = data.candidates[0].content.parts[0].text;
    const itinerary = JSON.parse(text);

    const session = await auth();
    if (session?.user?.id) {
      await prisma.itinerary.create({
        data: {
          destination,
          days: Number(days),
          budget,
          interests,
          content: itinerary,
          userId: session.user.id,
        },
      });
    }

    return Response.json(itinerary);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Errore nella generazione" }, { status: 500 });
  }
}