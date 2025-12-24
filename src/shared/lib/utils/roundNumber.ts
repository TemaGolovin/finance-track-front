export const roundNumber = (num: number, digitsAfterPoint: number) => Math.round(
  num * (10 ** digitsAfterPoint),
) / (10 ** digitsAfterPoint);
