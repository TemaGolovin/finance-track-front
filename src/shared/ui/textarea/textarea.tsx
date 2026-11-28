import { Textarea as TextareaShadcn } from '@/shared/lib/shadcn/textarea';
import { ComponentProps } from 'react';

interface TextareaProps extends ComponentProps<typeof TextareaShadcn> {
  id?: string;
  label?: string;
  error?: string;
}

export const Textarea: React.FC<TextareaProps> = ({ id, label, error, ...props }) => {
  return (
    <>
      <label htmlFor={id} className="text-left">
        {label && <div className="text-left text-sm">{label}</div>}
        <TextareaShadcn id={id} variant={error ? 'destructive' : props?.variant} {...props} />
      </label>
      <div className="text-destructive text-xs h-4 text-left">{error}</div>
    </>
  );
};
