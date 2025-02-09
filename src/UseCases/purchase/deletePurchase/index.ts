import { purchaseRepository } from '../../../repositories';
import DeletePurchase from './deletePurchase';

const deletePurchase = new DeletePurchase(purchaseRepository);

export { deletePurchase };
