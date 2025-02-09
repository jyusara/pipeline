import { Purchase } from '../../../domain';

export interface GetPurchasesResponseDto {
  data: Purchase[];
  totalRecords: number;
  page: number;
  limit: number;
  totalPages: number;
}
