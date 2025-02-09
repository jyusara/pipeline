import { productRepository } from '../../../repositories';
import CreateProduct from './createProduct';

const createProduct = new CreateProduct(productRepository);

export { createProduct };
