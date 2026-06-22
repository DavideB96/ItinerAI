import { unstable_cache } from "next/cache";

async function fetchDestinationImage(destination) {
  try {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
        destination
      )}&per_page=1&orientation=landscape`,
      {
        headers: {
          Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
        },
      }
    );

    if (!res.ok) return null;

    const data = await res.json();
    const foto = data.results?.[0];

    if (!foto) return null;

    // Trigger download richiesto da Unsplash (segnala l'utilizzo della foto)
    if (foto.links?.download_location) {
      fetch(foto.links.download_location, {
        headers: {
          Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
        },
      }).catch(() => {});
    }

    return {
      url: foto.urls.regular,
      autore: foto.user.name,
      linkAutore: `${foto.user.links.html}?utm_source=ItinerAI&utm_medium=referral`,
      linkUnsplash: "https://unsplash.com/?utm_source=ItinerAI&utm_medium=referral",
    };
  } catch (error) {
    console.error("Errore Unsplash:", error);
    return null;
  }
}

export const getDestinationImage = unstable_cache(
  fetchDestinationImage,
  ["destination-image-v2"],
  { revalidate: 86400 }
);