import { DataStatus } from '../../types';

export interface IProviderDb {
  _id: string;
  name: string;
  ruc: string;
  phone: string;
  addressLine?: string;
  email?: string;
  status: DataStatus;
  referencePhoneNumber: string;
  referenceContactName: string;
  accountNumber?: string;
  businessCategory?: string;
  createdAt: Date;
  updatedAt: Date;
}
