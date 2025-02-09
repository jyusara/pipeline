import { ProductFilters } from '../../../repositories/product.repository';
import { GenericFilters } from '../../../types';

export type GetProductsRequestDto = ProductFilters & GenericFilters;
