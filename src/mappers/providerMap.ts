import { Document } from 'mongoose';
import { IProviderDb } from '../db/interfaces';
import { Provider } from '../domain';

export type ProviderDbResponse = IProviderDb & Document;

export class ProviderMap {
  static toDomainFromDb(providerDb: ProviderDbResponse): Provider {
    return {
      id: providerDb._id,
      name: providerDb.name,
      ruc: providerDb.ruc,
      phone: providerDb.phone,
      addressLine: providerDb.addressLine,
      email: providerDb.email,
      status: providerDb.status,
      referencePhoneNumber: providerDb.referencePhoneNumber,
      referenceContactName: providerDb.referenceContactName,
      accountNumber: providerDb.accountNumber,
      businessCategory: providerDb.businessCategory
    };
  }
}
