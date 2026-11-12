import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCardDone } from "../../api/cards";
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
  const completionMutation = useMutation({
    mutationFn: (nextIsDone: boolean) => updateCardDone(id, nextIsDone),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cards"] }),
  });

  function handleDelete() {
    if (!window.confirm(`Удалить карточку «${title}»?`)) {
      return;
    }

    deleteMutation.mutate(id);
  }

  function handleToggleDone() {
    completionMutation.mutate(!isDone);
  }

  return (
    <article className={`${styles.card} ${isDone ? styles.done : ""}`}>
      <div className={styles.content}>
        <span>{title}</span>
        <button
          className={styles.toggleButton}
          type="button"
          aria-label={`${isDone ? "Снять отметку" : "Отметить выполненной"}: ${title}`}
          onClick={handleToggleDone}
          disabled={completionMutation.isPending || deleteMutation.isPending}
        >
          {completionMutation.isPending
            ? "Сохранение…"
            : isDone
              ? "Снять отметку"
              : "Отметить выполненной"}
        </button>
        <button
          className={styles.deleteButton}
          type="button"
          aria-label={`Удалить карточку: ${title}`}
          onClick={handleDelete}
          disabled={deleteMutation.isPending || completionMutation.isPending}
        >
          {deleteMutation.isPending ? "Удаление…" : "Удалить"}
        </button>
      </div>
      {completionMutation.isError && (
        <p className={styles.error} role="alert">
          Не удалось изменить статус карточки. Попробуйте ещё раз.
        </p>
      )}
      {deleteMutation.isError && (
        <p className={styles.error} role="alert">
          Не удалось удалить карточку. Попробуйте ещё раз.
        </p>
      )}
    </article>
  );
}