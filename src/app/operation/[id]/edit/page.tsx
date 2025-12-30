import { OperationForm } from '@/widget/operation-form';
// import { useSearchParams } from 'next/navigation';

export default async ({ params }: { params: { id: string } }) => {
  const awaitedParams = await params;

  return <OperationForm editedId={awaitedParams?.id || undefined} />;
};
