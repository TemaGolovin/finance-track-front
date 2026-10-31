export const stripDecimalInputFormatting = (value: string): string => value.replace(/\s/g, '');

export const formatDecimalInputWithSpaceSeparators = (value: string): string => {
  const stripped = stripDecimalInputFormatting(value);
  if (!stripped) return '';

  const match = stripped.match(/^(-?)(\d*)([.,]?)(\d*)$/);
  if (!match) return stripped;

  const [, sign, intPart, sep, decPart] = match;
  const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  if (sep || decPart.length > 0) {
    return `${sign}${formattedInt}${sep}${decPart}`;
  }
  return `${sign}${formattedInt}`;
};

export const parseDecimalInputToNumber = (value: string): number =>
  Number(stripDecimalInputFormatting(value).replace(',', '.'));
