import { Storage, IStorageProps } from '../../domain';
import { IPaginateData } from '../../helpers';
import { GenericFilters } from '../../types';
import { IStorageRepository, StorageFilter } from '../storage.repository';

export class InMemoryStorageRepository implements IStorageRepository {
  getStorages(filters?: StorageFilter & GenericFilters): Promise<IPaginateData<Storage>> {
    if (filters?.id === '676f7dd6a2ca1c984fae9724' || filters?.id === '676f7dd6a2ca1c984fae9725') {
      return Promise.resolve({
        data: [
          {
            id: '676f7dd6a2ca1c984fae9724',
            name: 'test2',
            address: 'Avenida Mexico 444, La Victoria, Lima',
            phone: '987654321',
            email: 'test2@email.com',
            capacity: '500m2',
            status: 'inactive'
          },
          {
            id: '676f7dd6a2ca1c984fae9725',
            name: 'test2',
            address: 'Avenida Mexico 444, La Victoria, Lima',
            phone: '987654321',
            email: 'test2@email.com',
            capacity: '500m2',
            status: 'inactive'
          }
        ],
        page: 1,
        limit: 10,
        totalRecords: 2,
        totalPages: 1
      });
    } else {
      return Promise.resolve({
        data: [],
        page: 1,
        limit: 10,
        totalRecords: 0,
        totalPages: 0
      });
    }
  }

  getStorage(filters?: StorageFilter): Promise<Storage | null> {
    if (filters?.id === '676f7dd6a2ca1c984fae9724') {
      return Promise.resolve({
        id: '676f7dd6a2ca1c984fae9724',
        name: 'test2',
        address: 'Avenida Mexico 444, La Victoria, Lima',
        phone: '987654321',
        email: 'test2@email.com',
        capacity: '500m2',
        status: 'inactive'
      });
    } else {
      return Promise.resolve(null);
    }
  }

  createStorage(request: IStorageProps): Promise<Storage> {
    return Promise.resolve({
      id: '676f7dd6a2ca1c984fae9726',
      ...request
    });
  }

  updateStorage(id: string, storage: Partial<IStorageProps>): Promise<Storage | null> {
    if (id === '676f7dd6a2ca1c984fae9724') {
      return Promise.resolve({
        id: '676f7dd6a2ca1c984fae9724',
        name: 'test2',
        address: 'Avenida Mexico 444, La Victoria, Lima',
        phone: '987654321',
        email: 'test2@email.com',
        capacity: '500m2',
        status: 'active',
        ...storage
      });
    } else {
      return Promise.resolve(null);
    }
  }

  deleteStorage(id: string): Promise<boolean> {
    if (id === '676f7dd6a2ca1c984fae9724') {
      return Promise.resolve(true);
    } else {
      return Promise.resolve(true);
    }
  }
}
