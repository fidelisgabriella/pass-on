import { db, donationsTable } from "@workspace/db";

const initialDonations = [
  {
    id: "seed-donation-estojo-xadrez",
    title: "Estojo preto e branco com estampa xadrez",
    category: "Mochilas e estojos",
    description: null,
    size: null,
    condition: null,
    status: "available",
    imagePath: "/donations/estojo-xadrez.png",
    ownerUserId: null,
  },
  {
    id: "seed-donation-kit-presilhas",
    title: "Kit de presilhas e acessórios de cabelo coloridos",
    category: "Acessórios",
    description: null,
    size: null,
    condition: null,
    status: "available",
    imagePath: "/donations/kit-presilhas-coloridas.png",
    ownerUserId: null,
  },
  {
    id: "seed-donation-camiseta-branca",
    title: "Camiseta branca",
    category: "Roupas",
    description: null,
    size: null,
    condition: null,
    status: "available",
    imagePath: "/donations/camiseta-branca.png",
    ownerUserId: null,
  },
];

export async function seedInitialDonations(): Promise<void> {
  await db
    .insert(donationsTable)
    .values(initialDonations)
    .onConflictDoNothing({ target: donationsTable.id });
}
