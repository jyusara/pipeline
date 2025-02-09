import { err, ok, Result } from 'neverthrow';
import { GetProvidersRequestDto } from './getProvidersRequestDto';
import { GetProvidersResponseDto } from './getProvidersResponseDto';
import { createInstanceOrError, genericFiltersSchema, UnexpectedError, UseCase } from '../../../utils';
import { IProviderRepository } from '../../../repositories/provider.repository';
import { GenericFilters } from '../../../types';
import { GetProvidersBadRequestError } from './getProvidersErrors';

type Response = Result<GetProvidersResponseDto, UnexpectedError | GetProvidersBadRequestError>;

class GetProviders implements UseCase<GetProvidersRequestDto, Response> {
  private readonly providerRepository: IProviderRepository;

  constructor(providerRepository: IProviderRepository) {
    this.providerRepository = providerRepository;
  }

  async execute(request: GetProvidersRequestDto, service?: any): Promise<Response> {
    try {
      const { page, limit, createdAt, updatedAt } = request;
      const validateFilters = createInstanceOrError<GenericFilters>(genericFiltersSchema, {
        page,
        limit,
        createdAt,
        updatedAt
      });
      if (validateFilters.isErr()) {
        return err(new GetProvidersBadRequestError(validateFilters.error));
      }
      const result = await this.providerRepository.getProviders(request);
      return ok(result);
    } catch (error) {
      return err(new UnexpectedError(error));
    }
  }
}

export default GetProviders;
