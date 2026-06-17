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
  "Lisbona",
  "Santorini",
  "Edimburgo",
];

export async function getDestinazioniCasuali(quante = 4) {
  const mescolate = [...CITTA].sort(() => Math.random() - 0.5);
  const scelte = [...new Set(mescolate)].slice(0, quante);

  const conFoto = await Promise.all(
    scelte.map(async (nome) => ({
      nome,
      imageUrl: await getDestinationImage(nome),
    }))
  );

  return conFoto;
}