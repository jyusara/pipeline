import { err, ok, Result } from 'neverthrow';
import { UpdateStorageResponse } from './updateStorageResponse';
import {
  UpdateStorageAlreadyAssigned,
  UpdateStorageBadRequestError,
  UpdateStorageIdNotValidError,
  UpdateStorageNotFoundError
} from './updateStorageErrors';
import { UnexpectedError, UseCase } from '../../../utils';
import { UpdateStoragesRequestDto } from './updateStorageRequestDto';
import { IStorageProps, validateUpdateStorageSchema } from '../../../domain';
import { isValidObjectId } from 'mongoose';
import { IStorageRepository } from '../../../repositories/storage.repository';

type Response = Result<
  UpdateStorageResponse,
  | UnexpectedError
  | UpdateStorageNotFoundError
  | UpdateStorageBadRequestError
  | UpdateStorageIdNotValidError
  | UpdateStorageAlreadyAssigned
>;

class UpdateStorage implements UseCase<UpdateStoragesRequestDto, Response> {
  private readonly storageRepository: IStorageRepository;

  constructor(storageRepo: IStorageRepository) {
    this.storageRepository = storageRepo;
  }

  async execute(request: UpdateStoragesRequestDto, service?: any): Promise<Response> {
    const { id, ...updateData } = request;
    try {
      // Validar formato del id
      if (!isValidObjectId(id)) {
        return err(new UpdateStorageIdNotValidError());
      }
      // verificar si updateData esta vacio
      if (Object.keys(updateData).length === 0) {
        return err(new UpdateStorageBadRequestError('Empty petition is not accepted'));
      }
      // Verificar la existencia del agente
      const existingStorage = await this.storageRepository.getStorage({ id });
      if (!existingStorage) {
        return err(new UpdateStorageNotFoundError());
      }

      // Validar los datos del request
      const { error } = validateUpdateStorageSchema(updateData);
      if (error) {
        return err(new UpdateStorageBadRequestError(error.details.map((e) => e.message).join('. ')));
      }

      // Actualizar el storage
      const updatedStorage = await this.storageRepository.updateStorage(id, updateData);
      if (!updatedStorage) {
        return err(new UpdateStorageBadRequestError('Failed to update storage'));
      }
      return ok(updatedStorage);
    } catch (error) {
      return err(new UnexpectedError(error));
    }
  }
}

export default UpdateStorage;
