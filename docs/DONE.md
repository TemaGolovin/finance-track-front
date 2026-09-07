# Сделано

Закрытые задачи. Актуальный бэклог: [ROADMAP.md](./ROADMAP.md).

Стек: Next.js (фронт), NestJS + JWT + Prisma (бэкенд).

---

| Задача | Примечания |
|--------|------------|
| **Мультиязычность (i18n) на бэкенде** | `nestjs-i18n`, `AcceptLanguageResolver`, переводы по доменам (`errors`, `validation`, `userGroup`, `user`, `defaultCategories`); фронт передаёт `Accept-Language` из куки `NEXT_LOCALE` автоматически. Опционально позже: язык по умолчанию в профиле. |
| **Профиль и настройки (минимум)** | Страница профиля (`app/profile`, виджет `profile-overview`): `auth/me`, смена имени (`PATCH auth/profile`), смена пароля (`POST auth/change-password`), список сессий и отзыв (`GET` / `DELETE auth/sessions`), refresh по `deviceId`. |
| **Транзакционная email-рассылка** | `@nestjs-modules/mailer` + Nodemailer + Handlebars-шаблоны. Три флоу: подтверждение email при регистрации (+ повторная отправка / истёкшая ссылка), сброс пароля, подтверждение смены email в профиле. Бэкенд: поле `emailVerified` в `User`, модель `EmailToken` (`VERIFY_EMAIL` / `RESET_PASSWORD` / `CHANGE_EMAIL`), `EmailTokenService`, 6 эндпоинтов в `auth` и `user`. Фронт: `/verify-email`, `/verify-email/sent`, `/forgot-password`, `/reset-password`, `/confirm-email-change`, badge в профиле, форма смены email. Конфиг: `MAIL_HOST/PORT/USER/PASS/FROM` + `APP_URL`. |
| **Восстановление доступа** | `POST /auth/forgot-password` + `POST /auth/reset-password`. |
| **Верификация email** | `POST /auth/verify-email`, `POST /auth/resend-verification`, badge в профиле. Повторная отправка из профиля — ещё в бэклоге. |
| **IDOR: операции и категории; групповой просмотр операций** | **Бэкенд:** `GET/PUT/DELETE /operation/:id` — мутации только при `where: { id, userId }`; перед `create`/`update` операции проверяется `categoryId` текущего пользователя (`requireCategoryForUser`); `GET /category/:id` и `PUT /category/:id` — владелец из JWT, `update` через `updateMany({ id, userId })`. `GET /operation/:id` для участника группы: чтение чужой операции, если категория видна как в `getUserGroupOperations` (`UserGroupRepository.findOperationByIdVisibleToGroupMember`); изменение/удаление — только владельцу. В деталке при необходимости `user: { name }`. **Фронт:** edit/delete только если `operation.userId === me.id`; для чужой операции — блок «Автор операции». |
| **Локальные бэкапы PostgreSQL (Docker)** | **`finance-track-back`:** `scripts/backup-db.sh`, `scripts/restore-db.sh`, `BACKUP_GUIDE.md`, `backups/` в `.gitignore`. На **проде/стенде** отдельно: cron/systemd, проверка restore — см. [ROADMAP.md](./ROADMAP.md). |
| **Юридические документы (страницы + UX)** | `/privacy`, `/terms`; тексты в `src/shared/lib/legal/`; плейсхолдеры в `legal-public-meta.ts`; чекбокс согласия при регистрации; ссылки на входе. Перед публичным продом: реальные домен и реквизиты, при необходимости юрист. |
| **Редактирование группы — 404** | **Бэкенд:** `PATCH /user-group/:id` (`UpdateUserGroupDto`: `name`). Обновлять может только создатель группы (`FORBIDDEN_UPDATE`); чужая/несуществующая группа — 404. **Фронт:** кнопка редактирования только у создателя (`GroupInfoTab`). |
| **Полное удаление аккаунта** | **Бэкенд:** `POST /auth/delete-account` под JWT, тело `{ password }`; транзакция Prisma (маппинги, операции, категории, приглашения, членство; группы создателя — смена `creatorId` или удаление пустой группы; затем refresh/email-токены и `user`). **Фронт:** `src/feature/account-delete/`, мутация `useDeleteAccount`. |

---

## Ссылки на код

- Юридические документы: `src/shared/lib/legal/`, страницы `app/privacy/page.tsx`, `app/terms/page.tsx`; согласие — `src/feature/auth/ui/registration-form.tsx`
- Удаление аккаунта: `src/feature/account-delete/`, хук `src/shared/api/queries/auth/auth.ts` (`useDeleteAccount`)
- Редактирование группы: `PATCH /user-group/:id` — `finance-track-back` → `src/user-group/`; фронт — `useGroupUpdate`
- Бэкенд: `prisma/schema.prisma`; auth и удаление аккаунта — `src/auth/` (`POST delete-account`)
