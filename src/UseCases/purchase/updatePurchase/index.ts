import { providerRepository, purchaseRepository, storageRepository } from '../../../repositories';
import UpdatePurchase from './updatePurchase';

const updatePurchase = new UpdatePurchase(purchaseRepository, providerRepository, storageRepository);

export { updatePurchase };
