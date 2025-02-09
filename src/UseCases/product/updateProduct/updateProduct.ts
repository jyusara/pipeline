import { err, ok, Result } from 'neverthrow';
import { UpdateProductResponseDto } from './updateProductResponseDto';
import { UnexpectedError, UseCase } from '../../../utils';
import {
  updateProductBadRequestError,
  UpdateProductInvalidIdError,
  UpdateProductNotFoundError,
  updateProductRegisterStatusUpdateNotAllowedError
} from './updateProductErrors';
import { UpdateProductRequestDto } from './updateProductRequestDto';
import { IProductRepository } from '../../../repositories';
import { isValidObjectId } from 'mongoose';
import { IProductProps, Product } from '../../../domain';
import { DataStatus } from '../../../types';

type Response = Result<
  UpdateProductResponseDto,
  | UnexpectedError
  | UpdateProductInvalidIdError
  | UpdateProductNotFoundError
  | updateProductBadRequestError
  | updateProductRegisterStatusUpdateNotAllowedError
>;

class UpdateProduct implements UseCase<UpdateProductRequestDto, Response> {
  private readonly productRepository: IProductRepository;

  constructor(productRespository: IProductRepository) {
    this.productRepository = productRespository;
  }

  async execute(request: UpdateProductRequestDto): Promise<Response> {
    try {
      const { id, ...data } = request;

      if (!id) {
        return err(new updateProductBadRequestError('The id is missing and must be provided'));
      }

      if (!isValidObjectId(id)) {
        return err(new UpdateProductInvalidIdError());
      }

      const productExist = await this.productRepository.getProduct({ id });

      if (!productExist) {
        return err(new UpdateProductNotFoundError());
      }
      const productOrError = Product.partialCreate(data as IProductProps);

      if (productOrError.isErr()) {
        return err(new updateProductBadRequestError(productOrError.error));
      }

      //validar que si el registerStatus es valid
      if (productOrError.value.registerStatus && productExist.registerStatus === DataStatus.VALID) {
        return err(new updateProductRegisterStatusUpdateNotAllowedError());
      }

      //Validar si se estan modificando para verificar coincidencias
      if (data.externalProductId || data.sku) {
        const externalProductIdAndSkuExist = await this.productRepository.getProduct({
          externalProductId: data.externalProductId,
          sku: data.sku
        });

        if (externalProductIdAndSkuExist) {
          return err(new updateProductBadRequestError('Product with same externalProductId or sku already exists'));
        }
      }
      const result = await this.productRepository.updateProduct(id, productOrError.value);
      if (!result) {
        return err(new UpdateProductNotFoundError());
      }
      return ok(result);
    } catch (error) {
      return err(new UnexpectedError(error));
    }
  }
}

export default UpdateProduct;
