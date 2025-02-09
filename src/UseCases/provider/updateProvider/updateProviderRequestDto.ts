import { DataStatus } from '../../../types';

export interface UpdateProviderRequestDto {
  id: string;
  name?: string;
  ruc?: string;
  phone?: string;
  addressLine?: string;
  email?: string;
  status?: DataStatus;
  referencePhoneNumber?: string;
  referenceContactName?: string;
  accountNumber?: string;
  businessCategory?: string;
}
