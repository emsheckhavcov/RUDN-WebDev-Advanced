import express from "express";

const app = express();

const cards = [
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

app.use(express.json());

app.get("/cards", (_req, res) => {
  res.json(cards);
});

app.post("/cards", (req, res) => {
  const { title } = req.body;

  if (!title || typeof title !== "string" || !title.trim()) {
    res.status(400).json({ error: "title обязателен и не может быть пустым" });
    return;
  }

  const newCard = {
    id: String(Date.now()),
    title: title.trim(),
    isDone: false,
    isUrgent: false,
  };
  cards.push(newCard);
  res.status(201).json(newCard);
});

app.listen(3001, () => {
  console.log("http://localhost:3001");
});