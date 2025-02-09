import { err, ok, Result } from 'neverthrow';
import { GetPurchasesResponseDto } from './getPurchasesResponseDto';
import { createInstanceOrError, genericFiltersSchema, UnexpectedError, UseCase } from '../../../utils';
import { IPurchaseRepository, PurchaseFilters } from '../../../repositories/purchase.repository';
import { GenericFilters } from '../../../types';
import { GetPurchasesBadRequestError } from './getPurchasesErrors';
import { GetPurchasesRequestDto } from './getPurchasesRequestDto';
import { purchaseFiltersSchema } from '../../../domain';

type Response = Result<GetPurchasesResponseDto, UnexpectedError | GetPurchasesBadRequestError>;

class GetPurchases implements UseCase<GetPurchasesRequestDto, Response> {
  private readonly purchaseRepository: IPurchaseRepository;

  constructor(purchaseRepository: IPurchaseRepository) {
    this.purchaseRepository = purchaseRepository;
  }

  async execute(request: GetPurchasesRequestDto, service?: any): Promise<Response> {
    try {
      const { page, limit, createdAt, updatedAt, ...purchaseFilters } = request;
      const validateFilters = createInstanceOrError<GenericFilters>(genericFiltersSchema, {
        page,
        limit,
        createdAt,
        updatedAt
      });

      //valida filtros genericos
      if (validateFilters.isErr()) {
        return err(new GetPurchasesBadRequestError(validateFilters.error));
      }

      //valida filtros de purchase
      const validatePurchaseFilters = createInstanceOrError<PurchaseFilters>(purchaseFiltersSchema, purchaseFilters);

      if (validatePurchaseFilters.isErr()) {
        return err(new GetPurchasesBadRequestError(validatePurchaseFilters.error));
      }

      const result = await this.purchaseRepository.getPurchases(request);
      return ok(result);
    } catch (error) {
      return err(new UnexpectedError(error));
    }
  }
}

export default GetPurchases;
