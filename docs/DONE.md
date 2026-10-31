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
| **BFF: refresh для PUT/POST/PATCH** | После 401 повтор идёт с тем же `Content-Type` / `Accept-Language`, что исходный запрос; новый access берётся из JSON refresh (`token`), а не из `cookies()` исходного запроса. Set-Cookie с refresh прокидывается клиенту через `getSetCookie()`. На бэкенд не форвардятся лишние клиентские заголовки. |
| **Протухшая сессия (BFF 401 JSON)** | При неудачном refresh BFF отдаёт `401` с `{ code: 'SESSION_EXPIRED' }`, сбрасывает auth-куки; `instanceFetch` перенаправляет на `/login`. |
| **Куки при HTTPS** | `getAuthCookieOptions()` в бэкенде: `COOKIE_SECURE` или `NODE_ENV=production`. `clearCookie` с теми же опциями. |
| **Парсинг Cookie для refresh** | `RefreshTokenStrategy` читает `req.cookies.refreshToken` вместо `split('=')`. |
| **Сверка refresh с хешем в БД** | `AuthService.refresh`: cookie сверяется с bcrypt в `RefreshToken` через SHA-256 digest (обход лимита bcrypt 72 байта); в refresh JWT — `jti`; при reuse — отзыв сессии устройства и 401. Legacy-хеши (bcrypt от полного JWT) принимаются до следующей ротации. |
| **Цвет и иконка категории при редактировании** | **Бэкенд:** `UpdateCategoryDto` — `color`, `icon`, `categoryType`; `CategoryRepository.updateCategory` сохраняет все поля, не только `name`. |
| **Инвалидация кэша после create/update** | **Фронт:** `invalidateAndRefetchQueries` — `invalidateQueries` с `refetchType: 'all'` (не только активные запросы); `onSuccess` возвращает Promise, чтобы `mutateAsync` завершался после refetch до `router.push`. |
| **Фильтр групповых операций по категории** | **Бэкенд:** при `categoryId` (group category) всегда фильтр по мапам; если мапов нет — пустой список, не все операции группы. `UserGroupRepository.getUserGroupOperations`. E2e: `test/user-group.e2e-spec.ts`. |
| **Мапы после выхода / кика** | **Бэкенд:** в одной транзакции с удалением членства — `personalCategoryMap.deleteMany({ userId, groupId })`. `removeUserFromGroup` (выход, кик через `removeMember`). E2e в `test/user-group.e2e-spec.ts`. |

---

## Ссылки на код

- Юридические документы: `src/shared/lib/legal/`, страницы `app/privacy/page.tsx`, `app/terms/page.tsx`; согласие — `src/feature/auth/ui/registration-form.tsx`
- Удаление аккаунта: `src/feature/account-delete/`, хук `src/shared/api/queries/auth/auth.ts` (`useDeleteAccount`)
- Редактирование группы: `PATCH /user-group/:id` — `finance-track-back` → `src/user-group/`; фронт — `useGroupUpdate`
- Бэкенд: `prisma/schema.prisma`; auth и удаление аккаунта — `src/auth/` (`POST delete-account`)
- BFF proxy + refresh retry: `src/app/api/[...path]/route.ts`
- Категории (update): `finance-track-back` → `src/category/dto/update-category.dto.ts`, `category.repository.ts`
- Refetch кэша после мутаций: `src/shared/api/lib/invalidate-and-refetch-queries.ts`, хуки в `src/shared/api/queries/`
