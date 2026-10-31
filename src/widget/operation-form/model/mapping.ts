import { CreateOperationReq } from '@/shared/api/queries/operations';
import { parseDecimalInputToNumber } from '@/shared/lib/utils/decimal-input-format';
import { OperationType } from './schema';

export const mapCrateOperationFormToApi = (
  createOperationFormState: OperationType,
): CreateOperationReq => {
  return {
    type: createOperationFormState.type,
    value: parseDecimalInputToNumber(createOperationFormState.sum),
    operationDate: createOperationFormState.date.toISOString(),
    categoryId: createOperationFormState.categoryId,
    comment: createOperationFormState.comment,
  };
};
