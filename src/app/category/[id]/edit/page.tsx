import { CategoryForm } from '@/widget/category-form';

export default function ({ params }: { params: { id: string } }) {
  return <CategoryForm editedId={params.id} />;
}
