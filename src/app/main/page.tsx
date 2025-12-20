import { instanceFetchFromServer } from '@/shared/api/instance-from-server';
import { ChartConfig } from '@/shared/lib/shadcn/chart';
import { BaseCard } from '@/shared/ui';
import { getTranslations } from 'next-intl/server';

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: '#2563eb',
  },
  mobile: {
    label: 'Mobile',
    color: '#60a5fa',
  },
} satisfies ChartConfig;

const chartData = [
  {
    type: 'Desktop',
    fill: '#2563eb',
    percent: 60,
  },
  {
    type: 'Mobile',
    fill: '#60a5fa',
    percent: 40,
  },
];

export default async function MainPage() {
  const data = await instanceFetchFromServer('/category/stat');
  const t = await getTranslations('main');

  return (
    <BaseCard title={t('expensesByCategory')}>
      asdasd
      {/* <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <PieChart accessibilityLayer data={chartData}>
          <Pie dataKey="percent" nameKey="type" data={chartData} innerRadius={45} strokeWidth={5} />
        </PieChart>
      </ChartContainer> */}
    </BaseCard>
  );
}
