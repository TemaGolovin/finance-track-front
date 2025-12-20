import { ChartConfig } from '@/shared/lib/shadcn/chart';
import { BaseCard } from '@/shared/ui';

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
  // const data = await instanceFetch('/category/stat', {
  //   headers: {
  //     Authorization: `Bearer `,
  //   }
  // });
  // console.log(data);

  return (
    <BaseCard title="title" actions={<div>act</div>} description="description" footer="footer">
      asd
      {/* <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <PieChart accessibilityLayer data={chartData}>
          <Pie dataKey="percent" nameKey="type" data={chartData} innerRadius={45} strokeWidth={5} />
        </PieChart>
      </ChartContainer> */}
    </BaseCard>
  );
}
