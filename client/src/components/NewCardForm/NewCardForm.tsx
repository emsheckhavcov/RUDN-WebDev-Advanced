import { useState } from "react";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { createCard } from "../../api/cards";
import styles from "./NewCardForm.module.css";

export function NewCardForm() {
  const [title, setTitle] = useState("");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createCard,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cards"],
      });
      setTitle("");
    },
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return;
    }

    mutation.mutate(trimmedTitle);
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        placeholder="Название карточки"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        disabled={mutation.isPending}
      />

      <button
        className={styles.button}
        type="submit"
        disabled={mutation.isPending}
      >
        {mutation.isPending ? "Добавление…" : "Добавить"}
      </button>
    </form>
  );
}