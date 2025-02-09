import { err, Result, ok } from 'neverthrow';
import { GetAgentsResponseDto } from './getAgentsResponseDto';
import { UnexpectedError, UseCase } from '../../../utils';
import { GetAgentsRequestDto } from './getAgentsRequestDto';
import { IAgentRepository } from '../../../repositories';

type Response = Result<GetAgentsResponseDto, UnexpectedError>;

class GetAgents implements UseCase<GetAgentsRequestDto, Response> {
  private readonly agentRepository: IAgentRepository;

  constructor(agentRepository: IAgentRepository) {
    this.agentRepository = agentRepository;
  }

  async execute(request: GetAgentsRequestDto, service?: any): Promise<Response> {
    try {
      const result = await this.agentRepository.getAgents();
      return ok(result);
    } catch (error) {
      return err(new UnexpectedError(error));
    }
  }
}

export default GetAgents;
