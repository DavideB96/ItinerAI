import { auth } from "../../../auth";
import { prisma } from "../../../lib/prisma";
import { getDestinationImage } from "../../../lib/unsplash";

// Funzione helper per chiamare Gemini
async function chiamaGemini(prompt, jsonMode = false) {
  return fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": process.env.GEMINI_API_KEY,
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        ...(jsonMode && { generationConfig: { responseMimeType: "application/json" } }),
      }),
    }
  );
}

export async function POST(request) {
  try {
    const { destination, days, budget, interests, arrivo, partenza } = await request.json();

    // --- STEP 1: validazione "buttafuori" ---
    const promptValidazione = `Sei un controllore di input per un'app di viaggi. Valuta questi due dati:
- Destinazione: "${destination}"
- Interessi: "${interests || "non specificati"}"

Regole:
- La destinazione deve essere un luogo geografico reale (città, regione o paese esistente).
- Gli interessi devono essere temi di viaggio leciti e appropriati (es. cibo, arte, natura, vita notturna). Se vuoti o "non specificati", vanno bene.
- Rifiuta contenuti volgari, offensivi, sessuali, illegali o palesemente insensati.

Rispondi SOLO con un JSON: {"valido": true} se va tutto bene, oppure {"valido": false, "motivo": "spiegazione breve e gentile in italiano"} se qualcosa non va.`;

    const resValidazione = await chiamaGemini(promptValidazione, true);
    if (resValidazione.ok) {
      const dataVal = await resValidazione.json();
      const esito = JSON.parse(dataVal.candidates[0].content.parts[0].text);
      if (!esito.valido) {
        return Response.json(
          { error: esito.motivo || "Destinazione o interessi non validi. Riprova con dati reali." },
          { status: 400 }
        );
      }
    }

    // --- STEP 2: generazione itinerario (come prima) ---
    const prompt = `Sei un esperto pianificatore di viaggi. Crea un itinerario di ${days} giorni a ${destination}, con budget ${budget} e questi interessi: ${interests || "un po' di tutto"}.
${arrivo ? `Il primo giorno il viaggiatore arriva alle ${arrivo}, quindi pianifica quel giorno tenendo conto dell'orario di arrivo (meno attività se arriva tardi).` : ""}
${partenza ? `L'ultimo giorno il viaggiatore riparte alle ${partenza}, quindi pianifica quel giorno tenendo conto dell'orario di partenza (attività più leggere e vicine se riparte presto).` : ""}

Rispondi SOLO con un JSON valido, senza alcun testo prima o dopo, con esattamente questa struttura:
{
  "destination": "${destination}",
  "summary": "riassunto del viaggio in 1-2 frasi",
  "tips": ["consiglio generale 1 sulla destinazione", "consiglio generale 2", "consiglio generale 3"],
  "days": [
    {
      "day": 1,
      "title": "titolo breve della giornata",
      "tip": "un consiglio pratico specifico per questa giornata",
      "activities": [
        { "time": "Mattina", "name": "nome attività", "description": "descrizione in 1 frase" },
        { "time": "Pomeriggio", "name": "...", "description": "..." },
        { "time": "Sera", "name": "...", "description": "..." }
      ]
    }
  ]
}

Regole: tutto in italiano, luoghi e locali reali e specifici di ${destination}, attività coerenti col budget ${budget}. I consigli devono essere pratici e utili (es. orari migliori per evitare la folla, giorni di chiusura, come muoversi, quartieri da evitare o preferire in certi momenti).`;

    const geminiPromise = chiamaGemini(prompt, true);
    const imagePromise = getDestinationImage(destination);
    const [res, imageData] = await Promise.all([geminiPromise, imagePromise]);

    if (!res.ok) {
      console.error("Errore Gemini:", await res.text());
      return Response.json({ error: "Errore nella generazione" }, { status: 500 });
    }

    const data = await res.json();
    const text = data.candidates[0].content.parts[0].text;
    const itinerary = JSON.parse(text);
    itinerary.imageUrl = imageData?.url ?? null;
    itinerary.imageAutore = imageData?.autore ?? null;
    itinerary.imageLinkAutore = imageData?.linkAutore ?? null;
    itinerary.imageLinkUnsplash = imageData?.linkUnsplash ?? null;

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