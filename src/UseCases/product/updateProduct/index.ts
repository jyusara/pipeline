import { productRepository } from '../../../repositories';
import UpdateProduct from './updateProduct';

const updateProduct = new UpdateProduct(productRepository);

export { updateProduct };
