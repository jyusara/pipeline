import { purchaseRepository } from '../../../repositories';
import GetPurchases from './getPurchases';

const getPurchases = new GetPurchases(purchaseRepository);

export { getPurchases };
