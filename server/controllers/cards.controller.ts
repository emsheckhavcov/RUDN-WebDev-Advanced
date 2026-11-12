import type { Request, Response } from "express";
import {
  createCard,
  deleteCard,
  getAllCards,
} from "../services/cards.service.ts";

export async function getCards(_req: Request, res: Response): Promise<void> {
  res.json(await getAllCards());
}

export async function postCard(req: Request, res: Response): Promise<void> {
  const { title } = req.body;
  const newCard = await createCard(title);
  res.status(201).json(newCard);
}

export async function removeCard(
  req: Request,
  res: Response,
): Promise<void> {
  const wasDeleted = await deleteCard(req.params.id);
  if (!wasDeleted) {
    res.status(404).json({ error: `Карточка с id "${req.params.id}" не найдена` });
    return;
  }

  res.status(204).end();
}
