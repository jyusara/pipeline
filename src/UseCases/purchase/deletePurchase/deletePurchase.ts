import { err, ok, Result } from 'neverthrow';
import { DeletePurchaseResponseDto } from './deletePurchaseResponseDto';
import { UnexpectedError, UseCase } from '../../../utils';
import { DeletePurchaseInvalidIdError, DeletePurchaseNotFoundError } from './deletePurchaseErrors';
import { DeletePurchaseRequestDto } from './deletePurchaseRequestDto';
import { IPurchaseRepository } from '../../../repositories/purchase.repository';
import { isValidObjectId } from 'mongoose';

type Response = Result<
  DeletePurchaseResponseDto,
  UnexpectedError | DeletePurchaseInvalidIdError | DeletePurchaseNotFoundError
>;

class DeletePurchase implements UseCase<DeletePurchaseRequestDto, Response> {
  private readonly purchaseRepository: IPurchaseRepository;

  constructor(purchaseRepository: IPurchaseRepository) {
    this.purchaseRepository = purchaseRepository;
  }

  async execute(request: DeletePurchaseRequestDto, service?: any): Promise<Response> {
    try {
      const { id } = request;

      if (!isValidObjectId(id)) {
        return err(new DeletePurchaseInvalidIdError());
      }

      const existPurchase = await this.purchaseRepository.getPurchase({ id });

      if (!existPurchase) {
        return err(new DeletePurchaseNotFoundError());
      }

      const result = await this.purchaseRepository.deltePurchase(id);
      if (!result) {
        return err(new DeletePurchaseNotFoundError());
      }
      return ok({ message: 'Purchase successfully eliminated' });
    } catch (error) {
      return err(new UnexpectedError(error));
    }
  }
}

export default DeletePurchase;
