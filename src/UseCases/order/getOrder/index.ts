import { orderRepository } from '../../../repositories';
import GetOrder from './getOrder';

const getOrder = new GetOrder(orderRepository);

export { getOrder };
