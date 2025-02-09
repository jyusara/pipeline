import { Schema } from 'mongoose';
import { Client, CustomProduct } from '../../domain';
import { OriginData, OriginProps } from '../../types';

export interface IOrderDb extends OriginProps {
  _id: string;
  orderNumber?: string;
  storeName: string;
  agency?: string;
  agent: string | Schema.Types.ObjectId; // TODO modificar por el id del agente
  client: Client & { _id?: string };
  agencyCost: number;
  advancePayment: number;
  pendingPayment: number;
  subtotal: number;
  discount: number;
  total: number;
  orderDetail?: Partial<IOrderDetailDb>[];
  deliveryType?: string;
  paymentMethod?: string;
  observation?: string;
  contactedStatus?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IOrderDetailDb extends Partial<OriginProps> {
  _id: string;
  order: string | Schema.Types.ObjectId;
  product?: string | Schema.Types.ObjectId;
  customProduct?: CustomProduct;
  quantity: number;
  review?: string;
  origin?: OriginData;
  createdAt: Date;
  updatedAt: Date;
}
