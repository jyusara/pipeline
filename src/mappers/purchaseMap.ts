import { IPurchaseDb } from '../db/interfaces/purchase.interface';
import { Purchase } from '../domain';

export type PurchaseDbResponse = IPurchaseDb & Document;

export class PurchaseMap {
  static toDomainFromDb(purchaseDb: PurchaseDbResponse): Purchase {
    return {
      id: purchaseDb._id,
      products: purchaseDb.products.map((product) => {
        return {
          name: product.name,
          price: product.price,
          quantity: product.quantity,
          boxes: product.boxes,
          sku: product.sku
        };
      }),
      referencePurchaseNumber: purchaseDb.referencePurchaseNumber,
      provider: purchaseDb.provider,
      storage: purchaseDb.storage,
      confirmed: purchaseDb.confirmed,
      subTotal: purchaseDb.subTotal,
      total: purchaseDb.total,
      discount: purchaseDb.discount,
      observation: purchaseDb.observation,
      currency: purchaseDb.currency,
      paymentType: purchaseDb.paymentType,
      conditionPayment: purchaseDb.conditionPayment,
      paymentReference: purchaseDb.paymentReference,
      numberOfBoxes: purchaseDb.numberOfBoxes,
      active: purchaseDb.active
    };
  }
}
