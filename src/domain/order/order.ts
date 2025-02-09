import { err, ok, Result } from 'neverthrow';
import { validateOrder } from './order.validation';
import { OriginProps } from '../../types';

export interface Client {
  name: string;
  lastname?: string;
  documentNumber?: string;
  phone?: string;
  country?: string;
  department?: string;
  province?: string;
  address?: string;
  reference?: string;
  email?: string;
}

export interface IOrderProps extends OriginProps {
  orderNumber?: string;
  storeName: string;
  agency?: string;
  agent?: string;
  client: Client;
  agencyCost: number;
  advancePayment: number;
  pendingPayment: number;
  subtotal: number;
  discount: number;
  total: number;
  orderDetail?: string[];
  deliveryType?: string;
  paymentMethod?: string;
  observation?: string;
  contactedStatus?: string;
  creationDate?: Date;
  updateDate?: Date;
}

export class Order {
  id: string;

  orderNumber?: string;

  storeName: string;

  agency?: string;

  agent: string;

  client: Client;

  agencyCost: number;

  advancePayment: number;

  pendingPayment: number;

  subtotal: number;

  discount: number;

  total: number;

  orderDetail?: string[];

  deliveryType: string;

  paymentMethod: string;

  observation?: string;

  contactedStatus?: string;

  registerStatus?: string;

  status: string;

  comment?: string;

  creationDate?: Date;

  updateDate?: Date;

  constructor(props: IOrderProps) {
    Object.assign(this, props);
  }

  static create(props: IOrderProps): Result<Order, string> {
    const { error } = validateOrder(props);
    if (error) {
      const orderErrors = error.details.map((error) => error.message).join('. ');
      return err(orderErrors);
    }
    return ok(new Order(props));
  }
}
