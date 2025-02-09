import { DataStatus, Roles } from '../../types';
import { err, ok, Result } from 'neverthrow';
import { validateAgent, validateUpdateAgentSchema } from './agent.validation';

export interface IAgentProps {
  name: string;
  lastname?: string;
  startWorkingTime: string;
  endWorkingTime: string;
  address?: string;
  documentNumber?: string;
  email?: string;
  phone?: string;
  role: Roles;
  status: boolean;
  registreStatus: String;
  assigned: boolean;
}

export class Agent {
  id: string;

  name: string;

  lastname?: string;

  startWorkingTime: string;

  endWorkingTime: string;

  address?: string;

  documentNumber?: string;

  email?: string;

  phone?: string;

  role: Roles;

  status: boolean;

  registreStatus: String;

  assigned: boolean;

  constructor(props: IAgentProps) {
    Object.assign(this, props);
  }

  static create(props: IAgentProps): Result<Agent, string> {
    const { error } = validateAgent(props);
    if (error) {
      const agentErrors = error.details.map((error) => error.message).join('. ');
      return err(agentErrors);
    }
    return ok(new Agent(props));
  }

  static update(props: IAgentProps): Result<Agent, string> {
    const { error } = validateUpdateAgentSchema(props);
    if (error) {
      const agentError = error.details
        .map((e) => {
          e.message;
        })
        .join('. ');
      return err(agentError);
    }
    return ok(new Agent(props));
  }
}
