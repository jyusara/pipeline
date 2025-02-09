import { err, ok, Result } from 'neverthrow';
import { GetProductResponseDto } from './getProductResponseDto';
import { UnexpectedError, UseCase } from '../../../utils';
import { GetProductBadRequestError, GetProductNotFoundError } from './getProductErrors';
import { GetProductRequestDto } from './getProductRequestDto';
import { IProductRepository, ProductFilters } from '../../../repositories/product.repository';

type Response = Result<GetProductResponseDto, UnexpectedError | GetProductBadRequestError | GetProductNotFoundError>;

class GetProduct implements UseCase<GetProductRequestDto, Response> {
  private readonly productRepository: IProductRepository;

  constructor(productRepository: IProductRepository) {
    this.productRepository = productRepository;
  }

  async execute(request: ProductFilters, service?: any): Promise<Response> {
    try {
      const result = await this.productRepository.getProduct(request);
      if (!result) {
        return err(new GetProductNotFoundError());
      }
      return ok(result);
    } catch (error) {
      return err(new UnexpectedError(error));
    }
  }
}

export default GetProduct;
