'use client';

import { cn } from '@/shared/lib/shadcn/utils/utils';
import { useTranslations } from 'next-intl';
import { useLayoutEffect, useRef, useState } from 'react';
import { computeVisibleMemberCount } from '../lib/compute-visible-member-count';

type MemberTagsProps = {
  names: string[];
  active?: boolean;
};

export const MemberTags = ({ names, active = false }: MemberTagsProps) => {
  const scopeT = useTranslations('groupScope');
  const measureRef = useRef<HTMLSpanElement>(null);
  const [visibleCount, setVisibleCount] = useState(names.length);
  const namesKey = names.join('\u0001');

  useLayoutEffect(() => {
    const measureRoot = measureRef.current;
    const total = namesKey === '' ? 0 : namesKey.split('\u0001').length;

    if (!measureRoot || total === 0) {
      setVisibleCount(0);
      return;
    }

    const recompute = () => {
      setVisibleCount(
        computeVisibleMemberCount(measureRoot, total, (hiddenCount) =>
          scopeT('membersMore', { count: hiddenCount }),
        ),
      );
    };

    recompute();
    const observer = new ResizeObserver(recompute);
    observer.observe(measureRoot);
    return () => observer.disconnect();
  }, [namesKey, scopeT]);

  if (names.length === 0) return null;

  const visible = names.slice(0, visibleCount);
  const rest = names.length - visible.length;
  const chipClass = cn(
    'max-w-full truncate rounded-md px-1.5 py-0.5 text-[11px] leading-tight',
    active ? 'bg-primary-foreground/15' : 'bg-muted text-muted-foreground',
  );

  return (
    <span className="relative block max-w-full">
      <span
        ref={measureRef}
        aria-hidden
        className="pointer-events-none invisible absolute inset-x-0 top-0 flex flex-wrap gap-1"
      >
        {names.map((name) => (
          <span key={name} data-name className={chipClass}>
            {name}
          </span>
        ))}
        <span data-rest className={cn(chipClass, 'font-medium')} />
      </span>

      <span className="flex max-w-full flex-wrap gap-1">
        {visible.map((name) => (
          <span key={name} className={chipClass}>
            {name}
          </span>
        ))}
        {rest > 0 && (
          <span className={cn(chipClass, 'font-medium')}>
            {scopeT('membersMore', { count: rest })}
          </span>
        )}
      </span>
    </span>
  );
};
