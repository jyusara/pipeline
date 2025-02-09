import { err, ok, Result } from 'neverthrow';
import { UpdatePurchaseResponseDto } from './updatePurchaseResponse';
import { createInstanceOrError, UnexpectedError, UseCase } from '../../../utils';
import { UpdatePurchaseRequestDto } from './updatePurchaseRequestDto';
import {
  UpdatePurchaseBadRequestError,
  UpdatePurchaseInvalidIdError,
  UpdatePurchaseNotFoundError,
  UpdatePurchaseProviderNotFoundError,
  UpdatePurchaseStorageNotFoundError
} from './updatePurchaseErrors';
import { IPurchaseProps, updatePurchaseSchema } from '../../../domain';
import { IPurchaseRepository } from '../../../repositories/purchase.repository';
import { IProviderRepository } from '../../../repositories/provider.repository';
import { IStorageRepository } from '../../../repositories/storage.repository';

type Response = Result<
  UpdatePurchaseResponseDto,
  | UnexpectedError
  | UpdatePurchaseBadRequestError
  | UpdatePurchaseInvalidIdError
  | UpdatePurchaseNotFoundError
  | UpdatePurchaseProviderNotFoundError
  | UpdatePurchaseStorageNotFoundError
>;

class UpdatePurchase implements UseCase<UpdatePurchaseRequestDto, Response> {
  private readonly purchaseRepository: IPurchaseRepository;

  private readonly providerRepository: IProviderRepository;

  private readonly storageRepository: IStorageRepository;

  constructor(
    purchaseRepository: IPurchaseRepository,
    providerRepository: IProviderRepository,
    storageRepository: IStorageRepository
  ) {
    this.purchaseRepository = purchaseRepository;
    this.providerRepository = providerRepository;
    this.storageRepository = storageRepository;
  }

  async execute(request: UpdatePurchaseRequestDto, service?: any): Promise<Response> {
    try {
      const { id, ...purchaseData } = request;

      if (!id) {
        return err(new UpdatePurchaseBadRequestError('The id is missing and must be provided'));
      }

      const instanceOrError = createInstanceOrError<UpdatePurchaseRequestDto>(updatePurchaseSchema, purchaseData);

      if (instanceOrError.isErr()) {
        return err(new UpdatePurchaseBadRequestError(instanceOrError.error));
      }

      if (purchaseData.provider) {
        const providerExist = await this.providerRepository.getProvider({ id: purchaseData.provider });
        if (!providerExist) {
          return err(new UpdatePurchaseProviderNotFoundError());
        }
      }

      if (purchaseData.storage) {
        const storageExist = await this.storageRepository.getStorage({ id: purchaseData.storage });
        if (!storageExist) {
          return err(new UpdatePurchaseStorageNotFoundError());
        }
      }

      const result = await this.purchaseRepository.updatePurchase(id, purchaseData as Partial<IPurchaseProps>);
      if (!result) {
        return err(new UpdatePurchaseNotFoundError());
      }

      return ok(result);
    } catch (error) {
      return err(new UnexpectedError(error));
    }
  }
}

export default UpdatePurchase;
