import { I18nSwitcher, ThemeSwitcher } from '@/feature';
import { routes } from '@/shared/model/routes';
import Image from 'next/image';
import Link from 'next/link';
import { LogIn } from 'lucide-react';
import { Button } from '@/shared/lib';

export const Header = async () => {
  return (
    <header className="bg-base-300 border-b border-border py-0.5">
      <div className="container mx-auto px-2 sm:px-0 flex justify-between items-center">
        <Link href={routes.home}>
          <Image
            alt="logo"
            src="/logo/finance-track-logo.png"
            className="sm:w-14"
            width={56}
            height={56}
          />
        </Link>

        <div>
          <ThemeSwitcher />
          <I18nSwitcher />
          <Button size="icon" variant="default" asChild>
            <Link
              href={routes.login}
              className="inline-flex items-center justify-center rounded-full p-2 hover:bg-base-200 transition-colors"
              title="Login"
              aria-label="Login"
            >
              <LogIn className="w-6 h-6" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};
