import { Agent, IAgentProps } from '../domain/agent';

export type AgentFilter = {
  id?: string;
  name?: string;
  lastname?: string;
  address?: string;
  documentNumber?: string;
  email?: string;
  phone?: string;
};
export interface IAgentRepository {
  getAgents(): Promise<Agent[]>; // Listar todos los agentes
  getAgent(filters?: AgentFilter): Promise<Agent | null>; // Obtener agente por ID
  createAgent(agent: IAgentProps): Promise<Agent>; // Crear un nuevo agente
  updateAgent(id: string, agent: Partial<IAgentProps>): Promise<Agent | null>; // Actualizar un agente por ID
}
