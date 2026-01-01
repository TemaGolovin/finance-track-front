'use client';
import { useAboutMe } from '@/shared/api/queries/auth';
import { ROUTES } from '@/shared/model/routes';
import { Button } from '@/shared/ui';
import { LogIn } from 'lucide-react';
import Link from 'next/link';

export const LoginAction = () => {
  const { data: user, isLoading } = useAboutMe();

  if (user || isLoading) {
    return null;
  }

  return (
    <Button size="icon" variant="default" asChild>
      <Link
        href={ROUTES.LOGIN}
        className="inline-flex items-center justify-center rounded-full p-2 hover:bg-base-200 transition-colors"
        title="Login"
        aria-label="Login"
      >
        <LogIn className="w-6 h-6" />
      </Link>
    </Button>
  );
};
