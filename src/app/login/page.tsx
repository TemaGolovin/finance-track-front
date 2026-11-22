import { hasAuthSession } from '@/shared/lib/auth/has-auth-session';
import { ROUTES } from '@/shared/model/routes';
import { LoginWidget } from '@/widget/auth';
import { redirect } from 'next/navigation';

export default async function LoginPage() {
  if (await hasAuthSession()) {
    redirect(ROUTES.MAIN);
  }

  return <LoginWidget />;
}
