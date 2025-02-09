import { purchaseModel } from '../../db/mongo.schema';
import { IPurchaseRepository, PurchaseFilters } from '../purchase.repository';
import { IPurchaseProps, Purchase } from '../../domain';
import { PurchaseDbResponse, PurchaseMap } from '../../mappers/purchaseMap';
import { getDataByFilters, getPaginateAndFilteredData, IPaginateData } from '../../helpers';
import { GenericFilters } from '../../types';
import { ProviderFilters } from '../provider.repository';
import { QueryOptions } from 'mongoose';

export class PurchaseImplRepository implements IPurchaseRepository {
  private readonly purchaseModel: typeof purchaseModel;

  constructor() {
    this.purchaseModel = purchaseModel;
  }

  async createPurchase(purchase: IPurchaseProps): Promise<Purchase> {
    try {
      const newPurchase = new this.purchaseModel(purchase);
      const purchaseSaved = await newPurchase.save();
      return PurchaseMap.toDomainFromDb(purchaseSaved as unknown as PurchaseDbResponse);
    } catch (error) {
      throw error;
    }
  }

  async getPurchase(filters: PurchaseFilters): Promise<Purchase | null> {
    try {
      const result = await getDataByFilters<Purchase, PurchaseFilters>(purchaseModel, filters);
      if (!result) {
        return null;
      }
      return PurchaseMap.toDomainFromDb(result as unknown as PurchaseDbResponse);
    } catch (error) {
      throw error;
    }
  }

  async getPurchases(filters?: ProviderFilters & GenericFilters): Promise<IPaginateData<Purchase>> {
    try {
      const { page, limit, ...query } = filters || {};
      const result = await getPaginateAndFilteredData<Purchase, PurchaseFilters>(page, limit, purchaseModel, query);
      const purchaseMap = result.data.map((purchase) =>
        PurchaseMap.toDomainFromDb(purchase as unknown as PurchaseDbResponse)
      );
      return {
        data: purchaseMap,
        page: result.page,
        limit: result.limit,
        totalRecords: result.totalRecords,
        totalPages: result.totalPages
      };
    } catch (error) {
      throw error;
    }
  }

  async updatePurchase(id: string, purchase: Partial<IPurchaseProps>): Promise<Purchase | null> {
    try {
      const updatedPurchase = await this.purchaseModel.findByIdAndUpdate(id, purchase, { new: true });
      if (!updatedPurchase) {
        return null;
      }
      return PurchaseMap.toDomainFromDb(updatedPurchase as unknown as PurchaseDbResponse);
    } catch (error) {
      throw error;
    }
  }

  async deltePurchase(id: string): Promise<Purchase | null> {
    try {
      const deletePurchase = await this.purchaseModel.findByIdAndDelete(id);
      if (!deletePurchase) {
        return null;
      }
      return PurchaseMap.toDomainFromDb(deletePurchase as unknown as PurchaseDbResponse);
    } catch (error) {
      throw error;
    }
  }

  async getPurchaseByIdAndProductName(idPurchase: string, productName: string): Promise<Purchase | null> {
    try {
      const purchase = await this.purchaseModel.findOne({
        _id: idPurchase,
        products: {
          $elemMatch: { name: productName }
        }
      });

      if (!purchase) {
        return null;
      }
      return PurchaseMap.toDomainFromDb(purchase as unknown as PurchaseDbResponse);
    } catch (error) {
      throw error;
    }
  }
}
