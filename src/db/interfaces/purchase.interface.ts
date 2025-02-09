import { Schema } from 'mongoose';

export interface IPurchaseDb {
  _id: string;
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
  createdAt?: Date;
  updatedAt?: Date;
}
