import { DataStatus, OriginData } from '../../types';

export interface IProductDb {
  _id: string;
  name: string;
  price: number;
  externalProductId?: string;
  sku: string;
  origin: OriginData;
  comment?: string;
  registerStatus: DataStatus;
  status: DataStatus;
  createdAt: Date;
  updatedAt: Date;
}
