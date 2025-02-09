import { agentModel } from '../../db/mongo.schema';
import { AgentFilter, IAgentRepository } from '../agent.repository';
import { Agent, IAgentProps } from '../../domain/agent';
import { AgentDbResponse, AgentMap } from '../../mappers';
import { getDataByFilters } from '../../helpers';
import { AgentUpdateAlreadyAssigned } from '../../UseCases/agent/updateAgent/updateAgentErrors';

export class AgentImplRepository implements IAgentRepository {
  private readonly agentModel: typeof agentModel;

  constructor() {
    this.agentModel = agentModel;
  }

  async getAgents(): Promise<Agent[]> {
    try {
      const agents = await this.agentModel.find();
      const result = agents.map((agent) => AgentMap.toDbFromDomain(agent));
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getAgent(filters?: AgentFilter): Promise<Agent | null> {
    try {
      const result = await getDataByFilters<Agent, AgentFilter>(agentModel, filters);
      if (!result) {
        return null;
      }
      return AgentMap.toDbFromDomain(result as AgentDbResponse);
    } catch (error) {
      throw error;
    }
  }

  async createAgent(agent: IAgentProps): Promise<Agent> {
    try {
      const newAgent = new this.agentModel(agent);
      await newAgent.save();
      return AgentMap.toDbFromDomain(newAgent);
    } catch (error) {
      throw error;
    }
  }

  async updateAgent(id: string, agent: Partial<IAgentProps>): Promise<Agent | null> {
    try {
      if (agent.documentNumber) {
        const existingAgent = await this.agentModel.findOne({
          documentNumber: agent.documentNumber,
          _id: { $ne: id }
        });
        if (existingAgent) {
          throw new AgentUpdateAlreadyAssigned('The document Number is already in use.');
        }
      }
      if (agent.email) {
        const existingAgent = await this.agentModel.findOne({
          email: agent.email,
          _id: { $ne: id }
        });
        if (existingAgent) {
          throw new AgentUpdateAlreadyAssigned('The email is already in use.');
        }
      }
      const updatedAgent = await this.agentModel.findByIdAndUpdate(id, agent, { new: true });
      if (!updatedAgent) {
        return null;
      }
      return AgentMap.toDbFromDomain(updatedAgent);
    } catch (error) {
      throw error;
    }
  }
}
