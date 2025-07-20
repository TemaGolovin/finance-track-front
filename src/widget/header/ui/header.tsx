import { I18nSwitcher, ThemeSwitcher } from '@/feature';
import { routes } from '@/shared/model/routes';
import Image from 'next/image';
import Link from 'next/link';

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
        </div>
      </div>
    </header>
  );
};
