import { err, ok, Result } from 'neverthrow';
import { GetStorageResponseDto } from './getStorageResponse';
import { GetStorageBadRequestError, GetStorageIdNotValidError, GetStorageNotFoundError } from './getStorageErrors';
import { UnexpectedError, UseCase } from '../../../utils';
import { GetStorageRequestDto } from './getStorageRequestDto';
import { IStorageRepository, StorageFilter } from '../../../repositories/storage.repository';
import { isValidObjectId } from 'mongoose';

type Response = Result<GetStorageResponseDto, UnexpectedError | GetStorageBadRequestError | GetStorageNotFoundError>;

class GetStorage implements UseCase<GetStorageRequestDto, Response> {
  private readonly storageRepository: IStorageRepository;

  constructor(storageRepo: IStorageRepository) {
    this.storageRepository = storageRepo;
  }

  async execute(request: StorageFilter, service?: any): Promise<Response> {
    try {
      if (!isValidObjectId(request.id)) {
        return err(new GetStorageIdNotValidError());
      }
      const result = await this.storageRepository.getStorage(request);
      if (!result) {
        return err(new GetStorageNotFoundError());
      }
      return ok(result);
    } catch (error) {
      return err(new UnexpectedError(error));
    }
  }
}

export default GetStorage;
