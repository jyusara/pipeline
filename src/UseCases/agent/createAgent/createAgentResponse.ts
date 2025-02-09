export interface CreateAgentResponse {
  id: string;
  name: string;
  lastname?: string;
  startWorkingTime: string;
  endWorkingTime: string;
  address?: string;
  documentNumber?: string;
  email?: string;
  phone?: string;
  role: string;
  status: boolean;
  assigned: boolean;
}
