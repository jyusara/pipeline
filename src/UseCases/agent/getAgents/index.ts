import { agentRepository } from '../../../repositories';
import GetAgents from './getAgents';

const getAgents = new GetAgents(agentRepository);

export { getAgents };
