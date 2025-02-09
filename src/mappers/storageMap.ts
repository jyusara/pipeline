import { Document } from 'mongoose';
import { IStorageDb } from '../db/interfaces';
import { Storage } from '../domain';

export type StorageDbResponse = IStorageDb & Document;

export class StorageMap {
  static toDbFromDomain(storage: StorageDbResponse): Storage {
    return {
      id: storage._id as string,
      name: storage.name,
      address: storage.address,
      phone: storage.phone,
      email: storage.email,
      capacity: storage.capacity,
      status: storage.status
    };
  }
}
