'use client';

import { useAboutMe, useResendVerification } from '@/shared/api/queries/auth';
import { ROUTES } from '@/shared/model/routes';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { toast } from 'sonner';
import { useBannerTop } from '../model/use-banner-top';

export const UnverifiedEmailBanner = () => {
  const t = useTranslations('unverifiedEmailBanner');
  const tVerify = useTranslations('verifyEmail');
  const pathname = usePathname();
  const { data: me } = useAboutMe();
  const { mutateAsync: resend, isPending } = useResendVerification();
  const top = useBannerTop();

  const email = me?.data.email;
  const emailVerified = me?.data.emailVerified;
  const hideOnVerifyFlow = pathname.startsWith(ROUTES.VERIFY_EMAIL);

  if (emailVerified !== false || hideOnVerifyFlow) {
    return null;
  }

  return (
    <aside
      style={{ top }}
      className="fixed right-2 z-40 w-56 rounded-lg border border-dashed border-foreground/15 bg-background/40 p-2 backdrop-blur-sm"
    >
      <p className="text-xs leading-snug text-muted-foreground">{t('message')}</p>
      <button
        type="button"
        className="mt-1 text-left text-sm font-semibold text-primary underline-offset-4 hover:underline disabled:opacity-50"
        disabled={!email || isPending}
        onClick={() => {
          if (!email) {
            return;
          }
          void toast.promise(resend(email), {
            loading: tVerify('resendLoading'),
            success: tVerify('resendSuccess'),
            error: (err: { message?: string }) => err?.message || tVerify('resendError'),
          });
        }}
      >
        {t('resend')}
      </button>
    </aside>
  );
};
