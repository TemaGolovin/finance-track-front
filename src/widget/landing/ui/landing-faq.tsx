'use client';

import { cn } from '@/shared/lib/shadcn/utils/utils';
import { Plus } from 'lucide-react';
import { useState } from 'react';

type LandingFaqItem = {
  id: string;
  question: string;
  answer: string;
};

type LandingFaqProps = {
  title: string;
  items: readonly LandingFaqItem[];
};

export function LandingFaq({ title, items }: LandingFaqProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section id="faq" aria-labelledby="faq-title" className="relative mx-auto max-w-6xl px-5 py-16">
      <h2 id="faq-title" className="text-4xl font-semibold tracking-tight">
        {title}
      </h2>
      <ul className="mt-8 border-t border-[#24180f]/10 dark:border-white/10">
        {items.map((item) => {
          const open = openId === item.id;
          const answerId = `faq-${item.id}`;

          return (
            <li key={item.id} className="border-b border-[#24180f]/10 dark:border-white/10">
              <h3>
                <button
                  type="button"
                  className="flex w-full cursor-pointer items-center gap-3 py-3.5 text-left"
                  aria-expanded={open}
                  aria-controls={answerId}
                  onClick={() => setOpenId((current) => (current === item.id ? null : item.id))}
                >
                  <Plus
                    className={cn(
                      'size-4 shrink-0 text-orange-700 transition-transform duration-300 motion-reduce:transition-none dark:text-amber-200',
                      open && 'rotate-45',
                    )}
                    aria-hidden
                  />
                  <span
                    className={cn(
                      'flex-1 text-lg font-semibold',
                      open && 'text-orange-800 dark:text-amber-100',
                    )}
                  >
                    {item.question}
                  </span>
                </button>
              </h3>
              <div
                id={answerId}
                className={cn(
                  'grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none',
                  open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
                )}
              >
                <div
                  className={cn(
                    'min-h-0 overflow-hidden transition-opacity duration-300 motion-reduce:transition-none',
                    open ? 'opacity-100' : 'opacity-0',
                  )}
                  inert={!open}
                  aria-hidden={!open}
                >
                  <div className="flex gap-3 pb-4">
                    <span className="w-4 shrink-0" aria-hidden />
                    <p className="border-l border-orange-400 pl-4 leading-relaxed text-[#4a382c] dark:text-white/70">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
