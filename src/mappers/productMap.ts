import { Document } from 'mongoose';
import { IProductDb } from '../db/interfaces';
import { Product } from '../domain';

export type ProductDbResponse = IProductDb & Document;

export class ProductMap {
  static toDbFromDomain(productDb: ProductDbResponse): Product {
    return {
      id: productDb._id,
      name: productDb.name,
      price: productDb.price,
      sku: productDb.sku,
      origin: productDb.origin,
      externalProductId: productDb.externalProductId,
      registerStatus: productDb.registerStatus,
      status: productDb.status,
      comment: productDb.comment
    };
  }
}
