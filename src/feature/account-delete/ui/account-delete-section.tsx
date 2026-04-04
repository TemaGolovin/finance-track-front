'use client';

import { useDeleteAccount } from '@/shared/api/queries/auth';
import { ROUTES } from '@/shared/model/routes';
import { Button, Drawer, InputPassword } from '@/shared/ui';
import { Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export const AccountDeleteSection = () => {
  const t = useTranslations('profile');
  const router = useRouter();
  const { mutateAsync: deleteAccount } = useDeleteAccount();

  const [password, setPassword] = useState('');

  const handleDelete = async (onClose: () => void) => {
    await toast.promise(deleteAccount(password), {
      loading: t('deleteAccountLoading'),
      success: t('deleteAccountSuccess'),
      error: (err) => err?.message || t('deleteAccountError'),
    });
    setPassword('');
    onClose();
    router.push(ROUTES.HOME);
  };

  return (
    <div className="rounded-md border border-destructive/40 p-3 flex flex-col gap-3">
      <div className="text-destructive text-sm font-medium">{t('deleteAccountSection')}</div>
      <p className="text-xs text-muted-foreground">{t('deleteAccountWarning')}</p>
      <Drawer
        title={t('deleteAccountDrawerTitle')}
        description={t('deleteAccountDrawerDescription')}
        trigger={
          <Button variant="destructive" className="w-full">
            <Trash2 className="w-5 h-5" />
            {t('deleteAccountButton')}
          </Button>
        }
        renderContent={(onClose) => (
          <div className="flex flex-col gap-3">
            <label htmlFor="delete-account-password" className="text-sm text-muted-foreground">
              {t('deleteAccountPasswordLabel')}
            </label>
            <InputPassword
              id="delete-account-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••"
            />
            <Button
              variant="destructive"
              className="w-full"
              disabled={!password}
              onClick={() => handleDelete(onClose)}
            >
              {t('deleteAccountConfirm')}
            </Button>
          </div>
        )}
      />
    </div>
  );
};
