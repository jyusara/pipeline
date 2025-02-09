import { productRepository } from '../../../repositories';
import GetProducts from './getProducts';

const getProducts = new GetProducts(productRepository);

export { getProducts };
