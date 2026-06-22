import { getDestinationImage } from "./unsplash";

const CITTA = [
  "Tokyo",
  "Parigi",
  "Roma",
  "Lisbona",
  "Barcellona",
  "Amsterdam",
  "New York",
  "Kyoto",
  "Marrakech",
  "Praga",
  "Istanbul",
  "Vienna",
  "Santorini",
  "Edimburgo",
];

export async function getDestinazioniCasuali(quante = 4) {
  const mescolate = [...CITTA].sort(() => Math.random() - 0.5);
  const scelte = [...new Set(mescolate)].slice(0, quante);

  const conFoto = await Promise.all(
    scelte.map(async (nome) => {
      const foto = await getDestinationImage(nome);
      return {
        nome,
        imageUrl: foto?.url ?? null,
        autore: foto?.autore ?? null,
        linkAutore: foto?.linkAutore ?? null,
        linkUnsplash: foto?.linkUnsplash ?? null,
      };
    })
  );

  return conFoto;
}