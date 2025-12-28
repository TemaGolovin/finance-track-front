import { CreateOperationReq } from '@/shared/api/queries/operations';
import { OperationType } from './schema';

export const mapCrateOperationFormToApi = (
  createOperationFormState: OperationType,
): CreateOperationReq => {
  return {
    type: createOperationFormState.type,
    value: Number(createOperationFormState.sum.replace(',', '.')),
    operationDate: createOperationFormState.date.toISOString(),
    categoryId: createOperationFormState.categoryId,
    comment: createOperationFormState.comment,
  };
};
