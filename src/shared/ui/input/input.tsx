import { Input as InputShadcn } from '@/shared/lib/shadcn/input';
import { ComponentProps } from 'react';

interface InputProps extends ComponentProps<typeof InputShadcn> {
  id?: string;
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ id, label, error, ...props }) => {
  return (
    <>
      <label htmlFor={id} className="text-left">
        {label && <div className="text-left text-sm">{label}</div>}
        <InputShadcn id={id} variant={error ? 'destructive' : props?.variant} {...props} />
      </label>
      <div className="text-destructive text-xs h-4 text-left">{error}</div>
    </>
  );
};
