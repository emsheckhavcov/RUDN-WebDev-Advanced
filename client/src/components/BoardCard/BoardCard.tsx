import styles from "./BoardCard.module.css";

type BoardCardProps = {
  title: string;
  isDone: boolean;
};

export function BoardCard({ title, isDone }: BoardCardProps) {
  return (
    <article className={`${styles.card} ${isDone ? styles.done : ""}`}>
      {title}
    </article>
  );
}