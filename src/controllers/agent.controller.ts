import { Request, Response } from 'express';
import { StatusCode } from '../types';
import { getAgents } from '../UseCases/agent/getAgents';
import { getAgent } from '../UseCases/agent/getAgent';
import { response } from '../utils';
import { createAgent } from '../UseCases/agent/createAgent';
import { updateAgent } from '../UseCases/agent/updateAgent';
import {
  AgentAlreadyRegisteredError,
  CreateAgentBadRequestError
} from '../UseCases/agent/createAgent/createAgentErrors';
import {
  GetAgentBadRequestError,
  GetAgentIdNotValidError,
  GetAgentNotFoundError
} from '../UseCases/agent/getAgent/getAgentErrors';
import { UpdateAgentRequestDto } from '../UseCases/agent/updateAgent/updateAgentRequestDto';
import {
  AgentUpdateAlreadyAssigned,
  AgentUpdateBadRequestError,
  AgentUpdateIdNotValidError,
  AgentUpdateNotFoundError
} from '../UseCases/agent/updateAgent/updateAgentErrors';
export class AgentController {
  constructor() {
    this.getAgents = this.getAgents.bind(this);
    this.createAgent = this.createAgent.bind(this);
    this.getAgent = this.getAgent.bind(this);
  }

  async getAgents(req: Request, res: Response) {
    const result = await getAgents.execute({});
    if (result.isErr()) {
      const error = result.error;
      switch (error.constructor) {
        default:
          return response(res, error, StatusCode.INTERNAL_SERVER_ERROR, error.constructor.name);
      }
    }
    return response(res, result.value, StatusCode.OK);
  }

  async getAgent(req: Request, res: Response) {
    const { id } = req.params;
    const result = await getAgent.execute({ id });

    if (result.isErr()) {
      const error = result.error;
      switch (error.constructor) {
        case GetAgentIdNotValidError:
          return response(res, error.message, StatusCode.BAD_REQUEST, error.constructor.name);
        case GetAgentNotFoundError:
          return response(res, error.message, StatusCode.NOT_FOUND, error.constructor.name);
        case GetAgentBadRequestError:
          return response(res, error.message, StatusCode.BAD_REQUEST, error.constructor.name);
        default:
          return response(res, error.message, StatusCode.INTERNAL_SERVER_ERROR, error.constructor.name);
      }
    }
    return response(res, result.value, StatusCode.OK);
  }

  async createAgent(req: Request, res: Response) {
    const agentData = req.body;
    const result = await createAgent.execute(agentData);

    if (result.isErr()) {
      const error = result.error;
      switch (error.constructor) {
        case AgentAlreadyRegisteredError:
          return response(res, error.message, StatusCode.CONFLICT, error.constructor.name);
        case CreateAgentBadRequestError:
          return response(res, error.message, StatusCode.BAD_REQUEST, error.constructor.name);
        default:
          return response(res, error.message, StatusCode.INTERNAL_SERVER_ERROR, error.constructor.name);
      }
    }
    return response(res, result.value, StatusCode.CREATED);
  }

  async updateAgent(req: Request, res: Response) {
    // Combina el ID de la URL con el cuerpo del request
    const updateRequest: UpdateAgentRequestDto = {
      id: req.params.id,
      ...req.body
    };
    const result = await updateAgent.execute(updateRequest);
    if (result.isErr()) {
      const error = result.error;
      switch (error.constructor) {
        case AgentUpdateNotFoundError:
          return response(res, error.message, StatusCode.NOT_FOUND, error.constructor.name);
        case AgentUpdateBadRequestError:
          return response(res, error.message, StatusCode.BAD_REQUEST, error.constructor.name);
        case AgentUpdateIdNotValidError:
          return response(res, error.message, StatusCode.BAD_REQUEST, error.constructor.name);
        case AgentUpdateAlreadyAssigned:
          return response(res, error.message, StatusCode.BAD_REQUEST, error.constructor.name);
        default:
          return response(res, error.message, StatusCode.INTERNAL_SERVER_ERROR, error.constructor.name);
      }
    }
    return response(res, result.value, StatusCode.OK);
  }
}
