import { ConfirmEmailChangeView } from '@/feature/auth-verify-email';
import { getTranslations } from 'next-intl/server';

interface Props {
  searchParams: Promise<{ token?: string }>;
}

export default async function ConfirmEmailChangePage({ searchParams }: Props) {
  const t = await getTranslations('confirmEmailChange');
  const { token } = await searchParams;

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-62px)]">
      <div className="bg-card p-8 rounded-lg border shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-6">{t('title')}</h1>
        {token ? (
          <ConfirmEmailChangeView token={token} />
        ) : (
          <p className="text-muted-foreground">{t('errorExpired')}</p>
        )}
      </div>
    </div>
  );
}
