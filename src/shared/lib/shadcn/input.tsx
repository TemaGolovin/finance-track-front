import { ComponentProps } from 'react';
import { cn } from './utils/utils';
import { cva } from 'class-variance-authority';

const inputVariants = cva(
  'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground border-input flex h-9 w-full min-w-0 rounded-md border focus:outline focus:outline-solid px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
  {
    variants: {
      variant: {
        default: '',
        primary: 'text-primary-foreground border-primary hover:bg-primary/90 focus:outline-primary',
        destructive: 'border-destructive bg-destructive/15 focus:outline-destructive',
        secondary: 'text-secondary-foreground border-secondary focus:outline-secondary',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5 text-sm',
        lg: 'h-10 rounded-md px-6 text-md has-[>svg]:px-4',
        xl: 'h-12 rounded-md px-8 text-md has-[>svg]:px-6 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

interface InputProps extends ComponentProps<'input'> {
  inputSize?: 'default' | 'sm' | 'lg' | 'xl';
  variant?: 'default' | 'primary' | 'destructive' | 'secondary';
}

const Input: React.FC<InputProps> = ({
  className,
  inputSize,
  variant,
  type = 'text',
  ...props
}) => {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(inputVariants({ variant, size: inputSize, className }))}
      {...props}
    />
  );
};

export { Input };
