import { Router } from "express";
import {
  getCards,
  postCard,
  removeCard,
} from "../controllers/cards.controller.ts";
import validateNewCard from "../middleware/validateNewCard.ts";

const cardsRouter = Router();

cardsRouter.get("/", getCards);
cardsRouter.post("/", validateNewCard, postCard);
cardsRouter.delete("/:id", removeCard);

export default cardsRouter;
