import { ROUTES } from '@/shared/model/routes';
import Link from 'next/link';
import Image from 'next/image';

export const MainLogoAction = async () => {
  return (
    <Link href={ROUTES.MAIN}>
      <Image
        alt="logo"
        src="/logo/finance-track-logo.png"
        // className="sm:w-14"
        width={42}
        height={42}
      />
    </Link>
  );
};
