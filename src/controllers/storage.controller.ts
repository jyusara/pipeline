import { Request, Response } from 'express';
import { StatusCode } from '../types';
import { createStorage } from '../UseCases/storage/createStorage';
import { getStorages } from '../UseCases/storage/getStorages';
import { getStorage } from '../UseCases/storage/getStorage';
import { deleteStorage } from '../UseCases/storage/deleteStorage';
import { updateStorage } from '../UseCases/storage/updateStorage';
import { CreateStorageBadRequestError } from '../UseCases/storage/createStorage/createStorageErrors';
import { CreateStorageRequestDto } from '../UseCases/storage/createStorage/createStorageRequestDto';
import { GetStoragesRequestDto } from '../UseCases/storage/getStorages/getStoragesRequestDto';
import { response } from '../utils';
import { GetStoragesBadRequestError } from '../UseCases/storage/getStorages/getStoragesErrors';
import {
  DeleteStorageBadRequestError,
  DeleteStorageNotFoundError
} from '../UseCases/storage/deleteStorage/deleteStorageErrors';
import {
  GetStorageBadRequestError,
  GetStorageIdNotValidError,
  GetStorageNotFoundError
} from '../UseCases/storage/getStorage/getStorageErrors';
import { UpdateStoragesRequestDto } from '../UseCases/storage/updateStorage/updateStorageRequestDto';
import {
  UpdateStorageAlreadyAssigned,
  UpdateStorageBadRequestError,
  UpdateStorageIdNotValidError,
  UpdateStorageNotFoundError
} from '../UseCases/storage/updateStorage/updateStorageErrors';

export class StorageController {
  constructor() {
    this.createStorage = this.createStorage.bind(this);
    this.getStorages = this.getStorages.bind(this);
    this.getStorage = this.getStorage.bind(this);
    this.deleteStorage = this.deleteStorage.bind(this);
    this.updateStorage = this.updateStorage.bind(this);
  }

  async createStorage(req: Request, res: Response) {
    const payload = req.body as CreateStorageRequestDto;
    const result = await createStorage.execute(payload);
    if (result.isErr()) {
      const error = result.error;
      switch (error.constructor) {
        case CreateStorageBadRequestError:
          return response(res, error.message, StatusCode.BAD_REQUEST, error.constructor.name);
        default:
          return response(res, error.message, StatusCode.BAD_REQUEST, error.constructor.name);
      }
    }
    return response(res, result.value, StatusCode.CREATED);
  }

  async getStorages(req: Request, res: Response) {
    const { limit, page, ...filters } = req.query as GetStoragesRequestDto;
    const result = await getStorages.execute({
      limit: Number(limit) || undefined,
      page: Number(page) || undefined,
      ...filters
    });
    if (result.isErr()) {
      const error = result.error;
      switch (error.constructor) {
        case GetStoragesBadRequestError:
          return response(res, error.message, StatusCode.BAD_REQUEST, error.constructor.name);
        default:
          return response(res, error.message, StatusCode.INTERNAL_SERVER_ERROR, error.constructor.name);
      }
    }
    return response(res, result.value, StatusCode.OK);
  }

  async getStorage(req: Request, res: Response) {
    const { id } = req.params;
    const result = await getStorage.execute({ id });
    if (result.isErr()) {
      const error = result.error;
      switch (error.constructor) {
        case GetStorageNotFoundError:
          return response(res, error.message, StatusCode.NOT_FOUND, error.constructor.name);
        case GetStorageBadRequestError:
          return response(res, error.message, StatusCode.BAD_REQUEST, error.constructor.name);
        case GetStorageIdNotValidError:
          return response(res, error.message, StatusCode.BAD_REQUEST, error.constructor.name);
        default:
          return response(res, error.message, StatusCode.INTERNAL_SERVER_ERROR, error.constructor.name);
      }
    }
    return response(res, result.value, StatusCode.OK);
  }

  async updateStorage(req: Request, res: Response) {
    // Combina el ID de la URL con el cuerpo del request
    const updateRequest: UpdateStoragesRequestDto = {
      id: req.params.id,
      ...req.body
    };
    const result = await updateStorage.execute(updateRequest);
    if (result.isErr()) {
      const error = result.error;
      switch (error.constructor) {
        case UpdateStorageNotFoundError:
          return response(res, error.message, StatusCode.NOT_FOUND, error.constructor.name);
        case UpdateStorageBadRequestError:
          return response(res, error.message, StatusCode.BAD_REQUEST, error.constructor.name);
        case UpdateStorageIdNotValidError:
          return response(res, error.message, StatusCode.BAD_REQUEST, error.constructor.name);
        case UpdateStorageAlreadyAssigned:
          return response(res, error.message, StatusCode.BAD_REQUEST, error.constructor.name);
        default:
          return response(res, error.message, StatusCode.INTERNAL_SERVER_ERROR, error.constructor.name);
      }
    }
    return response(res, result.value, StatusCode.OK);
  }

  async deleteStorage(req: Request, res: Response) {
    const { id } = req.params;
    const result = await deleteStorage.execute({ id });
    if (result.isErr()) {
      const error = result.error;
      switch (error.constructor) {
        case DeleteStorageNotFoundError:
          return response(res, error.message, StatusCode.NOT_FOUND, error.constructor.name);
        case DeleteStorageBadRequestError:
          return response(res, error.message, StatusCode.BAD_REQUEST, error.constructor.name);
        default:
          return response(res, error.message, StatusCode.INTERNAL_SERVER_ERROR, error.constructor.name);
      }
    }
    return response(res, result.value, StatusCode.OK);
  }
}
