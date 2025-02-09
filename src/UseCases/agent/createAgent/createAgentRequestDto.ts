import { Roles } from '../../../types';

export interface CreateAgentRequestDto {
  name: string;
  lastname: string;
  startWorkingTime: string;
  endWorkingTime: string;
  address?: string;
  documentNumber: string;
  email: string;
  phone: string;
  role: Roles;
  status: boolean;
  registreStatus: String;
  assigned: boolean;
}
