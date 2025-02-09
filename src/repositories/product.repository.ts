import { DataStatus, GenericFilters, OriginData } from '../types';
import { IProductProps, Product } from '../domain';
import { IPaginateData } from '../helpers/paginationAndFilter';

export type ProductFilters = {
  id?: string;
  name?: string;
  price?: number;
  status?: DataStatus;
  externalProductId?: string;
  origin?: OriginData;
  registerStatus?: DataStatus;
  sku?: string;
};

export interface IProductRepository {
  createProduct(product: IProductProps, registerStatus?: DataStatus): Promise<Product>;
  getProducts(filters?: ProductFilters & GenericFilters): Promise<IPaginateData<Product>>;
  getProduct(filters?: ProductFilters): Promise<Product | null>;
  updateProduct(id: string, product: Partial<IProductProps>): Promise<Product | null>;
}
