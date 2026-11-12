import type { RequestHandler } from "express";

const validateCardDone: RequestHandler = (req, res, next) => {
  if (typeof req.body?.isDone !== "boolean") {
    res.status(400).json({ error: "isDone должно быть логическим значением" });
    return;
  }

  next();
};

export default validateCardDone;
