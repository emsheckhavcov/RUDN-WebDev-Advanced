import express, { type ErrorRequestHandler } from "express";
import cardsRouter from "./routes/cards.routes.ts";

const app = express();

app.use(express.json());
app.use("/cards", cardsRouter);

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