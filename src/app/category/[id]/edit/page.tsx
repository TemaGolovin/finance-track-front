import { CategoryForm } from '@/widget/category-form';

export default async function ({ params }: { params: Promise<{ id: string }> }) {
  const awaitedParams = await params;
  return <CategoryForm editedId={awaitedParams.id} />;
}
