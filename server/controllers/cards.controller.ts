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
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const wasDeleted = await deleteCard(id);
  if (!wasDeleted) {
    res.status(404).json({ error: `Карточка с id "${id}" не найдена` });
    return;
  }

  res.status(204).end();
}
