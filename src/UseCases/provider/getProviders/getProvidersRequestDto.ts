import { ProviderFilters } from '../../../repositories/provider.repository';
import { GenericFilters } from '../../../types';

export type GetProvidersRequestDto = ProviderFilters & GenericFilters;
