import { OriginData } from '../types';
import { Client, IOrderProps, IProductProps, Order } from '../domain';
import { OrderDbResponseDetailMap } from '../mappers';

export type ProductRequest = {
  productId: string;
  quantity: number;
  review?: string;
  customProduct?: IProductProps;
} & IProductProps;

export interface OrderProcessRequest {
  orderNumber: string;
  client: Client;
  storeName: string;
  origin: OriginData;
  advancePayment: number;
  agencyCost: number;
  discount: number;
}

// export type IOrderUpdateRequest = Partial<IOrderProps> & {
//   products: Partial<ProductRequest>[];
// };

export type IOrderCreateOrUpdateRequest = IOrderProps & {
  products: Array<Partial<ProductRequest>>;
};

export interface IOrderRepository {
  processOrderToWebhook(order: OrderProcessRequest, products: Partial<ProductRequest>[]): Promise<Order>;
  validateExistOrder(orderNumber: string): Promise<boolean>;
  updateOrder(orderId: string, request: Partial<IOrderProps>): Promise<Order>;
  getOrder(orderId: string): Promise<OrderDbResponseDetailMap | null>;
  createOrder(request: IOrderCreateOrUpdateRequest): Promise<OrderDbResponseDetailMap>;
}
