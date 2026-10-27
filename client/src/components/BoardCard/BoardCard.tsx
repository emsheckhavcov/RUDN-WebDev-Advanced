import { useMutation, useQueryClient } from "@tanstack/react-query";
import styles from "./BoardCard.module.css";

type BoardCardProps = {
  id: string;
  title: string;
  isDone: boolean;
  onDelete: (id: string) => Promise<void>;
};

export function BoardCard({ id, title, isDone, onDelete }: BoardCardProps) {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: onDelete,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cards"] }),
  });

  function handleDelete() {
    if (!window.confirm(`Удалить карточку «${title}»?`)) {
      return;
    }

    deleteMutation.mutate(id);
  }

  return (
    <article className={`${styles.card} ${isDone ? styles.done : ""}`}>
      <div className={styles.content}>
        <span>{title}</span>
        <button
          className={styles.deleteButton}
          type="button"
          aria-label={`Удалить карточку: ${title}`}
          onClick={handleDelete}
          disabled={deleteMutation.isPending}
        >
          {deleteMutation.isPending ? "Удаление…" : "Удалить"}
        </button>
      </div>
      {deleteMutation.isError && (
        <p className={styles.error} role="alert">
          Не удалось удалить карточку. Попробуйте ещё раз.
        </p>
      )}
    </article>
  );
}