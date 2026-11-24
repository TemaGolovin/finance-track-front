import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { getIsoDatesFromPeriod } from './get-iso-dates-from-period.ts';

describe('getIsoDatesFromPeriod', () => {
  const anchor = new Date('2024-01-17T12:00:00.000Z');

  it('week boundaries differ for Monday vs Sunday start', () => {
    const weekMonday = getIsoDatesFromPeriod('week', anchor, { weekStartsOn: 1 });
    const weekSunday = getIsoDatesFromPeriod('week', anchor, { weekStartsOn: 0 });

    assert.notEqual(weekMonday.startDate, weekSunday.startDate);
    assert.notEqual(weekMonday.endDate, weekSunday.endDate);
  });

  it('defaults week start to Monday', () => {
    const withDefault = getIsoDatesFromPeriod('week', anchor);
    const explicitMonday = getIsoDatesFromPeriod('week', anchor, { weekStartsOn: 1 });

    assert.equal(withDefault.startDate, explicitMonday.startDate);
    assert.equal(withDefault.endDate, explicitMonday.endDate);
  });
});