import { providerRepository, purchaseRepository, storageRepository } from '../../../repositories';
import CreatePuchase from './createPurchase';

const createPurchase = new CreatePuchase(purchaseRepository, providerRepository, storageRepository);

export { createPurchase };
