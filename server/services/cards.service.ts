import type { Card } from "../types/card.ts";

const cards: Card[] = [
  {
    id: "1",
    title: "Спроектировать структуру доски",
    isDone: true,
    isUrgent: false,
  },
  {
    id: "2",
    title: "Подключить доску к серверу",
    isDone: false,
    isUrgent: true,
  },
  {
    id: "3",
    title: "Добавить фильтр выполненных карточек",
    isDone: false,
    isUrgent: false,
  },
];

export async function getAllCards(): Promise<Card[]> {
  return cards;
}

export async function createCard(title: string): Promise<Card> {
  const newCard: Card = {
    id: String(Date.now()),
    title: title.trim(),
    isDone: false,
    isUrgent: false,
  };
  cards.push(newCard);
  return newCard;
}

export async function deleteCard(id: string): Promise<boolean> {
  const cardIndex = cards.findIndex((card) => card.id === id);
  if (cardIndex === -1) return false;

  cards.splice(cardIndex, 1);
  return true;
}
