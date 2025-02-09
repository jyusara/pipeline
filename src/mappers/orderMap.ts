import { IAgentDb, IOrderDb, IOrderDetailDb, IProductDb } from '../db/interfaces';
import { Order } from '../domain';
import { parseDate } from '../helpers/parseDate';

export type OrderDbResponse = IOrderDb & {
  agent: IAgentDb;
};

export type OrderDetailDbResponse = {
  orderDetailId: string;
  productName?: string;
  productPrice?: number;
  externalProductId?: string | null;
  sku?: string | null;
};

export type OrderDbResponseDetailMap = {
  id: string;
  orderNumber?: string;
  storeName: string;
  agent: string;
  agency?: string;
  client: {
    name: string;
    lastname: string;
    documentNumber: string;
    phone: string;
    country: string;
    department: string;
    province: string;
    address: string;
    reference: string;
    email: string;
  };
  agencyCost: number;
  advancePayment: number;
  pendingPayment: number;
  subtotal: number;
  discount: number;
  total: number;
  orderDetail: OrderDetailDbResponse[];
  deliveryType: string;
  paymentMethod: string;
  observation: string;
  contactedStatus: string;
  registerStatus: string;
  status: string;
  comment: string;
  creationDate: Date;
  updateDate: Date;
};

export class OrderMap {
  static fromDbToDomain(order: OrderDbResponse): Order {
    return {
      id: order._id,
      orderNumber: order.orderNumber,
      storeName: order.storeName,
      agency: order.agency,
      agent: order.agent?.name?.trim() || '',
      client: {
        name: order.client.name,
        lastname: order.client.lastname,
        documentNumber: order.client.documentNumber,
        phone: order.client.phone,
        country: order.client.country,
        department: order.client.department,
        province: order.client.province,
        address: order.client.address,
        reference: order.client.reference,
        email: order.client.email
      },
      agencyCost: order.agencyCost,
      advancePayment: order.advancePayment,
      pendingPayment: order.pendingPayment,
      subtotal: order.subtotal,
      discount: order.discount,
      total: order.total,
      orderDetail: order?.orderDetail!.map((detail) => detail._id!) || [],
      deliveryType: order.deliveryType || '',
      paymentMethod: order.paymentMethod || '',
      observation: order.observation || '',
      contactedStatus: order.contactedStatus || '',
      registerStatus: order.registerStatus || '',
      status: order.status!,
      comment: order.comment || '',
      creationDate: parseDate(order.createdAt),
      updateDate: parseDate(order.updatedAt)
    };
  }

  static fromDbToDomainDetail(order: OrderDbResponse): OrderDbResponseDetailMap {
    return {
      id: order._id.toString(),
      orderNumber: order.orderNumber,
      storeName: order.storeName,
      agency: order.agency,
      agent: order.agent?.name?.trim() || '',
      client: {
        name: order.client.name || '',
        lastname: order.client.lastname || '',
        documentNumber: order.client.documentNumber || '',
        phone: order.client.phone || '',
        country: order.client.country || '',
        department: order.client.department || '',
        province: order.client.province || '',
        address: order.client.address || '',
        reference: order.client.reference || '',
        email: order.client.email || ''
      },
      agencyCost: order.agencyCost,
      advancePayment: order.advancePayment,
      pendingPayment: order.pendingPayment,
      subtotal: order.subtotal,
      discount: order.discount,
      total: order.total,
      orderDetail: order?.orderDetail!.map((detail: Partial<IOrderDetailDb> & { product?: IProductDb }) => {
        return {
          orderDetailId: detail._id?.toString()!,
          productName: detail.product?.name || detail.customProduct?.name || '',
          productPrice: detail.product?.price || detail.customProduct?.price || 0,
          externalProductId: detail.product?.externalProductId || detail.customProduct?.externalProductId || null,
          sku: detail.product?.sku || detail.customProduct?.sku || null,
          quantity: detail.quantity
        };
      }),
      deliveryType: order.deliveryType || '',
      paymentMethod: order.paymentMethod || '',
      observation: order.observation || '',
      contactedStatus: order.contactedStatus || '',
      registerStatus: order.registerStatus || '',
      status: order.status!,
      comment: order.comment || '',
      creationDate: parseDate(order.createdAt),
      updateDate: parseDate(order.updatedAt)
    };
  }
}
