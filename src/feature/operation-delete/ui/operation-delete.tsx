import { useOperationDelete } from '@/shared/api/queries/operations';
import { Button, Drawer } from '@/shared/ui';
import { Trash } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface OperationDeleteProps {
  id: string;
}

export const OperationDelete: React.FC<OperationDeleteProps> = ({ id }) => {
  const commonT = useTranslations('common');
  const operationT = useTranslations('operation');

  const router = useRouter();

  const { mutateAsync: operationDelete } = useOperationDelete();

  const handleOperationDelete = async (onClose: () => void) => {
    await toast.promise(operationDelete(id), {
      loading: operationT('deleteOperationLoading'),
      success: operationT('deleteOperationSuccess'),
      error: (data) => data?.message || operationT('deleteOperationError'),
    });
    onClose();
    router.back();
  };

  return (
    <>
      <Drawer
        title={operationT('deletingOperation')}
        description={operationT('confirmDelete')}
        trigger={
          <Button variant={'destructive'} className="flex-1">
            <Trash className="w-5" />
            {commonT('delete')}
          </Button>
        }
        renderContent={(onClose) => (
          <Button
            variant={'destructive'}
            onClick={() => handleOperationDelete(onClose)}
            className="w-full"
          >
            {commonT('delete')}
          </Button>
        )}
      />
    </>
  );
};
