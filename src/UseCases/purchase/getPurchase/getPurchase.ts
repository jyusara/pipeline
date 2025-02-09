import { err, ok, Result } from 'neverthrow';
import { GetPurchaseResponseDto } from './getPurchaseResponseDto';
import { UnexpectedError, UseCase } from '../../../utils';
import { IPurchaseRepository, PurchaseFilters } from '../../../repositories/purchase.repository';
import { GetPurchaseRequestDto } from './getPurchaseRequestDto';
import { isValidObjectId } from 'mongoose';
import { GetPurchaseInvalidIdError, GetPurchaseNotFoundError } from './getPurchaseErrors';

type Response = Result<GetPurchaseResponseDto, UnexpectedError | GetPurchaseInvalidIdError | GetPurchaseNotFoundError>;

class GetPurchase implements UseCase<GetPurchaseRequestDto, Response> {
  private readonly purchaseRepository: IPurchaseRepository;

  constructor(purchaseRepository: IPurchaseRepository) {
    this.purchaseRepository = purchaseRepository;
  }

  async execute(request: PurchaseFilters, service?: any): Promise<Response> {
    try {
      const { id } = request;
      if (!isValidObjectId(id)) {
        return err(new GetPurchaseInvalidIdError());
      }
      const result = await this.purchaseRepository.getPurchase({ id });
      if (!result) {
        return err(new GetPurchaseNotFoundError());
      }
      return ok(result);
    } catch (error) {
      return err(new UnexpectedError(error));
    }
  }
}

export default GetPurchase;
