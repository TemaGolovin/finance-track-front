import { Input as InputShadcn } from '@/shared/lib/shadcn/input';
import { ComponentProps } from 'react';

const clearInvalidSymbols = (
  value: string,
  amountSymbolsAfterDot: number,
  isOnlyPositive: boolean,
) => {
  const allowNegative = !isOnlyPositive;
  const decimalSeparators = amountSymbolsAfterDot !== 0 ? '.,' : '';

  const allowedCharacters = `0-9${allowNegative ? '-' : ''}${decimalSeparators}`;
  const filterInvalidCharsRegex = new RegExp(`[^${allowedCharacters}]`, 'g');

  const numberStructureRegex = new RegExp(
    `^(-?\\d*)${decimalSeparators ? '([.,]?)' : ''}(\\d{0,${amountSymbolsAfterDot}}).*`,
  );

  const replacedGroup = decimalSeparators ? '$1$2$3' : '$1$2';

  return value.replace(filterInvalidCharsRegex, '').replace(numberStructureRegex, replacedGroup);
};

interface InputProps extends ComponentProps<typeof InputShadcn> {
  id?: string;
  label?: string;
  error?: string;
  isInputModeDecimal?: boolean;
  amountSymbolsAfterDot?: number;
  isOnlyPositive?: boolean;
}

export const Input: React.FC<InputProps> = ({
  id,
  label,
  error,
  isInputModeDecimal,
  amountSymbolsAfterDot = 2,
  isOnlyPositive = true,
  ...props
}) => {
  const additionalInputProps: Partial<ComponentProps<typeof Input>> = isInputModeDecimal
    ? {
        type: 'text',
        inputMode: 'decimal',
        onChange: (e) => {
          if (e.target.value.startsWith('.')) e.target.value = e.target.value.replace('.', '');
          if (e.target.value.startsWith(',')) e.target.value = e.target.value.replace(',', '');

          e.target.value = clearInvalidSymbols(
            e.target.value,
            amountSymbolsAfterDot,
            isOnlyPositive,
          );

          props?.onChange?.(e);
        },
        onBlur: (e) => {
          e.target.value = e.target.value.replace(/^(.*)([.,]$)/g, '$1');
          props?.onBlur?.(e);
          props?.onChange?.(e);
        },
      }
    : {};

  return (
    <>
      <label htmlFor={id} className="text-left">
        {label && <div className="text-left text-sm">{label}</div>}
        <InputShadcn
          id={id}
          variant={error ? 'destructive' : props?.variant}
          {...props}
          {...additionalInputProps}
        />
      </label>
      <div className="text-destructive text-xs h-4 text-left">{error}</div>
    </>
  );
};
