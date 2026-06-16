export async function getDestinationImage(destination) {
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
    return data.results?.[0]?.urls?.regular ?? null;
  } catch (error) {
    console.error("Errore Unsplash:", error);
    return null;
  }
}