import { err, ok, Result } from 'neverthrow';
import { UseCase } from '../../../utils';
import { CreateStorageBadRequestError, StorageAlreadyRegisteredError } from './createStorageErrors';
import { CreateStorageResponse } from './createStorageResponse';
import { CreateStorageRequestDto } from './createStorageRequestDto';
import { IStorageRepository } from '../../../repositories/storage.repository';
import { Storage } from '../../../domain/storage/storage';

type Response = Result<CreateStorageResponse, CreateStorageBadRequestError | StorageAlreadyRegisteredError>;

class CreateStorage implements UseCase<CreateStorageRequestDto, Response> {
  private readonly storageRepository: IStorageRepository;

  constructor(storageRepo: IStorageRepository) {
    this.storageRepository = storageRepo;
  }

  async execute(request: CreateStorageRequestDto, service?: any): Promise<Response> {
    try {
      const storageInstanceOrError = Storage.create(request);
      if (storageInstanceOrError.isErr()) {
        return err(new CreateStorageBadRequestError(storageInstanceOrError.error));
      }

      const storageInstance = storageInstanceOrError.value;
      //verificar si el storage.email ya esta asignado
      // if (storageInstance.email) {
      //     let existingStorage = await this.storageRepository.getStorage({
      //         email: storageInstance.email
      //     })
      //     if (existingStorage) {
      //         return err(new StorageAlreadyRegisteredError('Storage Email already registered'))
      //     }
      // }

      const result = await this.storageRepository.createStorage(storageInstance);
      return ok(result);
    } catch (error) {
      return err(error);
    }
  }
}
export default CreateStorage;
