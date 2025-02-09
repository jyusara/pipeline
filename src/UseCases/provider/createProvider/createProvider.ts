import { UnexpectedError, UseCase } from '../../../utils';
import { CreateProviderRequestDto } from './createProviderRequestDto';
import { CreateProviderResponseDto } from './createProviderResponseDto';
import { err, ok, Result } from 'neverthrow';
import { IProviderRepository } from '../../../repositories/provider.repository';
import { IProviderProps, Provider } from '../../../domain';
import { CreateProviderBadRequestError } from './createProviderErrors';

type Response = Result<CreateProviderResponseDto, UnexpectedError | CreateProviderBadRequestError>;

class CreateProvider implements UseCase<CreateProviderRequestDto, Response> {
  private readonly providerRepository: IProviderRepository;

  constructor(providerRepository: IProviderRepository) {
    this.providerRepository = providerRepository;
  }

  async execute(request: IProviderProps, service?: any): Promise<Response> {
    try {
      const providerOrError = Provider.create(request);
      if (providerOrError.isErr()) {
        return err(new CreateProviderBadRequestError(providerOrError.error));
      }
      const provider = providerOrError.value;

      //validar si existe ruc
      const isRucRegistered = await this.providerRepository.getProvider({ ruc: request.ruc });
      if (isRucRegistered) {
        return err(new CreateProviderBadRequestError('Provider with same RUC already exists'));
      }

      const result = await this.providerRepository.createProvider(provider);
      return ok(result);
    } catch (error) {
      return err(new UnexpectedError(error));
    }
  }
}

export default CreateProvider;
