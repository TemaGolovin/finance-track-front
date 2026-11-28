import { cva } from 'class-variance-authority';
import { ComponentProps } from 'react';
import { cn } from './utils/utils';

const textareaVariants = cva(
  'placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground border-input flex min-h-24 w-full min-w-0 rounded-md border focus:outline focus:outline-solid px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-y',
  {
    variants: {
      variant: {
        default: '',
        primary: 'text-primary-foreground border-primary hover:bg-primary/90 focus:outline-primary',
        destructive: 'border-destructive bg-destructive/15 focus:outline-destructive',
        secondary: 'text-secondary-foreground border-secondary focus:outline-secondary',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

interface TextareaProps extends ComponentProps<'textarea'> {
  variant?: 'default' | 'primary' | 'destructive' | 'secondary';
}

const Textarea: React.FC<TextareaProps> = ({ className, variant, ...props }) => {
  return (
    <textarea
      data-slot="textarea"
      className={cn(textareaVariants({ variant, className }))}
      {...props}
    />
  );
};

export { Textarea };
