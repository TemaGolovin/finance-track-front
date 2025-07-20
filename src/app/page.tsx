import { Button } from '@/shared/lib';
import { routes } from '@/shared/model/routes';
import { CircleCheckBig, ShieldCheck, TrendingUp } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

const keyWords = [
  {
    id: 'safe',
    title: 'landing.safe',
    icon: <ShieldCheck className="w-6 h-6 md:h-10 md:w-10" />,
  },
  {
    id: 'easy',
    title: 'landing.easy',
    icon: <CircleCheckBig className="w-6 h-6 md:h-10 md:w-10" />,
  },
  {
    id: 'comfortable',
    title: 'landing.comfortable',
    icon: <TrendingUp className="w-6 h-6 md:h-10 md:w-10" />,
  },
];

export default async function Page() {
  const t = await getTranslations();

  return (
    <div className="py-6 px-4 sm:py-10 sm:px-8 md:py-16 md:px-0 relative flex justify-center">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row-reverse lg:items-start gap-6">
          <div className="absolute left-0 top-20 -z-10 w-full flex justify-center lg:relative lg:-top-10">
            <div className="absolute left-0 top-0 w-full h-full bg-base-200 opacity-30 md:hidden" />
            <img
              src="/img/main-img-landing.png"
              alt="family and finances"
              className="w-full max-w-xs sm:max-w-md md:max-w-[50%] lg:max-w-2xl xl:max-w-3xl mx-auto object-contain md:min-w-md"
            />
          </div>

          <div>
            <h1 className="text-4xl sm:text-5xl mb-6 font-bold text-primary opacity-90 text-center">
              {t('landing.mainTitle')}.
            </h1>
            <h2 className="text-xl sm:text-2xl opacity-90 font-bold mb-6 text-center">
              {t('landing.mainDescription')}
            </h2>

            <Button
              size={'xl'}
              className="w-full mb-20 md:mb-24 lg:mb-32 text-lg md:text-xl whitespace-pre-wrap min-h-max text-center"
              asChild
            >
              <Link href={routes.login}>{t('landing.startControl')}</Link>
            </Button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row md:grid md:grid-cols-3 gap-4 md:gap-6 justify-between mb-6">
          {keyWords.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-2 p-4 bg-secondary rounded-lg text-secondary-foreground justify-center md:items-center md:gap-4 shadow-md"
            >
              {item.icon}
              <h3 className="font-bold text-base sm:text-lg md:text-xl text-center">
                {t(item.title)}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
