import { StorageFilter } from '../../../repositories/storage.repository';
import { GenericFilters } from '../../../types';

export type GetStoragesRequestDto = StorageFilter & GenericFilters;
