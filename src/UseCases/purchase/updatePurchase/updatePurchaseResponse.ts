import { Schema } from 'mongoose';

export interface UpdatePurchaseResponseDto {
  id: Schema.Types.ObjectId | string;
  products: {
    name: string;
    quantity: number;
    price: number;
    boxes?: number;
    sku?: string;
  }[];
  referencePurchaseNumber?: string;
  provider: Schema.Types.ObjectId | string;
  storage: Schema.Types.ObjectId | string;
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
