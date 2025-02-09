import { err, ok, Result } from 'neverthrow';
import { UseCase } from '../../../utils';
import { GetAgentResponse } from './getAgentResponse';
import { GetAgentBadRequestError, GetAgentIdNotValidError, GetAgentNotFoundError } from './getAgentErrors';
import { GetAgentRequestDto } from './getAgentRequestDto';
import { IAgentRepository } from '../../../repositories';
import { AgentFilter } from '../../../repositories/agent.repository';
import { isValidObjectId } from 'mongoose';
type Response = Result<GetAgentResponse, GetAgentBadRequestError | GetAgentNotFoundError>;
class GetAgent implements UseCase<GetAgentRequestDto, Response> {
  private readonly agentRepository: IAgentRepository;

  constructor(agentRepo: IAgentRepository) {
    this.agentRepository = agentRepo;
  }

  async execute(request: AgentFilter, service?: any): Promise<Response> {
    try {
      // Validar formato del id
      if (!isValidObjectId(request.id)) {
        return err(new GetAgentIdNotValidError());
      }
      // Buscar agente por filtros
      const agent = await this.agentRepository.getAgent(request);

      if (!agent) {
        return err(new GetAgentNotFoundError());
      }

      return ok(agent);
    } catch (error) {
      return err(new GetAgentBadRequestError('An unexpected error occurred'));
    }
  }
}
export default GetAgent;
