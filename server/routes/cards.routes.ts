import { Router } from "express";
import {
  getCards,
  patchCardDone,
  postCard,
  removeCard,
} from "../controllers/cards.controller.ts";
import validateCardDone from "../middleware/validateCardDone.ts";
import validateNewCard from "../middleware/validateNewCard.ts";

const cardsRouter = Router();

cardsRouter.get("/", getCards);
cardsRouter.post("/", validateNewCard, postCard);
cardsRouter.patch("/:id", validateCardDone, patchCardDone);
cardsRouter.delete("/:id", removeCard);

export default cardsRouter;
