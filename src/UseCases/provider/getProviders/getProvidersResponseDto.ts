import { Provider } from '../../../domain';

export interface GetProvidersResponseDto {
  data: Provider[];
  totalRecords: number;
  page: number;
  limit: number;
  totalPages: number;
}
