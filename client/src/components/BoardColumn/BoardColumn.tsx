import type { Card } from "../../types/card";
import { deleteCard } from "../../api/cards";
import { useBoardFiltersStore } from "../../store/boardFiltersStore";
import { BoardCard } from "../BoardCard/BoardCard";
import styles from "./BoardColumn.module.css";

type Props = {
  cards: Card[];
};

export function BoardColumn({ cards }: Props) {
  const hideDone = useBoardFiltersStore((state) => state.hideDone);

  const visibleCards = hideDone
    ? cards.filter((card) => !card.isDone)
    : cards;

  return (
    <section className={styles.column}>
      <h2 className={styles.title}>К выполнению</h2>

      <div className={styles.cards}>
        {visibleCards.map((card) => (
          <BoardCard
            key={card.id}
            id={card.id}
            title={card.title}
            isDone={card.isDone}
            onDelete={deleteCard}
          />
        ))}
      </div>
    </section>
  );
}