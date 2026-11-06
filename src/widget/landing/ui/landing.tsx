import { cn } from '@/shared/lib/shadcn/utils/utils';
import { ROUTES } from '@/shared/model/routes';
import { Button } from '@/shared/ui';
import {
  ArrowDownRight,
  ArrowUpRight,
  CalendarRange,
  Link2,
  PenLine,
  PieChart,
  Tags,
  UserRound,
  Users,
  Wallet,
} from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { landingCategoryRows, landingFaq, landingFeatures, landingIndex } from '../model/content';
import { LandingFaq } from './landing-faq';
import './landing.css';

const featureIcons = {
  operations: Wallet,
  categories: Tags,
  invites: Users,
  groupStat: PieChart,
  personalStat: UserRound,
  author: PenLine,
  period: CalendarRange,
  mapping: Link2,
} as const;

const tone = {
  page: 'bg-[#fff4ea] text-[#24180f] dark:bg-[#120d18] dark:text-[#f6efe6]',
  orbA: 'bg-fuchsia-300/80 dark:bg-fuchsia-600/40',
  orbB: 'bg-amber-300/80 dark:bg-amber-500/30',
  orbC: 'bg-emerald-300/70 dark:bg-emerald-500/25',
  nav: 'text-[#5c4e44] dark:text-white/80',
  navLink: 'hover:text-[#24180f] dark:hover:text-white',
  kicker: 'text-orange-700 dark:text-amber-200',
  lead: 'text-[#4a382c] dark:text-white/75',
  outline:
    'rounded-full border-[#24180f]/15 bg-white text-[#24180f] hover:bg-orange-50 hover:text-[#24180f] dark:border-white/20 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:hover:text-white',
  card: 'border-orange-100 bg-white/95 shadow-xl shadow-orange-200/70 dark:border-white/10 dark:bg-[#1b1524]/95 dark:shadow-none',
  muted: 'text-[#6b584c] dark:text-white/60',
  period: 'bg-orange-50 text-orange-900 dark:bg-white/10 dark:text-[#f6efe6]',
  income: 'bg-emerald-50 dark:bg-emerald-400/15',
  incomeLabel: 'text-emerald-800 dark:text-emerald-200',
  expense: 'bg-rose-50 dark:bg-rose-400/15',
  expenseLabel: 'text-rose-800 dark:text-rose-200',
  donutHole: 'bg-white text-[#6b584c] dark:bg-[#1b1524] dark:text-white/70',
  row: 'text-[#5c4e44] dark:text-white/70',
  track: 'bg-black/10 dark:bg-white/10',
  rule: 'border-[#24180f]/10 dark:border-white/10',
  indexNo: 'text-orange-700 dark:text-amber-200',
  body: 'text-[#4a382c] dark:text-white/70',
  faq: 'rounded-3xl border border-orange-100 bg-white px-5 py-4 shadow-sm dark:border-white/10 dark:bg-white/5 dark:shadow-none',
  footer: 'text-[#6b584c] dark:text-white/60',
};

export async function Landing() {
  const t = await getTranslations('landing');
  const tCommon = await getTranslations('common');
  const tLegal = await getTranslations('legal');
  const initials = t('sample.initials').split(' ');

  return (
    <div className={cn('landing-root relative overflow-hidden', tone.page)}>
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div
          className={cn(
            'landing-orb absolute -left-20 top-0 size-[36rem] rounded-full blur-3xl',
            tone.orbA,
          )}
        />
        <div
          className={cn(
            'landing-orb absolute right-0 top-24 size-[32rem] rounded-full blur-3xl [animation-delay:-7s]',
            tone.orbB,
          )}
        />
        <div
          className={cn(
            'landing-orb absolute bottom-0 left-1/3 size-[28rem] rounded-full blur-3xl [animation-delay:-12s]',
            tone.orbC,
          )}
        />
      </div>

      <nav
        aria-label={t('navLabel')}
        className={cn(
          'relative mx-auto flex max-w-6xl flex-wrap items-center gap-x-5 gap-y-2 px-5 py-6 text-sm font-medium',
          tone.nav,
        )}
      >
        <a className={tone.navLink} href="#stage">
          {t('navStage')}
        </a>
        <a className={tone.navLink} href="#index">
          {t('navIndex')}
        </a>
        <a className={tone.navLink} href="#features">
          {t('navFeatures')}
        </a>
        <a className={tone.navLink} href="#faq">
          {t('navFaq')}
        </a>
        <Link className={cn('ml-auto', tone.navLink)} href={ROUTES.LOGIN}>
          {tCommon('login')}
        </Link>
      </nav>

      <section
        aria-labelledby="stage-title"
        className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 lg:grid-cols-[0.9fr_1.1fr]"
      >
        <div className="landing-rise lg:sticky lg:top-6">
          <p className={cn('text-sm font-semibold uppercase tracking-[0.18em]', tone.kicker)}>
            {t('kicker')}
          </p>
          <h1
            id="stage-title"
            className="mt-4 text-5xl font-semibold leading-[0.95] tracking-tight sm:text-6xl"
          >
            {t('title')}
          </h1>
          <p className={cn('mt-5 text-lg leading-relaxed', tone.lead)}>{t('lead')}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              size="xl"
              className="rounded-full bg-amber-300 text-[#24140c] hover:bg-amber-200"
            >
              <Link href={ROUTES.REGISTER}>{t('start')}</Link>
            </Button>
            <Button asChild size="xl" variant="outline" className={tone.outline}>
              <Link href={ROUTES.LOGIN}>{tCommon('login')}</Link>
            </Button>
          </div>
        </div>

        <div id="stage" className="relative">
          <div className="landing-ring absolute -inset-3 rounded-[2.2rem] bg-[conic-gradient(from_120deg,#f59e0b,#10b981,#a78bfa,#fb7185,#f59e0b)] opacity-80 blur-[1px]" />
          <article
            className={cn('relative rounded-[2rem] border p-5 shadow-2xl sm:p-7', tone.card)}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className={cn('text-sm', tone.muted)}>{t('sample.groupLabel')}</p>
                <p className="text-2xl font-semibold">{t('sample.groupName')}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <p className={cn('rounded-full px-3 py-1 text-sm', tone.period)}>
                  {t('sample.example')}
                </p>
                <p className={cn('text-sm', tone.muted)}>{t('sample.period')}</p>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <p className={cn('rounded-2xl px-4 py-3', tone.income)}>
                <span className={cn('flex items-center gap-1 text-sm', tone.incomeLabel)}>
                  <ArrowUpRight className="size-4" aria-hidden />
                  {tCommon('income')}
                </span>
                <span className="mt-1 block text-2xl font-semibold">{t('sample.income')}</span>
              </p>
              <p className={cn('rounded-2xl px-4 py-3', tone.expense)}>
                <span className={cn('flex items-center gap-1 text-sm', tone.expenseLabel)}>
                  <ArrowDownRight className="size-4" aria-hidden />
                  {tCommon('expenses')}
                </span>
                <span className="mt-1 block text-2xl font-semibold">{t('sample.expense')}</span>
              </p>
            </div>
            <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-center">
              <div className="relative mx-auto size-36 shrink-0" aria-hidden>
                <div
                  className="landing-ring size-full rounded-full"
                  style={{
                    background:
                      'conic-gradient(#fbbf24 0 34%, #34d399 34% 61%, #a78bfa 61% 82%, #fb7185 82% 100%)',
                  }}
                />
                <div
                  className={cn(
                    'absolute inset-4 grid place-items-center rounded-full text-sm',
                    tone.donutHole,
                  )}
                >
                  {t('sample.categoriesLabel')}
                </div>
              </div>
              <ul className="flex-1 space-y-3">
                {landingCategoryRows.map((row) => (
                  <li key={row.id}>
                    <div className={cn('mb-1 flex justify-between text-sm', tone.row)}>
                      <span>{t(`sample.categories.${row.id}`)}</span>
                    </div>
                    <div className={cn('h-2 overflow-hidden rounded-full', tone.track)}>
                      <div
                        className={cn('landing-bar h-full rounded-full', row.color, row.width)}
                        style={{ animationDelay: row.delay }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <ul className="mt-6 flex gap-2" aria-label={t('sample.membersLabel')}>
              {initials.map((letter) => (
                <li
                  key={letter}
                  className="grid size-10 place-items-center rounded-full bg-gradient-to-br from-amber-300 to-orange-500 text-sm font-bold text-[#24140c]"
                >
                  {letter}
                </li>
              ))}
              <li className={cn('grid h-10 place-items-center px-2 text-sm', tone.muted)}>
                {t('sample.authorNote')}
              </li>
            </ul>
          </article>
        </div>
      </section>

      <section
        id="index"
        aria-labelledby="index-title"
        className={cn('relative border-t', tone.rule)}
      >
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h2 id="index-title" className="text-4xl font-semibold tracking-tight sm:text-5xl">
            {t('indexTitle')}
          </h2>
          <ol className="mt-8">
            {landingIndex.map((item, index) => (
              <li
                key={item.id}
                className={cn(
                  'grid gap-3 border-b py-7 sm:grid-cols-[5rem_1fr] sm:gap-8',
                  tone.rule,
                )}
              >
                <p className={cn('font-mono text-3xl', tone.indexNo)}>
                  {String(index + 1).padStart(2, '0')}
                </p>
                <div>
                  <h3 className="text-2xl font-semibold">{t(item.titleKey)}</h3>
                  <p className={cn('mt-2 max-w-3xl text-lg leading-relaxed', tone.body)}>
                    {t(item.textKey)}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        id="features"
        aria-labelledby="features-title"
        className={cn('relative border-t', tone.rule)}
      >
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h2 id="features-title" className="text-4xl font-semibold tracking-tight sm:text-5xl">
            {t('featuresTitle')}
          </h2>
          <p className={cn('mt-4 max-w-3xl text-lg leading-relaxed', tone.body)}>
            {t('featuresLead')}
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {landingFeatures.map((item) => {
              const Icon = featureIcons[item.id];
              return (
                <li key={item.id} className={cn('px-5 py-4', tone.faq)}>
                  <h3 className="flex items-center gap-3 text-xl font-semibold">
                    <Icon className="size-5 shrink-0" aria-hidden />
                    {t(item.titleKey)}
                  </h3>
                  <p className={cn('mt-2 leading-relaxed', tone.body)}>{t(item.textKey)}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <LandingFaq
        title={t('faqTitle')}
        items={landingFaq.map((item) => ({
          id: item.id,
          question: t(item.questionKey),
          answer: t(item.answerKey),
        }))}
      />

      <section
        aria-labelledby="stage-cta"
        className="relative mx-5 overflow-hidden rounded-[2.5rem] px-6 py-14 sm:px-12"
      >
        <div
          className="landing-pan absolute inset-0 bg-gradient-to-r from-orange-500 via-fuchsia-500 to-emerald-400"
          aria-hidden
        />
        <div className="relative flex flex-col items-start justify-between gap-6 text-[#1a1020] lg:flex-row lg:items-end">
          <h2 id="stage-cta" className="max-w-xl text-4xl font-semibold tracking-tight sm:text-5xl">
            {t('ctaTitle')}
          </h2>
          <Button asChild size="xl" className="rounded-full bg-[#1a1020] text-white hover:bg-black">
            <Link href={ROUTES.REGISTER}>{tCommon('register')}</Link>
          </Button>
        </div>
      </section>

      <footer
        className={cn(
          'relative mx-auto mt-10 flex max-w-6xl flex-col gap-3 px-5 pb-10 text-sm sm:flex-row sm:justify-between',
          tone.footer,
        )}
      >
        <p>Finance Tracker</p>
        <nav aria-label={t('docsLabel')} className="flex flex-wrap gap-4">
          <Link className="underline underline-offset-4" href={ROUTES.PRIVACY}>
            {tLegal('privacyPolicy')}
          </Link>
          <Link className="underline underline-offset-4" href={ROUTES.TERMS}>
            {tLegal('userAgreement')}
          </Link>
        </nav>
      </footer>
    </div>
  );
}
