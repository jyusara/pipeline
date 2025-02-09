import { Request, Response } from 'express';
import { StatusCode } from '../types';
import { createPurchase } from '../UseCases/purchase/createPurchase';
import {
  CreatePurchaseBadRequestError,
  CreatePurchaseProviderNotfoundError,
  CreatePurchaseStorageNotfoundError
} from '../UseCases/purchase/createPurchase/createPurchaseErrors';
import { CreatePurchaseRequestDto } from '../UseCases/purchase/createPurchase/createPurchaseRequestDto';
import { deletePurchase } from '../UseCases/purchase/deletePurchase';
import {
  DeletePurchaseInvalidIdError,
  DeletePurchaseNotFoundError
} from '../UseCases/purchase/deletePurchase/deletePurchaseErrors';
import { getPurchase } from '../UseCases/purchase/getPurchase';
import {
  GetPurchaseInvalidIdError,
  GetPurchaseNotFoundError
} from '../UseCases/purchase/getPurchase/getPurchaseErrors';
import { getPurchases } from '../UseCases/purchase/getPurchases';
import { GetPurchasesBadRequestError } from '../UseCases/purchase/getPurchases/getPurchasesErrors';
import { GetPurchasesRequestDto } from '../UseCases/purchase/getPurchases/getPurchasesRequestDto';
import { updatePurchase } from '../UseCases/purchase/updatePurchase';
import {
  UpdatePurchaseBadRequestError,
  UpdatePurchaseInvalidIdError,
  UpdatePurchaseNotFoundError,
  UpdatePurchaseProviderNotFoundError,
  UpdatePurchaseStorageNotFoundError
} from '../UseCases/purchase/updatePurchase/updatePurchaseErrors';
import { UpdatePurchaseRequestDto } from '../UseCases/purchase/updatePurchase/updatePurchaseRequestDto';
import { response } from '../utils';

export class PurchaseController {
  constructor() {
    this.createPurchase = this.createPurchase.bind(this);
  }

  async createPurchase(req: Request, res: Response) {
    const payload = req.body as CreatePurchaseRequestDto;
    const result = await createPurchase.execute(payload);
    if (result.isErr()) {
      const error = result.error;
      switch (error.constructor) {
        case CreatePurchaseBadRequestError:
          return response(res, error.message, StatusCode.BAD_REQUEST, error.constructor.name);
        case CreatePurchaseProviderNotfoundError:
          return response(res, error.message, StatusCode.NOT_FOUND, error.constructor.name);
        case CreatePurchaseStorageNotfoundError:
          return response(res, error.message, StatusCode.NOT_FOUND, error.constructor.name);
        default:
          return response(res, error.message, StatusCode.INTERNAL_SERVER_ERROR, error.constructor.name);
      }
    }
    return response(res, result.value, StatusCode.CREATED);
  }

  async getPurchase(req: Request, res: Response) {
    const { id } = req.params;
    const result = await getPurchase.execute({ id });
    if (result.isErr()) {
      const error = result.error;
      switch (error.constructor) {
        case GetPurchaseInvalidIdError:
          return response(res, error.message, StatusCode.BAD_REQUEST, error.constructor.name);
        case GetPurchaseNotFoundError:
          return response(res, error.message, StatusCode.NOT_FOUND, error.constructor.name);
        default:
          return response(res, error.message, StatusCode.INTERNAL_SERVER_ERROR, error.constructor.name);
      }
    }
    return response(res, result.value, StatusCode.OK);
  }

  async getPurchases(req: Request, res: Response) {
    const { limit, page, ...filters } = req.body as GetPurchasesRequestDto;
    const result = await getPurchases.execute({
      limit: Number(limit) || undefined,
      page: Number(page) || undefined,
      ...filters
    });

    if (result.isErr()) {
      const error = result.error;
      switch (error.constructor) {
        case GetPurchasesBadRequestError:
          return response(res, error.message, StatusCode.BAD_REQUEST, error.constructor.name);
        default:
          return response(res, error.message, StatusCode.INTERNAL_SERVER_ERROR, error.constructor.name);
      }
    }
    return response(res, result.value, StatusCode.OK);
  }

  async updatePurchase(req: Request, res: Response) {
    const data = req.body as UpdatePurchaseRequestDto;
    const result = await updatePurchase.execute(data);
    if (result.isErr()) {
      const error = result.error;
      switch (error.constructor) {
        case UpdatePurchaseBadRequestError:
          return response(res, error.message, StatusCode.BAD_REQUEST, error.constructor.name);
        case UpdatePurchaseInvalidIdError:
          return response(res, error.message, StatusCode.BAD_REQUEST, error.constructor.name);
        case UpdatePurchaseNotFoundError:
          return response(res, error.message, StatusCode.NOT_FOUND, error.constructor.name);
        case UpdatePurchaseProviderNotFoundError:
          return response(res, error.message, StatusCode.NOT_FOUND, error.constructor.name);
        case UpdatePurchaseStorageNotFoundError:
          return response(res, error.message, StatusCode.NOT_FOUND, error.constructor.name);
        default:
          return response(res, error.message, StatusCode.INTERNAL_SERVER_ERROR, error.constructor.name);
      }
    }
    return response(res, result.value, StatusCode.OK);
  }

  async deletePurchase(req: Request, res: Response) {
    const { id } = req.params;
    const result = await deletePurchase.execute({ id });

    if (result.isErr()) {
      const error = result.error;
      switch (error.constructor) {
        case DeletePurchaseInvalidIdError:
          return response(res, error.message, StatusCode.BAD_REQUEST, error.constructor.name);
        case DeletePurchaseNotFoundError:
          return response(res, error.message, StatusCode.NOT_FOUND, error.constructor.name);
        default:
          return response(res, error.message, StatusCode.INTERNAL_SERVER_ERROR, error.constructor.name);
      }
    }
    return response(res, result.value, StatusCode.OK);
  }
}
