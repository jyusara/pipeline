import { orderRepository } from '../../../repositories';
import ProcessOrder from './processOrder';

const processOrder = new ProcessOrder(orderRepository);

export { processOrder };
