import { Storage, IStorageProps } from '../../domain';
import { getDataByFilters, getPaginateAndFilteredData, IPaginateData } from '../../helpers';
import { IStorageRepository, StorageFilter } from '../storage.repository';
import { storageModel } from '../../db/mongo.schema';
import { GenericFilters } from '../../types';
import { StorageDbResponse, StorageMap } from '../../mappers/storageMap';

export class StorageImplRepository implements IStorageRepository {
  private readonly storageModel: typeof storageModel;

  constructor() {
    this.storageModel = storageModel;
  }

  async getStorages(filters?: StorageFilter & GenericFilters): Promise<IPaginateData<Storage>> {
    try {
      const { page, limit, ...query } = filters || {};
      const result = await getPaginateAndFilteredData(page, limit, this.storageModel, query);
      const storageMap = result.data.map((storage) => StorageMap.toDbFromDomain(storage as StorageDbResponse));
      return {
        data: storageMap,
        page: result.page,
        limit: result.limit,
        totalRecords: result.totalRecords,
        totalPages: result.totalPages
      };
    } catch (error) {
      throw error;
    }
  }

  async getStorage(filters?: StorageFilter): Promise<Storage | null> {
    try {
      const result = await getDataByFilters<Storage, StorageFilter>(storageModel, filters);
      if (!result) {
        return null;
      }
      return StorageMap.toDbFromDomain(result as StorageDbResponse);
    } catch (error) {
      throw error;
    }
  }

  async createStorage(request: IStorageProps): Promise<Storage> {
    try {
      const newStorage = new this.storageModel(request);
      await newStorage.save();
      return StorageMap.toDbFromDomain(newStorage);
    } catch (error) {
      throw error;
    }
  }

  async updateStorage(id: string, storage: Partial<IStorageProps>): Promise<Storage | null> {
    try {
      // Verificar si el email ya esta en uso
      // if (storage.email) {
      //     const existingStorage = await this.storageModel.findOne({
      //         email: storage.email,
      //         _id: { $ne: id },
      //     })
      //     if (existingStorage) {
      //         throw new UpdateStorageAlreadyAssigned("The Email is Already in use. ")
      //     }
      // }
      const updateStorage = await this.storageModel.findByIdAndUpdate(id, storage, { new: true });
      if (!updateStorage) {
        return null;
      }
      return StorageMap.toDbFromDomain(updateStorage);
    } catch (error) {
      throw error;
    }
  }

  async deleteStorage(id: string): Promise<boolean> {
    try {
      const result = await this.storageModel.findByIdAndDelete(id);
      return result != null;
    } catch (error) {
      throw error;
    }
  }
}
