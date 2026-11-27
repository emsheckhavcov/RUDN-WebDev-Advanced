# Отчёт о работе: KAN-4 «Отметить карточку выполненной»

**Ветка:** `feature/mark-card-done` · **Коммитов до архивации:** 11 · **Дата:** 2026-11-12

| Этап | Результат |
| --- | --- |
| Постановка | Согласованы `PATCH /cards/:id`, тело `{ "isDone": boolean }`, ответы `200`/`400`/`404`; созданы proposal, delta-спецификация и design. |
| Сервер | Добавлены операция сервиса, PATCH-контроллер, middleware валидации и маршрут. Сервис возвращает обновлённую карточку или `undefined` и не зависит от HTTP. |
| Клиент | Добавлен PATCH API и компактная кнопка установки/снятия отметки. После успеха инвалидируется React Query `["cards"]`; ошибка отображается на карточке. Изменены три клиентских файла. |
| Чек-лист и архив | Все пункты 1–4 отмечены после фактической проверки. Изменение архивировано в `openspec/changes/archive/2026-11-12-mark-card-done/`; capability опубликована в `openspec/specs/card-completion/spec.md`. |

## Проверки

- `cd server && npx tsc --noEmit -p tsconfig.json` — успешно.
- `npm --prefix client run build` — успешно.
- `openspec validate mark-card-done --type change` — изменение валидно.
- После архивации `openspec validate --all` — успешно, 3 проверки пройдены.
- `openspec validate --archived` — успешно, 3 архивированных изменения проверены.
- API: установка `true` и снятие в `false` вернули `200` с полной карточкой; последующий `GET` сохранил оба значения.
- API: неверное, отсутствующее и `null` значение `isDone` вернули `400`; неизвестный `id` вернул `404`; некорректный запрос не изменил карточку.
- Интегрированный браузер: проверены установка и снятие отметки, оба состояния сохранились после перезагрузки. Тестовую карточку вернул в исходное состояние.
- Интегрированный браузер: при смоделированном ответе PATCH `500` показано сообщение об ошибке, состояние карточки не изменилось.
- Пользователь подтвердил результат браузерной проверки.
- Поиск `req`, `res`, `Request`, `Response`, `status` в `server/services/cards.service.ts` совпадений не дал.

## История коммитов до архивации

- `fc94ab0` — `spec: mark card done`
- `1c5a98d` — `docs: add mark card done design`
- `17e86ba` — `docs: add mark card done tasks`
- `d3d0c3c` — `feat: add card completion service operation`
- `fe8782b` — `feat: add card completion controller`
- `19e5a03` — `feat: validate card completion updates`
- `8cad397` — `feat: add card completion route`
- `b020c97` — `feat: add card completion API request`
- `21404a8` — `feat: add card completion toggle to board`
- `8b0d7a3` — `fix: keep completion toggle compact`
- `a784c76` — `docs: mark card completion tasks verified`

Пользователь не вносил изменений в код или документы вручную; он подтвердил результат проверки в браузере.
