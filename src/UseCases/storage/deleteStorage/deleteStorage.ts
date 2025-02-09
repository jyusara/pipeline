import { err, ok, Result } from 'neverthrow';
import { DeleteStorageResponseDto } from './deleteStorageResponse';
import { DeleteStorageBadRequestError, DeleteStorageNotFoundError } from './deleteStorageErrors';
import { UseCase } from '../../../utils';
import { DeleteStorageRequestDto } from './deleteStorageRequestDto';
import { IStorageRepository } from '../../../repositories/storage.repository';
import { isValidObjectId } from 'mongoose';

type Response = Result<DeleteStorageResponseDto, DeleteStorageNotFoundError | DeleteStorageBadRequestError>;

class DeleteStorage implements UseCase<DeleteStorageRequestDto, Response> {
  private readonly storageRepository: IStorageRepository;

  constructor(storageRepo: IStorageRepository) {
    this.storageRepository = storageRepo;
  }

  async execute(request: DeleteStorageRequestDto, service?: any): Promise<Response> {
    try {
      if (!isValidObjectId(request.id)) {
        return err(new DeleteStorageBadRequestError('The provided ID is not valid.'));
      }
      const storageExist = await this.storageRepository.getStorage({ id: request.id });
      if (!storageExist) {
        return err(new DeleteStorageNotFoundError());
      }
      await this.storageRepository.deleteStorage(request.id);
      return ok({ message: 'Storage deleted successfully' });
    } catch (error) {
      return err(error);
    }
  }
}
export default DeleteStorage;
