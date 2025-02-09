import { err, ok, Result } from 'neverthrow';
import { DataStatus, OriginData } from '../../types';
import { validatePartialProduct, validateProduct } from './product.validation';
import { OriginProps } from '../../types/origins';

export interface IProductProps extends Partial<OriginProps> {
  name: string;
  price: number;
  externalProductId?: string;
  sku: string;
}

export class Product {
  id: string;

  name: string;

  price: number;

  externalProductId?: string;

  sku: string;

  origin: OriginData;

  comment?: string;

  registerStatus: DataStatus;

  status: DataStatus;

  constructor(props: IProductProps) {
    Object.assign(this, props);
  }

  static create(props: IProductProps): Result<Product, string> {
    const { error } = validateProduct(props);
    if (error) {
      const productErrors = error.details.map((error) => error.message).join('. ');
      return err(productErrors);
    }
    return ok(new Product(props));
  }

  static partialCreate(props: IProductProps): Result<Product, string> {
    const { error } = validatePartialProduct(props);
    if (error) {
      const productErrors = error.details.map((error) => error.message).join('. ');
      return err(productErrors);
    }
    return ok(new Product(props));
  }
}
