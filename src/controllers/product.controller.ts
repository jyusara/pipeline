import { Request, Response } from 'express';
import { CreateProductRequestDto } from '../UseCases/product/createProduct/createProductRequestDto';
import { createProduct } from '../UseCases/product/createProduct';
import { CreateProductBadRequestError } from '../UseCases/product/createProduct/createProductErrors';
import { response } from '../utils';
import { StatusCode } from '../types';
import { GetProductsRequestDto } from '../UseCases/product/getProducts/getProductsRequestDto';
import { getProducts } from '../UseCases/product/getProducts';
import { GetProductsBadRequestError } from '../UseCases/product/getProducts/getProductsErrors';
import { getProduct } from '../UseCases/product/getProduct';
import { GetProductNotFoundError } from '../UseCases/product/getProduct/getProductErrors';
import { updateProduct } from '../UseCases/product/updateProduct';
import { UpdateProductRequestDto } from '../UseCases/product/updateProduct/updateProductRequestDto';
import {
  updateProductBadRequestError,
  UpdateProductNotFoundError,
  updateProductRegisterStatusUpdateNotAllowedError
} from '../UseCases/product/updateProduct/updateProductErrors';

export class ProductController {
  constructor() {
    this.createProduct = this.createProduct.bind(this);
  }

  async createProduct(req: Request, res: Response) {
    const { name, price, origin, registerStatus, status, comment, externalProductId, sku } =
      req.body as CreateProductRequestDto;
    const result = await createProduct.execute({
      name,
      price,
      origin,
      registerStatus,
      status,
      comment,
      externalProductId,
      sku
    });
    if (result.isErr()) {
      const error = result.error;
      switch (error.constructor) {
        case CreateProductBadRequestError:
          return response(res, error.message, StatusCode.BAD_REQUEST, error.constructor.name);
        default:
          return response(res, error.message, StatusCode.INTERNAL_SERVER_ERROR, error.constructor.name);
      }
    }
    return response(res, result.value, StatusCode.CREATED);
  }

  async getProducts(req: Request, res: Response) {
    const { limit, page, ...filters } = req.query as GetProductsRequestDto;
    const result = await getProducts.execute({
      limit: Number(limit) || undefined,
      page: Number(page) || undefined,
      ...filters
    });
    if (result.isErr()) {
      const error = result.error;
      switch (error.constructor) {
        case GetProductsBadRequestError:
          return response(res, error.message, StatusCode.BAD_REQUEST, error.constructor.name);
        default:
          return response(res, error.message, StatusCode.INTERNAL_SERVER_ERROR, error.constructor.name);
      }
    }
    return response(res, result.value, StatusCode.OK);
  }

  async getProduct(req: Request, res: Response) {
    const { id } = req.params;
    const result = await getProduct.execute({ id });
    if (result.isErr()) {
      const error = result.error;
      switch (error.constructor) {
        case GetProductNotFoundError:
          return response(res, error.message, StatusCode.NOT_FOUND, error.constructor.name);
        default:
          return response(res, error.message, StatusCode.INTERNAL_SERVER_ERROR, error.constructor.name);
      }
    }
    return response(res, result.value, StatusCode.OK);
  }

  async updateProduct(req: Request, res: Response) {
    const { id, name, price, externalProductId, comment, sku, registerStatus, status } =
      req.body as UpdateProductRequestDto;
    const result = await updateProduct.execute({
      id,
      name,
      price,
      externalProductId,
      comment,
      sku,
      registerStatus,
      status
    });
    if (result.isErr()) {
      const error = result.error;
      switch (error.constructor) {
        case UpdateProductNotFoundError:
          return response(res, error.message, StatusCode.NOT_FOUND, error.constructor.name);
        case updateProductBadRequestError:
          return response(res, error.message, StatusCode.BAD_REQUEST, error.constructor.name);
        case updateProductRegisterStatusUpdateNotAllowedError:
          return response(res, error.message, StatusCode.BAD_REQUEST, error.constructor.name);
        default:
          return response(res, error.message, StatusCode.INTERNAL_SERVER_ERROR, error.constructor.name);
      }
    }
    return response(res, result.value, StatusCode.OK);
  }
}
