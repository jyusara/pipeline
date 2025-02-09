import { Schema } from 'mongoose';
import { DataStatus } from '../../types';

export interface IStorageDb {
  _id: string | Schema.Types.ObjectId;
  name: string;
  address: string;
  phone: string;
  email: string;
  capacity: string;
  status: DataStatus;
  createdAt: Date;
  updatedAt: Date;
}
