import { err, ok, Result } from 'neverthrow';
import { UpdateProviderRequestDto } from './updateProviderRequestDto';
import { UpdateProviderResponseDto } from './updateProviderResponseDto';
import { UnexpectedError, UseCase } from '../../../utils';
import { IProviderRepository } from '../../../repositories/provider.repository';
import { isValidObjectId } from 'mongoose';
import {
  UpdateProviderBadRequestError,
  UpdateProviderInvalidIdError,
  UpdateProviderNotFoundError
} from './updateProviderErrors';
import { IProviderProps, Provider } from '../../../domain';

type Response = Result<
  UpdateProviderResponseDto,
  UnexpectedError | UpdateProviderBadRequestError | UpdateProviderInvalidIdError | UpdateProviderNotFoundError
>;

class UpdateProvider implements UseCase<UpdateProviderRequestDto, Response> {
  private readonly providerRepository: IProviderRepository;

  constructor(providerRepository: IProviderRepository) {
    this.providerRepository = providerRepository;
  }

  async execute(request: UpdateProviderRequestDto, service?: any): Promise<Response> {
    try {
      const { id, ...data } = request;

      if (!id) {
        return err(new UpdateProviderBadRequestError('The id is missing and must be provided'));
      }

      //Validar id
      if (!isValidObjectId(id)) {
        return err(new UpdateProviderInvalidIdError());
      }

      //Validar campos
      const instanceOrError = Provider.partialCreate(data as IProviderProps);
      if (instanceOrError.isErr()) {
        return err(new UpdateProviderBadRequestError(instanceOrError.error));
      }

      //Validar si exite provider
      const existProvider = await this.providerRepository.getProvider({ id });
      if (!existProvider) {
        return err(new UpdateProviderNotFoundError());
      }

      //validar si ruc esta registrado
      if (request.ruc) {
        const isRucRegistered = await this.providerRepository.getProvider({ ruc: request.ruc });
        if (isRucRegistered) {
          return err(new UpdateProviderBadRequestError('Provider with same RUC already exists'));
        }
      }
      const result = await this.providerRepository.updateProvider(id, instanceOrError.value);
      if (!result) {
        return err(new UpdateProviderNotFoundError());
      }
      return ok(result);
    } catch (error) {
      return err(new UnexpectedError(error));
    }
  }
}

export default UpdateProvider;
