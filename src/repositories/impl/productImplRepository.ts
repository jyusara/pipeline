import { IProductProps, Product } from '../../domain';
import { IProductRepository, ProductFilters } from '../product.repository';
import { productModel } from '../../db/mongo.schema';
import { DataStatus, GenericFilters } from '../../types';
import { ProductDbResponse, ProductMap } from '../../mappers';
import { getDataByFilters, getPaginateAndFilteredData, IPaginateData } from '../../helpers';

export class ProductImplRepository implements IProductRepository {
  private readonly productModel: typeof productModel;

  constructor() {
    this.productModel = productModel;
  }

  async getProduct(filters?: ProductFilters): Promise<Product | null> {
    try {
      const result = await getDataByFilters<Product, ProductFilters>(productModel, filters);
      if (!result) {
        return null;
      }
      return ProductMap.toDbFromDomain(result as ProductDbResponse);
    } catch (error) {
      throw error;
    }
  }

  async getProducts(filters?: ProductFilters & GenericFilters): Promise<IPaginateData<Product>> {
    try {
      const { page, limit, ...query } = filters || {};
      const result = await getPaginateAndFilteredData<Product, ProductFilters>(page, limit, productModel, query);
      const productMap = result.data.map((product) => ProductMap.toDbFromDomain(product as ProductDbResponse));
      return {
        data: productMap,
        page: result.page,
        limit: result.limit,
        totalRecords: result.totalRecords,
        totalPages: result.totalPages
      };
    } catch (error) {
      throw error;
    }
  }

  async createProduct(product: IProductProps, registerStatus?: DataStatus): Promise<Product> {
    try {
      const newProduct = new this.productModel({
        ...product,
        registerStatus: registerStatus === DataStatus.VALID ? DataStatus.VALID : DataStatus.INVALID
      });
      return ProductMap.toDbFromDomain(await newProduct.save());
    } catch (error) {
      throw error;
    }
  }

  async updateProduct(id: string, product: Partial<IProductProps>): Promise<Product | null> {
    try {
      const updatedProduct = await this.productModel.findByIdAndUpdate(id, product, { new: true });
      if (!updatedProduct) {
        return null;
      }
      return ProductMap.toDbFromDomain(updatedProduct);
    } catch (error) {
      throw error;
    }
  }
}
