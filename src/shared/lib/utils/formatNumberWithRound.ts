import { formatNumberSpace } from './formatNumberSpace';
import { roundNumber } from './roundNumber';

export const formatNumberWithRound = (number: number, digitsAfterPoint = 2) => {
  const roundedNumber = roundNumber(number, digitsAfterPoint);
  return formatNumberSpace(roundedNumber.toFixed(digitsAfterPoint));
};
