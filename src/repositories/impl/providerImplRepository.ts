import { IProviderProps, Provider } from '../../domain';
import { IProviderRepository, ProviderFilters } from '../provider.repository';
import { providerModel } from '../../db/mongo.schema';
import { getDataByFilters, getPaginateAndFilteredData, IPaginateData } from '../../helpers';
import { ProviderDbResponse, ProviderMap } from '../../mappers/providerMap';
import { GenericFilters } from '../../types';

export class ProviderImplRepository implements IProviderRepository {
  private readonly providerModel: typeof providerModel;

  constructor() {
    this.providerModel = providerModel;
  }

  async createProvider(provider: IProviderProps): Promise<Provider> {
    try {
      const newProvider = new this.providerModel(provider);
      return ProviderMap.toDomainFromDb(await newProvider.save());
    } catch (error) {
      throw error;
    }
  }

  async getProviders(filters?: ProviderFilters & GenericFilters): Promise<IPaginateData<Provider>> {
    try {
      const { page, limit, ...query } = filters || {};
      const result = await getPaginateAndFilteredData<Provider, ProviderFilters>(page, limit, providerModel, query);
      const providerMap = result.data.map((provider) => ProviderMap.toDomainFromDb(provider as ProviderDbResponse));
      return {
        data: providerMap,
        page: result.page,
        limit: result.limit,
        totalRecords: result.totalRecords,
        totalPages: result.totalPages
      };
    } catch (error) {
      throw error;
    }
  }

  async getProvider(filters?: ProviderFilters): Promise<Provider | null> {
    try {
      const result = await getDataByFilters<Provider, ProviderFilters>(providerModel, filters);
      if (!result) {
        return null;
      }
      return ProviderMap.toDomainFromDb(result as ProviderDbResponse);
    } catch (error) {
      throw error;
    }
  }

  async updateProvider(id: string, provider: Partial<IProviderProps>): Promise<Provider | null> {
    try {
      const updateProvider = await this.providerModel.findByIdAndUpdate(id, provider, { new: true });
      if (!updateProvider) {
        return null;
      }
      return ProviderMap.toDomainFromDb(updateProvider);
    } catch (error) {
      throw error;
    }
  }

  async deleteProvider(id: string): Promise<Provider | null> {
    try {
      const deleteProvider = await this.providerModel.findByIdAndDelete(id);
      if (!deleteProvider) {
        return null;
      }
      return ProviderMap.toDomainFromDb(deleteProvider);
    } catch (error) {
      throw error;
    }
  }
}
