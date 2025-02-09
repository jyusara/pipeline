import { Schema } from 'mongoose';
import { err, ok, Result } from 'neverthrow';
import { validatePurchase } from './purchase.validation';

export interface IPurchaseProps {
  products: {
    name: string;
    quantity: number;
    price: number;
    boxes?: number;
    sku?: string;
  }[];
  referencePurchaseNumber?: string;
  provider: string | Schema.Types.ObjectId;
  storage: string | Schema.Types.ObjectId;
  confirmed: boolean;
  subTotal: number;
  total: number;
  discount: number;
  observation: string;
  currency: string;
  paymentType: string;
  conditionPayment: string;
  paymentReference: string;
  numberOfBoxes?: number;
  active: boolean;
}

export class Purchase {
  id: string;

  products: {
    name: string;
    quantity: number;
    price: number;
    boxes?: number;
    sku?: string;
  }[];

  referencePurchaseNumber?: string;

  provider: string | Schema.Types.ObjectId;

  storage: string | Schema.Types.ObjectId;

  confirmed: boolean;

  subTotal: number;

  total: number;

  discount: number;

  observation: string;

  currency: string;

  paymentType: string;

  conditionPayment: string;

  paymentReference: string;

  numberOfBoxes?: number;

  active: boolean;

  constructor(props: IPurchaseProps) {
    Object.assign(this, props);
  }

  static create(props: IPurchaseProps): Result<Purchase, string> {
    const { error } = validatePurchase(props);
    if (error) {
      const purchaseErrors = error.details.map((error) => error.message).join('. ');
      return err(purchaseErrors);
    }
    return ok(new Purchase(props));
  }
}
