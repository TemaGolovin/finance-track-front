const MAX_LINES = 2;
const ROW_GAP_PX = 4;

/** Counts how many name chips fit in MAX_LINES inside `root`, leaving room for a +N chip. */
export const computeVisibleMemberCount = (
  root: HTMLElement,
  total: number,
  formatRest: (hiddenCount: number) => string,
): number => {
  const chips = Array.from(root.querySelectorAll<HTMLElement>('[data-name]'));
  const restEl = root.querySelector<HTMLElement>('[data-rest]');
  if (chips.length === 0 || !restEl || total === 0) return 0;

  for (const chip of chips) chip.hidden = false;
  restEl.hidden = true;

  const first = chips[0];
  const maxBottom = first.offsetTop + first.offsetHeight * MAX_LINES + ROW_GAP_PX * (MAX_LINES - 1);

  let fitWithoutRest = chips.length;
  for (let i = 0; i < chips.length; i++) {
    if (chips[i].offsetTop + chips[i].offsetHeight > maxBottom + 1) {
      fitWithoutRest = i;
      break;
    }
  }

  if (fitWithoutRest >= total) return total;

  for (let n = fitWithoutRest; n >= 0; n--) {
    for (const [index, chip] of chips.entries()) {
      chip.hidden = index >= n;
    }
    restEl.hidden = false;
    restEl.textContent = formatRest(total - n);

    const last = n > 0 ? chips[n - 1] : null;
    const lastOk = !last || last.offsetTop + last.offsetHeight <= maxBottom + 1;
    const restOk = restEl.offsetTop + restEl.offsetHeight <= maxBottom + 1;
    if (lastOk && restOk) return n;
  }

  return 0;
};
