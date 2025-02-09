import { GenericFilters } from '../types';
import { Storage, IStorageProps } from '../domain';
import { IPaginateData } from '../helpers/paginationAndFilter';

export type StorageFilter = {
  id?: string;
  name?: string;
  address?: string;
  phone?: string;
  email?: string;
  capacity?: string;
  status?: string;
};

export interface IStorageRepository {
  getStorages(filters?: StorageFilter & GenericFilters): Promise<IPaginateData<Storage>>;
  getStorage(filters?: StorageFilter): Promise<Storage | null>;
  createStorage(request: IStorageProps): Promise<Storage>;
  updateStorage(id: string, storage: Partial<IStorageProps>): Promise<Storage | null>;
  deleteStorage(id: string): Promise<boolean>;
}
