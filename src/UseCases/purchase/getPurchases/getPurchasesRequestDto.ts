import { PurchaseFilters } from '../../../repositories/purchase.repository';
import { GenericFilters } from '../../../types';

export type GetPurchasesRequestDto = PurchaseFilters & GenericFilters;
