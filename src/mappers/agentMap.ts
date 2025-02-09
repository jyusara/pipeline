import { Document } from 'mongoose';
import { IAgentDb } from '../db/interfaces';
import { Agent } from '../domain';

export type AgentDbResponse = IAgentDb & Document;

export class AgentMap {
  static toDbFromDomain(agent: AgentDbResponse): Agent {
    return {
      id: agent._id as string,
      name: agent.name,
      lastname: agent.lastname || '',
      startWorkingTime: agent.startWorkingTime,
      endWorkingTime: agent.endWorkingTime,
      address: agent.address || '',
      documentNumber: agent.documentNumber || '',
      email: agent.email || '',
      phone: agent.phone || '',
      role: agent.role,
      status: agent.status,
      registreStatus: agent.registreStatus,
      assigned: agent.assigned
    };
  }
}
