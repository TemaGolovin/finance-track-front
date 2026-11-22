import { hasAuthSession } from '@/shared/lib/auth/has-auth-session';
import { ROUTES } from '@/shared/model/routes';
import { RegisterWidget } from '@/widget/auth/';
import { redirect } from 'next/navigation';

export default async function RegisterPage() {
  if (await hasAuthSession()) {
    redirect(ROUTES.MAIN);
  }

  return <RegisterWidget />;
}
