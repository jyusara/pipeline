import { err, ok, Result } from 'neverthrow';
import { GetProviderResponseDto } from './getProviderResponseDto';
import { UnexpectedError, UseCase } from '../../../utils';
import { IProviderRepository, ProviderFilters } from '../../../repositories/provider.repository';
import { GetProviderRequestDto } from './getProviderRequestDto';
import { isValidObjectId } from 'mongoose';
import { GetProviderInvalidIdError, GetProviderNotFoundError } from './getProviderErrors';

type Response = Result<GetProviderResponseDto, UnexpectedError | GetProviderInvalidIdError | GetProviderNotFoundError>;

class GetProvider implements UseCase<GetProviderRequestDto, Response> {
  private readonly providerRepository: IProviderRepository;

  constructor(providerRepository: IProviderRepository) {
    this.providerRepository = providerRepository;
  }

  async execute(request: ProviderFilters, service?: any): Promise<Response> {
    try {
      const { id } = request;
      if (!isValidObjectId(id)) {
        return err(new GetProviderInvalidIdError());
      }
      const result = await this.providerRepository.getProvider(request);
      if (!result) {
        return err(new GetProviderNotFoundError());
      }
      return ok(result);
    } catch (error) {
      return err(new UnexpectedError(error));
    }
  }
}

export default GetProvider;
