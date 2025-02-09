import { Storage } from '../../../domain';

export interface GetStoragesResponse {
  data: Storage[];
  totalRecords: number;
  page: number;
  limit: number;
  totalPages: number;
}
