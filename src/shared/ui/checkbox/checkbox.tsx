'use client';

import { Checkbox as CheckboxPrimitive } from '@/shared/lib/shadcn/checkbox';
import { cn } from '@/shared/lib/shadcn/utils/utils';
import * as React from 'react';

export interface CheckboxProps extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive> {
  label?: React.ReactNode;
  error?: string;
}

export const Checkbox = React.forwardRef<
  React.ComponentRef<typeof CheckboxPrimitive>,
  CheckboxProps
>(({ className, label, error, id, ...props }, ref) => {
  return (
    <div className="mb-4">
      <div className="flex items-start gap-2.5">
        <CheckboxPrimitive
          ref={ref}
          className={cn(className, {
            'border-destructive': error,
          })}
          {...props}
          id={id}
        />
        {label != null && id != null ? (
          <label
            htmlFor={id}
            className="text-muted-foreground cursor-pointer text-left text-xs leading-snug max-w-96"
          >
            {label}
          </label>
        ) : null}
        {label != null && id == null ? (
          <span className="text-muted-foreground max-w-96 text-left text-xs leading-snug">
            {label}
          </span>
        ) : null}
      </div>
      <div className="text-destructive h-4 text-left text-xs">{error}</div>
    </div>
  );
});

Checkbox.displayName = 'Checkbox';
