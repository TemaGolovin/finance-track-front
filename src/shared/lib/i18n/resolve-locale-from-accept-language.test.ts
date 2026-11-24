import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { resolveLocaleFromAcceptLanguage } from './resolve-locale-from-accept-language.ts';

describe('resolveLocaleFromAcceptLanguage', () => {
  it('returns en when header is missing', () => {
    assert.equal(resolveLocaleFromAcceptLanguage(null), 'en');
    assert.equal(resolveLocaleFromAcceptLanguage(undefined), 'en');
  });

  it('returns ru for Russian preferences', () => {
    assert.equal(resolveLocaleFromAcceptLanguage('ru-RU,ru;q=0.9,en;q=0.8'), 'ru');
    assert.equal(resolveLocaleFromAcceptLanguage('ru'), 'ru');
  });

  it('returns en when Russian is not preferred', () => {
    assert.equal(resolveLocaleFromAcceptLanguage('en-US,en;q=0.9'), 'en');
    assert.equal(resolveLocaleFromAcceptLanguage('de-DE,fr;q=0.9'), 'en');
    assert.equal(resolveLocaleFromAcceptLanguage('en-US,ru;q=0.5'), 'en');
  });

  it('respects q-values between ru and en', () => {
    assert.equal(resolveLocaleFromAcceptLanguage('ru;q=0.9,en;q=0.8'), 'ru');
    assert.equal(resolveLocaleFromAcceptLanguage('en;q=0.9,ru;q=0.8'), 'en');
  });
});