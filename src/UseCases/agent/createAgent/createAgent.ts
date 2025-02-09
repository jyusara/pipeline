import { err, ok, Result } from 'neverthrow';
import { UseCase } from '../../../utils';
import {
  AgentAlreadyRegisteredError,
  AgentInvalidDataStatusError,
  AgentInvalidEmailError,
  AgentInvalidRoleError,
  AgentMissingWorkingTimeError,
  CreateAgentBadRequestError
} from './createAgentErrors';
import { CreateAgentResponse } from './createAgentResponse';
import { CreateAgentRequestDto } from './createAgentRequestDto';
import { IAgentRepository } from '../../../repositories';
import { Agent } from '../../../domain';

type Response = Result<
  CreateAgentResponse,
  | CreateAgentBadRequestError
  | AgentAlreadyRegisteredError
  | AgentInvalidRoleError
  | AgentInvalidDataStatusError
  | AgentMissingWorkingTimeError
  | AgentInvalidEmailError
>;

class CreateAgent implements UseCase<CreateAgentRequestDto, Response> {
  private readonly agentRepository: IAgentRepository;

  constructor(agentRepo: IAgentRepository) {
    this.agentRepository = agentRepo;
  }

  async execute(request: CreateAgentRequestDto, service?: any): Promise<Response> {
    try {
      // 1. Validar datos del agente
      const agentInstanceOrError = Agent.create(request);
      if (agentInstanceOrError.isErr()) {
        return err(new CreateAgentBadRequestError(agentInstanceOrError.error));
      }

      const agentInstance = agentInstanceOrError.value;

      // 2. Verificar si ya existe un agente con el mismo correo o número de documento
      if (agentInstance.email || agentInstance.documentNumber) {
        let existingAgent = await this.agentRepository.getAgent({
          email: agentInstance.email
        });

        if (existingAgent) {
          return err(new AgentAlreadyRegisteredError('Agent Email already registered'));
        }
        existingAgent = await this.agentRepository.getAgent({
          documentNumber: agentInstance.documentNumber
        });

        if (existingAgent) {
          return err(new AgentAlreadyRegisteredError('Agent Document Number already registered'));
        }
      }

      const result = await this.agentRepository.createAgent(agentInstance);

      return ok(result);
    } catch (error) {
      return err(error as CreateAgentBadRequestError);
    }
  }
}
export default CreateAgent;
