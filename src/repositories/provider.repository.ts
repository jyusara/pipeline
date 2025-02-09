import { IProviderProps, Provider } from '../domain';
import { IPaginateData } from '../helpers';
import { DataStatus, GenericFilters } from '../types';

export type ProviderFilters = {
  id?: string;
  name?: string;
  ruc?: string;
  phone?: string;
  addressLine?: string;
  email?: string;
  status?: DataStatus;
  referencePhoneNumber?: string;
  referenceContactName?: string;
  accountNumber?: string;
  businessCategory?: string;
};

export interface IProviderRepository {
  createProvider(provider: IProviderProps): Promise<Provider>;
  getProviders(filters?: ProviderFilters & GenericFilters): Promise<IPaginateData<Provider>>;
  getProvider(filters?: ProviderFilters): Promise<Provider | null>;
  updateProvider(id: string, provider: Partial<IProviderProps>): Promise<Provider | null>;
  deleteProvider(id: string): Promise<Provider | null>;
}
