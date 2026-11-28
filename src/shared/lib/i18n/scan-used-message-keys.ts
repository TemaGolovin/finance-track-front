import fs from 'node:fs';
import path from 'node:path';

const SRC_ROOT = path.join(process.cwd(), 'src');

function walkTsFiles(dir: string, files: string[] = []): string[] {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkTsFiles(fullPath, files);
      continue;
    }
    if (/\.(ts|tsx)$/.test(entry.name) && !entry.name.endsWith('.test.ts')) {
      files.push(fullPath);
    }
  }
  return files;
}

function addKey(keys: Set<string>, key: string) {
  if (key.trim() !== '') keys.add(key);
}

function collectFromHooks(content: string, keys: Set<string>) {
  const varToNs = new Map<string, string>();

  const namespacedHook =
    /(?:const|let)\s+(\w+)\s*=\s*(?:await\s+)?(?:useTranslations|getTranslations)\(\s*(?:['"]([^'"]+)['"]|\{\s*namespace:\s*['"]([^'"]+)['"])/g;
  for (const match of content.matchAll(namespacedHook)) {
    varToNs.set(match[1], match[2] ?? match[3] ?? '');
  }

  const bareHook =
    /(?:const|let)\s+(\w+)\s*=\s*(?:await\s+)?(?:useTranslations|getTranslations)\(\s*\)/g;
  for (const match of content.matchAll(bareHook)) {
    varToNs.set(match[1], '');
  }

  for (const [varName, ns] of varToNs) {
    const callRe = new RegExp(`\\b${varName}(?:\\.rich)?\\(\\s*['"]([^'"]+)['"]`, 'g');
    for (const match of content.matchAll(callRe)) {
      addKey(keys, ns ? `${ns}.${match[1]}` : match[1]);
    }
  }
}

function collectAbsoluteKeysInValidators(content: string, keys: Set<string>) {
  const absoluteKey =
    /\bt\(['"]((?:errors|registration|common|verifyEmail|confirmEmailChange|profile|landing|group|category|operation|sidebar|invitation|feedback|settings|legal|forgotPassword|resetPassword|unverifiedEmailBanner)\.[^'"]+)['"]/g;
  for (const match of content.matchAll(absoluteKey)) {
    addKey(keys, match[1]);
  }
}

function readSrc(...segments: string[]) {
  return fs.readFileSync(path.join(SRC_ROOT, ...segments), 'utf8');
}

function collectIndirectKeys(keys: Set<string>) {
  const landingContent = readSrc('widget/landing/model/content.ts');
  for (const match of landingContent.matchAll(
    /(?:questionKey|answerKey|titleKey|textKey):\s*['"]([^'"]+)['"]/g,
  )) {
    addKey(keys, `landing.${match[1]}`);
  }
  const categoryRows = landingContent.match(
    /landingCategoryRows\s*=\s*\[([\s\S]*?)\]\s*as const/,
  );
  if (categoryRows) {
    for (const match of categoryRows[1].matchAll(/id:\s*['"](\w+)['"]/g)) {
      addKey(keys, `landing.sample.categories.${match[1]}`);
    }
  }

  const invitationTypes = readSrc('shared/api/queries/invitation/types.ts');
  for (const match of invitationTypes.matchAll(/^\s+\w+:\s*'([A-Z]+)'/gm)) {
    addKey(keys, `invitation.statuses.${match[1]}`);
  }

  const groupConsts = readSrc('widget/group-detail/model/consts.ts');
  for (const match of groupConsts.matchAll(/:\s*['"](\w+)['"]/g)) {
    if (match[1].startsWith('invitation')) {
      addKey(keys, `group.${match[1]}`);
    }
  }

  addKey(keys, 'category.defaultCategoryTypeChangeWarning');
  addKey(keys, 'category.defaultCategoryEditWarning');

  const sidebarItems = readSrc('widget/sidebar/lib/sidebar-items.tsx');
  for (const match of sidebarItems.matchAll(/sidebarT\(['"]([^'"]+)['"]/g)) {
    addKey(keys, `sidebar.${match[1]}`);
  }
}

export function scanUsedMessageKeys(): Set<string> {
  const keys = new Set<string>();

  for (const file of walkTsFiles(SRC_ROOT)) {
    const content = fs.readFileSync(file, 'utf8');
    collectFromHooks(content, keys);
    if (file.includes(`${path.sep}lib${path.sep}`) || /validate/.test(file)) {
      collectAbsoluteKeysInValidators(content, keys);
    }
  }

  collectIndirectKeys(keys);
  return keys;
}

export function flattenMessageKeys(
  messages: Record<string, unknown>,
  prefix = '',
): string[] {
  const keys: string[] = [];
  for (const [key, value] of Object.entries(messages)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      keys.push(...flattenMessageKeys(value as Record<string, unknown>, fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys;
}
