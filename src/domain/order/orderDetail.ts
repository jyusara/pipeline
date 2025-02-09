import { err, ok, Result } from 'neverthrow';
import { OriginData, OriginProps } from '../../types';
import { validateOrderDetail } from './order.validation';

export interface CustomProduct extends OriginProps {
  name: string;
  price: number;
  externalProductId?: string;
  sku: string;
}

export interface IOrderDetailProps extends Partial<OriginProps> {
  origin?: OriginData;
  order: string;
  product?: string;
  customProduct?: CustomProduct;
  quantity: number;
  review?: string; // field to save the review of the product, comment does not apply
}

export class OrderDetail {
  id: string;

  origin?: OriginData;

  order: string;

  product?: string;

  customProduct?: CustomProduct;

  quantity: number;

  review?: string;

  constructor(props: IOrderDetailProps) {
    Object.assign(this, props);
  }

  static create(props: IOrderDetailProps): Result<OrderDetail, string> {
    const { error } = validateOrderDetail(props);
    if (error) {
      const orderDetailErrors = error.details.map((error) => error.message).join('. ');
      return err(orderDetailErrors);
    }
    return ok(new OrderDetail(props));
  }
}
