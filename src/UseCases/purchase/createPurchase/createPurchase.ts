import { err, ok, Result } from 'neverthrow';
import { CreatePurchaseRequestDto } from './createPurchaseRequestDto';
import { CreatePurchaseResponseDto } from './createPurchaseResponseDto';
import { UnexpectedError, UseCase } from '../../../utils';
import { IPurchaseProps, Purchase } from '../../../domain';
import { IPurchaseRepository } from '../../../repositories/purchase.repository';
import {
  CreatePurchaseBadRequestError,
  CreatePurchaseProviderNotfoundError,
  CreatePurchaseStorageNotfoundError
} from './createPurchaseErrors';
import { IProviderRepository } from '../../../repositories/provider.repository';
import { IStorageRepository } from '../../../repositories/storage.repository';

type Response = Result<
  CreatePurchaseResponseDto,
  UnexpectedError | CreatePurchaseProviderNotfoundError | CreatePurchaseStorageNotfoundError
>;

class CreatePuchase implements UseCase<CreatePurchaseRequestDto, Response> {
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

  async execute(request: IPurchaseProps, service?: any): Promise<Response> {
    try {
      const instanceOrError = Purchase.create(request);
      if (instanceOrError.isErr()) {
        return err(new CreatePurchaseBadRequestError(instanceOrError.error));
      }

      //Validamos provider
      const existProvider = await this.providerRepository.getProvider({ id: request.provider as string });
      if (!existProvider) {
        return err(new CreatePurchaseProviderNotfoundError());
      }

      //Validamos storage
      const existStorage = await this.storageRepository.getStorage({ id: request.storage as string });
      if (!existStorage) {
        return err(new CreatePurchaseStorageNotfoundError());
      }

      const result = await this.purchaseRepository.createPurchase(instanceOrError.value);
      return ok(result);
    } catch (error) {
      return err(new UnexpectedError(error));
    }
  }
}

export default CreatePuchase;
