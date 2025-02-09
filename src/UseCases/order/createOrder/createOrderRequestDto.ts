import { Client, IProductProps } from '../../../domain';

export interface CreateOrderRequestDto {
  storeName?: string;
  order: Partial<{
    orderNumber: string;
    agent: string;
    agency: string;
    agencyCost: number;
    advancePayment: number;
    pendingPayment: number;
    paymentMethod: string;
    subtotal: number;
    discount: number;
    total: number;
    deliveryType: string;
    contactedStatus: string;
    observation: string;
    status: string;
  }>;
  client: Partial<Client>;
  products: Array<IProductProps & { id?: string }>;
}
