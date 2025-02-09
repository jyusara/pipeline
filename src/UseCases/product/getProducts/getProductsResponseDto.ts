import { Product } from '../../../domain';

export interface GetProductsResponseDto {
  data: Product[];
  totalRecords: number;
  page: number;
  limit: number;
  totalPages: number;
}
