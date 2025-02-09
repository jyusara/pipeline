import { orderRepository } from '../../../repositories';
import CreateOrder from './createOrder';

const createOrder = new CreateOrder(orderRepository);

export { createOrder };
