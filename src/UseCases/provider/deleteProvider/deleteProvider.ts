import { err, ok, Result } from 'neverthrow';
import { DeleteProviderResponseDto } from './deleteProviderResponseDto';
import { UnexpectedError, UseCase } from '../../../utils';
import { DeleteProviderRequestDto } from './deleteProviderRequestDto';
import { IProviderRepository } from '../../../repositories/provider.repository';
import { isValidObjectId } from 'mongoose';
import { DeleteProviderInvalidIdError, DeleteProviderNotFoundError } from './deleteProviderErrors';

type Response = Result<
  DeleteProviderResponseDto,
  UnexpectedError | DeleteProviderInvalidIdError | DeleteProviderNotFoundError
>;

class DeleteProvider implements UseCase<DeleteProviderRequestDto, Response> {
  private readonly providerRepository: IProviderRepository;

  constructor(providerRepository: IProviderRepository) {
    this.providerRepository = providerRepository;
  }

  async execute(request: DeleteProviderRequestDto, service?: any): Promise<Response> {
    try {
      const { id } = request;

      if (!isValidObjectId(id)) {
        return err(new DeleteProviderInvalidIdError());
      }

      const providerExist = await this.providerRepository.getProvider({ id });
      if (!providerExist) {
        return err(new DeleteProviderNotFoundError());
      }

      const result = await this.providerRepository.deleteProvider(id);
      if (!result) {
        return err(new DeleteProviderNotFoundError());
      }
      return ok({ message: 'Provider successfully eliminated' });
    } catch (error) {
      return err(new UnexpectedError(error));
    }
  }
}

export default DeleteProvider;
