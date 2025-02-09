import { createInstanceOrError, genericFiltersSchema, UnexpectedError, UseCase } from '../../../utils';
import { GetStoragesRequestDto } from './getStoragesRequestDto';
import { err, ok, Result } from 'neverthrow';
import { GetStoragesResponse } from './getStoragesResponse';
import { GetStoragesBadRequestError } from './getStoragesErrors';
import { GenericFilters } from '../../../types';
import { IStorageRepository } from '../../../repositories/storage.repository';

type Response = Result<GetStoragesResponse, UnexpectedError | GetStoragesBadRequestError>;

class GetStorages implements UseCase<GetStoragesRequestDto, Response> {
  private readonly storageRepository: IStorageRepository;

  constructor(storageRepo: IStorageRepository) {
    this.storageRepository = storageRepo;
  }

  async execute(request: GetStoragesRequestDto, service?: any): Promise<Response> {
    try {
      const { page, limit, createdAt, updatedAt } = request;
      const validateFilters = createInstanceOrError<GenericFilters>(genericFiltersSchema, {
        page,
        limit,
        createdAt,
        updatedAt
      });
      if (validateFilters.isErr()) {
        return err(new GetStoragesBadRequestError(validateFilters.error));
      }
      const result = await this.storageRepository.getStorages(request);
      return ok(result);
    } catch (error) {
      return err(new UnexpectedError(error));
    }
  }
}

export default GetStorages;
