import { Request, Response } from 'express';
import { StatusCode } from '../types';
import { createProvider } from '../UseCases/provider/createProvider';
import { CreateProviderBadRequestError } from '../UseCases/provider/createProvider/createProviderErrors';
import { CreateProviderRequestDto } from '../UseCases/provider/createProvider/createProviderRequestDto';
import { deleteProvider } from '../UseCases/provider/deleteProvider';
import {
  DeleteProviderInvalidIdError,
  DeleteProviderNotFoundError
} from '../UseCases/provider/deleteProvider/deleteProviderErrors';
import { getProvider } from '../UseCases/provider/getProvider';
import {
  GetProviderInvalidIdError,
  GetProviderNotFoundError
} from '../UseCases/provider/getProvider/getProviderErrors';
import { getProviders } from '../UseCases/provider/getProviders';
import { GetProvidersBadRequestError } from '../UseCases/provider/getProviders/getProvidersErrors';
import { GetProvidersRequestDto } from '../UseCases/provider/getProviders/getProvidersRequestDto';
import { updateProvider } from '../UseCases/provider/updateProvider';
import {
  UpdateProviderBadRequestError,
  UpdateProviderInvalidIdError,
  UpdateProviderNotFoundError
} from '../UseCases/provider/updateProvider/updateProviderErrors';
import { UpdateProviderRequestDto } from '../UseCases/provider/updateProvider/updateProviderRequestDto';
import { response } from '../utils';

export class ProviderController {
  constructor() {
    this.createProvider = this.createProvider.bind(this);
  }

  async createProvider(req: Request, res: Response) {
    const {
      name,
      ruc,
      phone,
      addressLine,
      email,
      status,
      referencePhoneNumber,
      referenceContactName,
      accountNumber,
      businessCategory
    } = req.body as CreateProviderRequestDto;

    const result = await createProvider.execute({
      name,
      ruc,
      phone,
      addressLine,
      email,
      status,
      referencePhoneNumber,
      referenceContactName,
      accountNumber,
      businessCategory
    });

    if (result.isErr()) {
      const error = result.error;
      switch (error.constructor) {
        case CreateProviderBadRequestError:
          return response(res, error.message, StatusCode.BAD_REQUEST, error.constructor.name);
        default:
          return response(res, error.message, StatusCode.INTERNAL_SERVER_ERROR, error.constructor.name);
      }
    }
    return response(res, result.value, StatusCode.CREATED);
  }

  async getProviders(req: Request, res: Response) {
    const { limit, page, ...filters } = req.body as GetProvidersRequestDto;
    const result = await getProviders.execute({
      limit: Number(limit) || undefined,
      page: Number(page) || undefined,
      ...filters
    });

    if (result.isErr()) {
      const error = result.error;
      switch (error.constructor) {
        case GetProvidersBadRequestError:
          return response(res, error.message, StatusCode.BAD_REQUEST, error.constructor.name);
        default:
          return response(res, error.message, StatusCode.INTERNAL_SERVER_ERROR, error.constructor.name);
      }
    }
    return response(res, result.value, StatusCode.OK);
  }

  async getProvider(req: Request, res: Response) {
    const { id } = req.params;
    const result = await getProvider.execute({ id });
    if (result.isErr()) {
      const error = result.error;
      switch (error.constructor) {
        case GetProviderInvalidIdError:
          return response(res, error.message, StatusCode.BAD_REQUEST, error.constructor.name);
        case GetProviderNotFoundError:
          return response(res, error.message, StatusCode.NOT_FOUND, error.constructor.name);
        default:
          return response(res, error.message, StatusCode.INTERNAL_SERVER_ERROR, error.constructor.name);
      }
    }
    return response(res, result.value, StatusCode.OK);
  }

  async updateProvider(req: Request, res: Response) {
    const {
      id,
      name,
      ruc,
      phone,
      addressLine,
      email,
      status,
      referencePhoneNumber,
      referenceContactName,
      accountNumber,
      businessCategory
    } = req.body as UpdateProviderRequestDto;

    const result = await updateProvider.execute({
      id,
      name,
      ruc,
      phone,
      addressLine,
      email,
      status,
      referencePhoneNumber,
      referenceContactName,
      accountNumber,
      businessCategory
    });

    if (result.isErr()) {
      const error = result.error;
      switch (error.constructor) {
        case UpdateProviderInvalidIdError:
          return response(res, error.message, StatusCode.BAD_REQUEST, error.constructor.name);
        case UpdateProviderBadRequestError:
          return response(res, error.message, StatusCode.BAD_REQUEST, error.constructor.name);
        case UpdateProviderNotFoundError:
          return response(res, error.message, StatusCode.NOT_FOUND, error.constructor.name);
        default:
          return response(res, error.message, StatusCode.INTERNAL_SERVER_ERROR, error.constructor.name);
      }
    }

    return response(res, result.value, StatusCode.OK);
  }

  async deleteProvider(req: Request, res: Response) {
    const { id } = req.params;

    const result = await deleteProvider.execute({ id });
    if (result.isErr()) {
      const error = result.error;
      switch (error.constructor) {
        case DeleteProviderInvalidIdError:
          return response(res, error.message, StatusCode.BAD_REQUEST, error.constructor.name);
        case DeleteProviderNotFoundError:
          return response(res, error.message, StatusCode.NOT_FOUND, error.constructor.name);
        default:
          return response(res, error.message, StatusCode.INTERNAL_SERVER_ERROR, error.constructor.name);
      }
    }
    return response(res, result.value, StatusCode.OK);
  }
}
