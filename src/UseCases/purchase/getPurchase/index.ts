import { purchaseRepository } from '../../../repositories';
import GetPurchase from './getPurchase';

const getPurchase = new GetPurchase(purchaseRepository);

export { getPurchase };
