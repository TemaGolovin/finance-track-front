import type { QueryClient, QueryKey } from '@tanstack/react-query';

/**
 * Помечает stale и перезапрашивает все совпадения по ключу, включая неактивные
 * (форма create/edit размонтировала список с refetchOnMount: false).
 * Возвращать из onSuccess мутации, чтобы mutateAsync дождался refetch до router.push.
 */
export function invalidateAndRefetchQueries(
  queryClient: QueryClient,
  queryKey: QueryKey,
): Promise<void> {
  return queryClient.invalidateQueries({
    queryKey,
    refetchType: 'all',
  });
}
