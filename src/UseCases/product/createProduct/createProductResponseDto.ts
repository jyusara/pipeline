import { DataStatus, OriginData } from '../../../types';

export interface CreateProductResponseDto {
  id: string;
  name: string;
  price: number;
  externalProductId?: string;
  sku: string;
  origin: OriginData;
  comment?: string;
  registerStatus: DataStatus;
}
