import { err, Result, ok } from 'neverthrow';
import { UseCase } from '../../../utils';
import { UpdateAgentResponse } from './updateAgentResponse';
import {
  AgentUpdateAlreadyAssigned,
  AgentUpdateBadRequestError,
  AgentUpdateIdNotValidError,
  AgentUpdateNotFoundError
} from './updateAgentErrors';
import { UpdateAgentRequestDto } from './updateAgentRequestDto';
import { IAgentRepository } from '../../../repositories';
import { isValidObjectId } from 'mongoose';
import { validateUpdateAgentSchema } from '../../../domain';
type Response = Result<
  UpdateAgentResponse,
  AgentUpdateNotFoundError | AgentUpdateBadRequestError | AgentUpdateIdNotValidError | AgentUpdateAlreadyAssigned
>;
class UpdateAgent implements UseCase<UpdateAgentRequestDto, Response> {
  private readonly agentRepository: IAgentRepository;

  constructor(agentRepo: IAgentRepository) {
    this.agentRepository = agentRepo;
  }

  async execute(request: UpdateAgentRequestDto): Promise<Response> {
    const { id, ...updateData } = request;
    try {
      // Validar el id
      if (!isValidObjectId(id)) {
        return err(new AgentUpdateIdNotValidError());
      }

      // Verificar la existencia del agente
      const existingAgent = await this.agentRepository.getAgent({ id });
      if (!existingAgent) {
        return err(new AgentUpdateNotFoundError());
      }

      // Validar los datos del request
      const { error } = validateUpdateAgentSchema(updateData);
      if (error) {
        return err(new AgentUpdateBadRequestError(error.details.map((e) => e.message).join('. ')));
      }
      // Actualizar el agente
      const updatedVehicle = await this.agentRepository.updateAgent(id, updateData);
      if (!updatedVehicle) {
        return err(new AgentUpdateBadRequestError('Failed to update agent'));
      }

      return ok(updatedVehicle);
    } catch (error) {
      return err(error);
    }
  }
}
export default UpdateAgent;
