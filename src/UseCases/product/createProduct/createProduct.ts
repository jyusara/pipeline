import { err, ok, Result } from 'neverthrow';
import { CreateProductResponseDto } from './createProductResponseDto';
import { createInstanceOrError, UnexpectedError, UseCase } from '../../../utils';
import { CreateProductBadRequestError } from './createProductErrors';
import { CreateProductRequestDto } from './createProductRequestDto';
import { IProductProps, Product, productOriginSchema } from '../../../domain';
import { IProductRepository } from '../../../repositories';
import { DataStatus, OriginData } from '../../../types';

type Response = Result<CreateProductResponseDto, UnexpectedError | CreateProductBadRequestError>;

class CreateProduct implements UseCase<CreateProductRequestDto, Response> {
  private readonly productRepository: IProductRepository;

  constructor(productRepository: IProductRepository) {
    this.productRepository = productRepository;
  }

  async execute(request: IProductProps, service?: any): Promise<Response> {
    try {
      const { origin } = request;

      const validOrigin = createInstanceOrError<{ origin: OriginData }>(productOriginSchema, { origin });

      if (validOrigin.isErr()) {
        return err(new CreateProductBadRequestError(validOrigin.error));
      }

      const productOrError = Product.create(request);
      let error: string | undefined;
      let product: Product | undefined;

      if (productOrError.isErr()) {
        error = productOrError.error;
      } else {
        product = productOrError.value;
      }

      const orderInvalidPayload: IProductProps = {
        ...request,
        comment: error
      };

      const existsProduct = await this.productRepository.getProduct({
        externalProductId: product?.externalProductId,
        sku: product?.sku
      });

      if (existsProduct && origin === OriginData.MANUAL) {
        return err(new CreateProductBadRequestError('Product with same externalProductId or sku already exists'));
      }

      if (existsProduct && origin === OriginData.ONLINE) {
        return ok(existsProduct);
      }

      if (validOrigin.value.origin === OriginData.ONLINE) {
        if (error) {
          return ok(await this.productRepository.createProduct(orderInvalidPayload, DataStatus.INVALID));
        }
        return ok(await this.productRepository.createProduct(request, DataStatus.VALID));
      }

      if (error) {
        return err(new CreateProductBadRequestError(error));
      }

      const result = await this.productRepository.createProduct(product!, DataStatus.VALID);
      return ok(result);
    } catch (error) {
      return err(new UnexpectedError(error));
    }
  }
}

export default CreateProduct;
