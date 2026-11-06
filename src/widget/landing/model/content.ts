export const landingFaq = [
  { id: 'family', questionKey: 'faq.familyQ', answerKey: 'faq.familyA' },
  { id: 'invite', questionKey: 'faq.inviteQ', answerKey: 'faq.inviteA' },
  { id: 'categories', questionKey: 'faq.categoriesQ', answerKey: 'faq.categoriesA' },
  { id: 'stats', questionKey: 'faq.statsQ', answerKey: 'faq.statsA' },
  { id: 'bank', questionKey: 'faq.bankQ', answerKey: 'faq.bankA' },
] as const;

export const landingIndex = [
  { id: 'personal', titleKey: 'index.personalTitle', textKey: 'index.personalText' },
  { id: 'group', titleKey: 'index.groupTitle', textKey: 'index.groupText' },
  { id: 'shared', titleKey: 'index.sharedTitle', textKey: 'index.sharedText' },
  { id: 'people', titleKey: 'index.peopleTitle', textKey: 'index.peopleText' },
] as const;

export const landingFeatures = [
  { id: 'operations', titleKey: 'features.operationsTitle', textKey: 'features.operationsText' },
  { id: 'categories', titleKey: 'features.categoriesTitle', textKey: 'features.categoriesText' },
  { id: 'invites', titleKey: 'features.invitesTitle', textKey: 'features.invitesText' },
  { id: 'groupStat', titleKey: 'features.groupStatTitle', textKey: 'features.groupStatText' },
  {
    id: 'personalStat',
    titleKey: 'features.personalStatTitle',
    textKey: 'features.personalStatText',
  },
  { id: 'author', titleKey: 'features.authorTitle', textKey: 'features.authorText' },
  { id: 'period', titleKey: 'features.periodTitle', textKey: 'features.periodText' },
  { id: 'mapping', titleKey: 'features.mappingTitle', textKey: 'features.mappingText' },
] as const;

export const landingCategoryRows = [
  { id: 'groceries', width: 'w-[86%]', color: 'bg-amber-400', delay: '0s' },
  { id: 'home', width: 'w-[64%]', color: 'bg-emerald-400', delay: '-0.6s' },
  { id: 'transport', width: 'w-[42%]', color: 'bg-violet-400', delay: '-1.2s' },
  { id: 'health', width: 'w-[28%]', color: 'bg-rose-400', delay: '-1.8s' },
] as const;
