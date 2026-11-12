import type { RequestHandler } from "express";

const validateNewCard: RequestHandler = (req, res, next) => {
  const title = req.body?.title;

  if (!title || typeof title !== "string" || !title.trim()) {
    res.status(400).json({ error: "title обязателен и не может быть пустым" });
    return;
  }

  next();
};

export default validateNewCard;
