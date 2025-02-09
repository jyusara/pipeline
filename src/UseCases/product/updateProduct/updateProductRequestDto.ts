import { DataStatus } from '../../../types';

export interface UpdateProductRequestDto {
  id: string;
  name?: string;
  price?: number;
  externalProductId?: string;
  comment?: string;
  sku?: string;
  registerStatus?: DataStatus;
  status?: DataStatus;
}
