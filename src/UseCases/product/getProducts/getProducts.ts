import { err, ok, Result } from 'neverthrow';
import { GetProductsResponseDto } from './getProductsResponseDto';
import { createInstanceOrError, genericFiltersSchema, UnexpectedError, UseCase } from '../../../utils';
import { GetProductsBadRequestError } from './getProductsErrors';
import { GetProductsRequestDto } from './getProductsRequestDto';
import { GenericFilters } from '../../../types';
import { IProductRepository } from '../../../repositories';

type Response = Result<GetProductsResponseDto, UnexpectedError | GetProductsBadRequestError>;

class GetProducts implements UseCase<GetProductsRequestDto, Response> {
  private readonly productRepository: IProductRepository;

  constructor(productRepository: IProductRepository) {
    this.productRepository = productRepository;
  }

  async execute(request: GetProductsRequestDto, service?: any): Promise<Response> {
    try {
      const { page, limit, createdAt, updatedAt } = request;
      const validateFilters = createInstanceOrError<GenericFilters>(genericFiltersSchema, {
        page,
        limit,
        createdAt,
        updatedAt
      });
      if (validateFilters.isErr()) {
        return err(new GetProductsBadRequestError(validateFilters.error));
      }
      const result = await this.productRepository.getProducts(request);
      return ok(result);
    } catch (error) {
      return err(new UnexpectedError(error));
    }
  }
}

export default GetProducts;
