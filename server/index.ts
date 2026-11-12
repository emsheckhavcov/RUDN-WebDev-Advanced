import express, { type ErrorRequestHandler } from "express";
import {
  createCard,
  deleteCard,
  getAllCards,
} from "./services/cards.service.ts";

const app = express();

app.use(express.json());

app.get("/cards", async (_req, res) => {
  res.json(await getAllCards());
});

app.post("/cards", async (req, res) => {
  const { title } = req.body;

  if (!title || typeof title !== "string" || !title.trim()) {
    res.status(400).json({ error: "title обязателен и не может быть пустым" });
    return;
  }

  const newCard = await createCard(title);
  res.status(201).json(newCard);
});

app.delete("/cards/:id", async (req, res) => {
  const wasDeleted = await deleteCard(req.params.id);
  if (!wasDeleted) {
    res.status(404).json({ error: `Карточка с id "${req.params.id}" не найдена` });
    return;
  }

  res.status(204).end();
});

app.use((_req, res) => {
  res.status(404).json({ error: "Маршрут не найден" });
});

const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  console.error("Необработанная ошибка сервера:", error);
  res.status(500).json({ error: "Внутренняя ошибка сервера" });
};

app.use(errorHandler);

app.listen(3001, () => {
  console.log("http://localhost:3001");
});