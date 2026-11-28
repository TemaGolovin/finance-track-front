import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, it } from 'node:test';
import { flattenMessageKeys, scanUsedMessageKeys } from './scan-used-message-keys.ts';

const messagesDir = path.join(process.cwd(), 'src/shared/lib/i18n/messages');

function loadMessages(locale: 'en' | 'ru'): Record<string, unknown> {
  return JSON.parse(readFileSync(path.join(messagesDir, `${locale}.json`), 'utf8')) as Record<
    string,
    unknown
  >;
}

describe('i18n message keys', () => {
  const enKeys = new Set(flattenMessageKeys(loadMessages('en')));
  const ruKeys = new Set(flattenMessageKeys(loadMessages('ru')));
  const usedKeys = scanUsedMessageKeys();

  it('keeps en and ru key sets in sync', () => {
    const onlyEn = [...enKeys].filter((key) => !ruKeys.has(key)).sort();
    const onlyRu = [...ruKeys].filter((key) => !enKeys.has(key)).sort();

    assert.deepEqual(onlyEn, [], `keys only in en: ${onlyEn.join(', ')}`);
    assert.deepEqual(onlyRu, [], `keys only in ru: ${onlyRu.join(', ')}`);
  });

  it('covers every statically/indirectly used translation key', () => {
    const missing = [...usedKeys].filter((key) => !enKeys.has(key)).sort();
    assert.deepEqual(missing, [], `missing message keys: ${missing.join(', ')}`);
  });
});
