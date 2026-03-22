'use client';
import { useAboutMe, useLogout } from '@/shared/api/queries/auth';
import { cn } from '@/shared/lib/shadcn/utils/utils';
import { ROUTES } from '@/shared/model/routes';
import { Button } from '@/shared/ui';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface LogoutActionProps {
  btnClassName?: string;
  children?: React.ReactNode;
  onSuccessAdditional?: () => void;
}

export const LogoutAction = ({
  btnClassName,
  children,
  onSuccessAdditional,
}: LogoutActionProps) => {
  const { data: user } = useAboutMe();
  const { mutate: logout, isPending } = useLogout();
  const router = useRouter();

  if (!user) {
    return null;
  }

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        router.push(ROUTES.HOME);
        onSuccessAdditional?.();
      },
    });
  };

  return (
    <Button
      size="icon"
      disabled={isPending}
      onClick={handleLogout}
      className={cn(
        'inline-flex items-center border border-solid text-destructive hover:text-foreground hover:bg-destructive border-destructive justify-center p-2 transition-colors',
        btnClassName,
      )}
      title="Logout"
      aria-label="Logout"
    >
      {children || <LogOut className="w-6 h-6" />}
    </Button>
  );
};
