import { IPurchaseProps, Purchase } from '../domain';
import { ProviderFilters } from './provider.repository';
import { GenericFilters } from '../types';
import { IPaginateData } from '../helpers';
import { Schema } from 'mongoose';

export type PurchaseFilters = {
  id?: string;
  referencePurchaseNumber?: string;
  provider?: Schema.Types.ObjectId;
  storage?: Schema.Types.ObjectId;
  confirmed?: boolean;
  currency?: string;
  paymentType?: string;
  conditionPayment?: string;
  paymentReference?: string;
  active?: boolean;
};

export interface IPurchaseRepository {
  createPurchase(purchase: IPurchaseProps): Promise<Purchase>;
  getPurchase(filters: PurchaseFilters): Promise<Purchase | null>;
  getPurchases(filters?: ProviderFilters & GenericFilters): Promise<IPaginateData<Purchase>>;
  updatePurchase(id: string, purchase: Partial<IPurchaseProps>): Promise<Purchase | null>;
  deltePurchase(id: string): Promise<Purchase | null>;
  getPurchaseByIdAndProductName(idPurchase: string, productName: string): Promise<Purchase | null>;
}
