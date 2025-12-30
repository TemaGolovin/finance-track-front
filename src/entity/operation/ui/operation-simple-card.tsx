import { Operation } from '@/shared/api/queries/operations';
import { formatNumberWithRound, iconCategoryFromBackendMap } from '@/shared/lib';

interface OperationSimpleProps {
  operation: Operation;
}
export const OperationSimpleCard: React.FC<OperationSimpleProps> = ({ operation }) => {
  return (
    <div className="bg-card rounded-sm px-2 py-1">
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 flex items-center justify-center rounded-full"
          style={{ background: operation.category.color }}
        >
          {iconCategoryFromBackendMap[operation.category.icon]}
        </div>
        <div>
          <div className="text-sm font-bold text-foreground/50">{operation.category.name}</div>
          <div className="font-bold text-foreground/80">
            {formatNumberWithRound(operation.value)}{' '}
          </div>
        </div>
      </div>
      <div className="text-xs truncate text-foreground/80 mt-0.5">{operation.comment}</div>
    </div>
  );
};
