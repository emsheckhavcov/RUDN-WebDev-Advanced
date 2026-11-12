import { Router } from "express";
import {
  getCards,
  postCard,
  removeCard,
} from "../controllers/cards.controller.ts";

const cardsRouter = Router();

cardsRouter.get("/", getCards);
cardsRouter.post("/", postCard);
cardsRouter.delete("/:id", removeCard);

export default cardsRouter;
