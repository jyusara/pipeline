import { productRepository } from '../../../repositories';
import GetProduct from './getProduct';

const getProduct = new GetProduct(productRepository);

export { getProduct };
