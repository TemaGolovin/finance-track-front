import { Button } from '@/shared/lib';
import { routes } from '@/shared/model/routes';
import { CircleCheckBig, ShieldCheck, TrendingUp } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

const keyWords = [
  {
    id: 'safe',
    title: 'landing.safe',
    icon: <ShieldCheck className="w-6 h-6" />,
  },
  {
    id: 'easy',
    title: 'landing.easy',
    icon: <CircleCheckBig className="w-6 h-6" />,
  },
  {
    id: 'comfortable',
    title: 'landing.comfortable',
    icon: <TrendingUp className="w-6 h-6" />,
  },
];

export default async function Page() {
  const t = await getTranslations();

  return (
    <div className="py-6 px-4 relative">
      <div className="absolute left-0 top-20 -z-10">
        <div className="absolute left-0 top-0 w-full h-full bg-base-200 opacity-30" />
        <img src="/img/main-img-landing.png" alt="family and finances" />
      </div>

      <h1 className="text-4xl mb-6 font-bold text-primary opacity-90">{t('landing.mainTitle')}.</h1>
      <h2 className="text-xl opacity-90 font-bold mb-6">{t('landing.mainDescription')}</h2>

      <Button size={'xl'} className="w-full mb-20" asChild>
        <Link href={routes.login}>{t('landing.startControl')}</Link>
      </Button>

      <div className="flex gap-2 justify-between mb-6">
        {keyWords.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-1 p-2 bg-secondary rounded-lg text-secondary-foreground"
          >
            {item.icon}
            <h3 className="font-bold">{t(item.title)}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
